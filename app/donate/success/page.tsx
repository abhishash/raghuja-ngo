'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { campaigns, donationReceipt } from '@/lib/mockData'
import { generateReceiptPDF } from '@/lib/membershipUtils'
import {
  CheckCircle2,
  Download,
  Share2,
  Home,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Receipt,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useGetCampaignByidQuery } from '@/lib/services/campaign-api'
import { imageBaseUrl } from '@/lib/constants'

export default function DonationSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const transactionId = searchParams.get('transactionId')
  const donationId = searchParams.get('donationId')
  const amount = searchParams.get('amount')
  const campaignId = searchParams.get('campaign')
  const donor = searchParams.get('donor')

  const { data: campaign = null, isLoading } = useGetCampaignByidQuery(Number(campaignId));

  const donationAmount = amount ? parseInt(amount) : 0
  const receiptId = donationId || transactionId

  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false)

  useEffect(() => {
    if (!receiptId || !amount || !campaignId || !donor) {
      router.push('/donate')
    }
  }, [receiptId, amount, campaignId, donor, router])

  const handleDownloadReceipt = async () => {
    if (!campaign) return

    setIsGeneratingReceipt(true)

    try {
      const blob = await generateReceiptPDF(
        decodeURIComponent(donor || ''),
        donationAmount,
        campaign.name,
        receiptId || '',
        donationReceipt.organizationName,
        donationReceipt.organizationEmail,
        donationReceipt.organizationAddress,
        donationReceipt.taxId
      )

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `Donation-Receipt-${receiptId}.pdf`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating receipt:', error)
    } finally {
      setIsGeneratingReceipt(false)
    }
  }

  const handleShare = async () => {
    const text = `I just donated ₹${donationAmount.toLocaleString(
      'en-IN'
    )} to ${campaign?.name
      } through Hope Foundation. Join me in making a difference 🙏`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I Donated to Hope Foundation',
          text,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert('Message copied to clipboard!')
    }
  }

  if (!campaign || !receiptId) {
    return (
      <main>
        <section className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-10 shadow-xl backdrop-blur">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                <Sparkles className="text-teal-700" size={34} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Loading donation details...
              </h2>

              <p className="mt-4 text-gray-600">
                Please wait while we verify your donation information.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const raisedAmount = Number(campaign.raised_amount || 0)
  const targetAmount = Number(campaign.target_amount || 0)

  const progress = Math.min(
    targetAmount > 0
      ? ((raisedAmount + donationAmount) / targetAmount) * 100
      : 100,
    100
  )

  return (
    <main className="bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* HERO SUCCESS */}
      <section className="relative overflow-hidden px-4 pt-16 pb-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-teal-300 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_20px_80px_rgba(13,148,136,0.15)] backdrop-blur-xl">
            {/* TOP HEADER */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-8 py-14 text-white md:px-14">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 rounded-full border border-white" />
                <div className="absolute bottom-5 right-10 h-52 w-52 rounded-full border border-white" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl">
                  <CheckCircle2
                    className="text-teal-600"
                    size={64}
                  />
                </div>

                <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur">
                  Donation Successful
                </span>

                <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                  Thank You!
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                  Your generosity is creating real impact and helping lives
                  move toward independence and dignity.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">
                    <p className="text-sm text-white/70">Donation Amount</p>
                    <p className="mt-1 text-3xl font-black">
                      ₹{donationAmount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">
                    <p className="text-sm text-white/70">Receipt ID</p>
                    <p className="mt-1 font-mono text-lg font-bold">
                      {receiptId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* LEFT */}
              <div className="space-y-8">
                {/* Donation Details */}
                <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                      <Receipt size={24} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Donation Details
                      </h2>
                      <p className="text-sm text-gray-500">
                        Securely processed contribution
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-5">
                      <p className="text-sm text-gray-500">Donor Name</p>
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {decodeURIComponent(donor || '')}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-5">
                      <p className="text-sm text-gray-500">Campaign</p>
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {campaign.name}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-5">
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="mt-2 break-all font-mono text-sm font-bold text-gray-900">
                        {transactionId}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-5">
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="mt-2 font-semibold text-gray-900">
                        {new Date().toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-7">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Campaign Progress
                      </h2>
                      <p className="mt-1 text-gray-600">
                        Your contribution increased campaign funding.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-teal-600 px-5 py-3 text-center text-white shadow-lg">
                      <p className="text-xs uppercase tracking-wide text-white/80">
                        Funded
                      </p>
                      <p className="text-2xl font-black">
                        {Math.round(progress)}%
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 h-5 overflow-hidden rounded-full bg-teal-100">
                    <div
                      className="relative h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-yellow-400 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 animate-pulse bg-white/20" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-gray-500">Raised Amount</p>
                      <p className="mt-2 text-2xl font-black text-teal-700">
                        ₹
                        { (Number(campaign.raised_amount || 0) + Number(donationAmount || 0)).toLocaleString('en-IN') }
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-gray-500">Supporters</p>
                      <p className="mt-2 text-2xl font-black text-gray-900">
                        {(Number(campaign.donors || 0) + 1).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={handleDownloadReceipt}
                    disabled={isGeneratingReceipt}
                    className="group flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-1 hover:bg-teal-700 disabled:opacity-60"
                  >
                    <Download size={20} />
                    {isGeneratingReceipt
                      ? 'Generating...'
                      : 'Receipt'}
                  </button>

                  <button
                    onClick={handleShare}
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-white px-5 py-4 font-bold text-teal-700 transition-all hover:-translate-y-1 hover:bg-teal-50"
                  >
                    <Share2 size={20} />
                    Share
                  </button>

                  <Link
                    href="/"
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-bold text-gray-800 transition-all hover:-translate-y-1 hover:border-gray-300"
                  >
                    <Home size={20} />
                    Home
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-8">
                {/* Impact Card */}
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                       src={`${imageBaseUrl}${campaign.image}`}
                      alt="Donation impact"
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                        <HeartHandshake size={16} />
                        Lives are changing
                      </div>

                      <h3 className="mt-4 text-2xl font-black text-white">
                        Your support matters.
                      </h3>
                    </div>
                  </div>

                  <div className="p-7">
                    <p className="leading-relaxed text-gray-700">
                      {campaign.description}
                    </p>

                    <div className="mt-7 space-y-4">
                      {[
                        'Direct support for beneficiaries',
                        'Verified NGO impact reporting',
                        'Official donation receipt available',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                            <BadgeCheck size={14} />
                          </div>

                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-500 p-7 text-white shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <ShieldCheck size={28} />
                  </div>

                  <h3 className="text-2xl font-black">
                    What happens next?
                  </h3>

                  <div className="mt-6 space-y-5">
                    {[
                      'Confirmation receipt sent to your email',
                      'Campaign updates and impact reports',
                      'Secure record for tax documentation',
                      'Exclusive member opportunities available',
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                        <p className="text-white/90">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/membership"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-teal-700 transition-all hover:bg-yellow-300 hover:text-gray-900"
                  >
                    <Users size={20} />
                    Become a Member
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex flex-col items-center justify-center gap-5 text-center">
            <p className="max-w-2xl text-lg text-gray-600">
              Every contribution helps create mobility, dignity, and long-term
              independence for people who need support.
            </p>

            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-7 py-4 font-bold text-white shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-1 hover:bg-yellow-600"
            >
              Make Another Donation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}