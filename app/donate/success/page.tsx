'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import {
  CheckCircle2,
  Download,
  Share2,
  Home,
  HeartHandshake,
  ArrowRight,
  BadgeCheck,
  Receipt,
  ShieldCheck,
  Users,
} from 'lucide-react'

import {
  useGetCampaignByidQuery,
  useGetReceiptByidQuery,
} from '@/lib/services/campaign-api'

import { imageBaseUrl } from '@/lib/constants'

const donationReceipt = {
  organizationName:
    'RAGHUJA SOCIALWELFARE FOUNDATION',

  organizationEmail:
    'ngo@raghujasocialwelfarefoundation.com',

  organizationAddress:
    'Village Gadhi Dharajeet Chitaura, Shamshabad Agra, Shamshabad, AGRA, Uttar Pradesh, INDIA - 283125',
}

export default function DonationSuccess() {
  const searchParams = useSearchParams()

  const campaignId =
    searchParams.get('campaign')

  const receiptId =
    searchParams.get('receipt')

  const [
    isGeneratingReceipt,
    setIsGeneratingReceipt,
  ] = useState(false)

  // ==========================================
  // APIs
  // ==========================================

  const {
    data: receiptData,
    isLoading,
  } = useGetReceiptByidQuery(
    decodeURIComponent(receiptId || '')
  )

  const { data: campaignData } =
    useGetCampaignByidQuery(
      Number(campaignId)
    )

  // ==========================================
  // DATA
  // ==========================================

  const donation =
    receiptData?.donation

  const campaign =
    receiptData?.campaign

  const user = receiptData?.user

  const donationAmount = Number(
    donation?.amount || 0
  )

  const transactionId =
    donation?.razorpay_order_id ||
    '-'

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  // ==========================================
  // NO DATA
  // ==========================================

  if (!receiptData || !donation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Receipt not found
      </div>
    )
  }

  // ==========================================
  // PDF GENERATOR
  // ==========================================

  const generateReceiptPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const primary = '#0f766e'
      const dark = '#111827'
      const gray = '#6b7280'
      const light = '#f3f4f6'

      const pageWidth =
        doc.internal.pageSize.getWidth()

      const pageHeight =
        doc.internal.pageSize.getHeight()

      // ==========================================
      // HEADER
      // ==========================================

      doc.setFillColor(primary)

      doc.rect(
        0,
        0,
        pageWidth,
        36,
        'F'
      )

      doc.setTextColor('#ffffff')

      doc.setFont(
        'helvetica',
        'bold'
      )

      doc.setFontSize(20)

      doc.text(
        donationReceipt.organizationName,
        14,
        18
      )

      doc.setFont(
        'helvetica',
        'normal'
      )

      doc.setFontSize(10)

      doc.text(
        donationReceipt.organizationEmail,
        14,
        26
      )

      // ==========================================
      // TITLE
      // ==========================================

      doc.setTextColor(dark)

      doc.setFont(
        'helvetica',
        'bold'
      )

      doc.setFontSize(22)

      doc.text(
        'Donation Receipt',
        14,
        52
      )

      doc.setDrawColor(220)

      doc.line(
        14,
        56,
        196,
        56
      )

      // ==========================================
      // RECEIPT INFO
      // ==========================================

      doc.setFont(
        'helvetica',
        'normal'
      )

      doc.setFontSize(11)

      doc.text(
        `Receipt No: ${donation?.receipt || '-'
        }`,
        14,
        67
      )

      doc.text(
        `Date: ${new Date(
          donation?.created_at || ''
        ).toLocaleDateString(
          'en-IN'
        )}`,
        140,
        67
      )

      // ==========================================
      // THANK YOU BOX
      // ==========================================

      doc.setFillColor(light)

      doc.roundedRect(
        14,
        76,
        182,
        32,
        4,
        4,
        'F'
      )

      doc.setTextColor(dark)

      doc.setFont(
        'helvetica',
        'bold'
      )

      doc.setFontSize(15)

      doc.text(
        'Thank You for Your Contribution',
        20,
        90
      )

      doc.setFont(
        'helvetica',
        'normal'
      )

      doc.setFontSize(10)

      doc.text(
        'Your contribution helps us continue our mission and support meaningful community initiatives.',
        20,
        98,
        {
          maxWidth: 165,
        }
      )

      // ==========================================
      // DONATION TABLE
      // ==========================================

      doc.setTextColor(dark)

      doc.setFont(
        'helvetica',
        'bold'
      )

      doc.setFontSize(14)

      doc.text(
        'Donation Information',
        14,
        122
      )

      autoTable(doc, {
        startY: 128,

        head: [['Field', 'Details']],

        body: [
          [
            'Donor Name',
            user?.name || '-',
          ],

          [
            'Email',
            user?.email || '-',
          ],

          [
            'Phone',
            user?.phone || '-',
          ],

          [
            'Campaign',
            campaign?.name || '-',
          ],

          [
            'Donation Amount',
            `INR ${donationAmount.toLocaleString(
              'en-IN'
            )}`,
          ],

          [
            'Payment Status',
            donation?.payment_status ||
            '-',
          ],

          [
            'Donation Status',
            donation?.status || '-',
          ],

          [
            'Transaction ID',
            transactionId,
          ],

          [
            'Receipt ID',
            donation?.receipt || '-',
          ],

          [
            'Currency',
            donation?.currency ||
            'INR',
          ],
        ],

        theme: 'grid',

        styles: {
          fontSize: 10,
          cellPadding: 4,
        },

        headStyles: {
          fillColor: [15, 118, 110],
        },

        margin: {
          left: 14,
          right: 14,
        },
      })

      // ==========================================
      // TOTAL BOX (PAGE SAFE)
      // ==========================================

      let boxY =
        ((doc as any).lastAutoTable
          ?.finalY || 170) + 15

      // new page if overflow
      if (boxY + 40 > pageHeight) {
        doc.addPage()
        boxY = 20
      }

      doc.setFillColor(
        15,
        118,
        110
      )

      doc.roundedRect(
        14,
        boxY,
        182,
        30,
        4,
        4,
        'F'
      )

      doc.setTextColor('#ffffff')

      doc.setFont(
        'helvetica',
        'normal'
      )

      doc.setFontSize(12)

      doc.text(
        'TOTAL DONATION RECEIVED',
        20,
        boxY + 12
      )

      doc.setFont(
        'helvetica',
        'bold'
      )

      doc.setFontSize(22)

      doc.text(
        `INR ${donationAmount.toLocaleString(
          'en-IN'
        )}`,
        20,
        boxY + 24
      )

      // ==========================================
      // FOOTER (PAGE SAFE)
      // ==========================================

      let footerY = boxY + 50

      // if footer overflow
      if (
        footerY + 20 >
        pageHeight
      ) {
        doc.addPage()
        footerY = 30
      }

      doc.setTextColor(gray)

      doc.setFont(
        'helvetica',
        'normal'
      )

      doc.setFontSize(9)

      doc.text(
        'This is a computer-generated donation receipt issued by the NGO. Please keep this document for future reference.',
        14,
        footerY,
        {
          maxWidth: 180,
        }
      )

      doc.text(
        donationReceipt.organizationAddress,
        14,
        footerY + 10,
        {
          maxWidth: 180,
        }
      )

      // ==========================================
      // PAGE NUMBERS
      // ==========================================

      const totalPages =
        doc.getNumberOfPages()

      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        doc.setPage(i)

        doc.setFontSize(9)

        doc.setTextColor(120)

        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - 30,
          pageHeight - 10
        )
      }

      // ==========================================
      // SAVE
      // ==========================================

      doc.save(
        `Donation-Receipt-${donation?.receipt}.pdf`
      )
    } catch (error) {
      console.error(
        'PDF Generation Error:',
        error
      )
    }
  }

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownloadReceipt =
    async () => {
      setIsGeneratingReceipt(true)

      try {
        await generateReceiptPDF()
      } finally {
        setIsGeneratingReceipt(false)
      }
    }

  // ==========================================
  // SHARE
  // ==========================================

  const handleShare = async () => {
    const text = `I just donated ₹${donationAmount.toLocaleString(
      'en-IN'
    )} to ${campaign?.name || 'campaign'
      } through Raghuja SocialWelfare Foundation.`

    if (navigator.share) {
      await navigator.share({
        title: 'Donation Success',
        text,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(
        text
      )

      alert('Copied to clipboard')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-teal-700 to-emerald-500 px-8 py-14 text-center text-white">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl">
              <CheckCircle2
                className="text-teal-600"
                size={64}
              />
            </div>

            <h1 className="mt-8 text-5xl font-black">
              Thank You!
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Your contribution creates
              real impact and helps lives
              move toward dignity and
              independence.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">
                <p className="text-sm text-white/70">
                  Donation Amount
                </p>

                <p className="text-3xl font-black">
                  ₹
                  {donationAmount.toLocaleString(
                    'en-IN'
                  )}
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">
                <p className="text-sm text-white/70">
                  Receipt ID
                </p>

                <p className="font-mono text-lg font-bold">
                  {donation?.receipt}
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid gap-10 p-8 lg:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                    <Receipt size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Donation Details
                    </h2>

                    <p className="text-sm text-gray-500">
                      Securely processed
                      contribution
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <InfoCard
                    title="Donor Name"
                    value={
                      user?.name || '-'
                    }
                  />

                  <InfoCard
                    title="Campaign"
                    value={
                      campaign?.name ||
                      '-'
                    }
                  />

                  <InfoCard
                    title="Transaction ID"
                    value={transactionId}
                  />

                  <InfoCard
                    title="Date"
                    value={new Date(
                      donation?.created_at ||
                      ''
                    ).toLocaleDateString(
                      'en-IN'
                    )}
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={
                    handleDownloadReceipt
                  }
                  disabled={
                    isGeneratingReceipt
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
                >
                  <Download size={20} />

                  {isGeneratingReceipt
                    ? 'Generating...'
                    : 'Receipt'}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-white px-5 py-4 font-bold text-teal-700"
                >
                  <Share2 size={20} />
                  Share
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-bold text-gray-800"
                >
                  <Home size={20} />
                  Home
                </Link>
              </div>
            </div>
            <div className="space-y-8">
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="relative h-72">
                  <Image
                    src={`${imageBaseUrl}${campaignData?.image ||
                      ''
                      }`}
                    alt={
                      campaign?.name ||
                      'Campaign'
                    }
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                      <HeartHandshake
                        size={16}
                      />
                      Lives are changing
                    </div>

                    <h3 className="mt-4 text-3xl font-black text-white">
                      Your support matters
                    </h3>
                  </div>
                </div>

                <div className="p-7">
                  <p className="leading-relaxed text-gray-700">
                    {campaignData?.description ||
                      'Thank you for supporting this campaign.'}
                  </p>

                  <div className="mt-6 space-y-4">
                    {[
                      'Direct support for beneficiaries',
                      'Verified NGO impact reporting',
                      'Official donation receipt available',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                          <BadgeCheck
                            size={14}
                          />
                        </div>

                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ==========================================
// INFO CARD
// ==========================================

function InfoCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 break-all text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}