'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  BadgeCheck,
  Heart,
  Sparkles,
} from 'lucide-react'

import { useGetCampaignByidQuery } from '@/lib/services/campaign-api'
import {
  useCreateOrderMutation,
  usePaymentFailedMutation,
  useVerifyPaymentMutation,
} from '@/lib/services/payment-api'

import { useRazorpay, RazorpayOrderOptions } from 'react-razorpay'
import { isObject } from '@/lib/type-guards'
import { imageBaseUrl } from '@/lib/constants'

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const amount = searchParams.get('amount')
  const campaignId = searchParams.get('campaign')

  const campaignQueryId = campaignId
    ? Number.parseInt(campaignId, 10)
    : undefined

  const { data: campaign, isLoading } =
    useGetCampaignByidQuery(campaignQueryId ?? 0, {
      skip: !campaignQueryId || Number.isNaN(campaignQueryId),
    })

  const donationAmount = amount ? parseInt(amount) : 0

  const [paymentMethod] = useState<'razorpay'>('razorpay')

  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const {
    error: razorpayScriptError,
    Razorpay,
  } = useRazorpay()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!donorName.trim()) {
      newErrors.donorName = 'Name is required'
    }

    if (!donorEmail.trim()) {
      newErrors.donorEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      newErrors.donorEmail = 'Invalid email'
    }

    if (!donorPhone.trim()) {
      newErrors.donorPhone = 'Phone is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const [createOrder, { isLoading: isSaving }] =
    useCreateOrderMutation()

  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation()

  const [paymentFailed] = usePaymentFailedMutation()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (paymentMethod !== 'razorpay') {
      setErrors({
        payment:
          'Only Razorpay is currently enabled for online donations.',
      })

      return
    }

    if (!campaignId) {
      setErrors({
        payment:
          'Missing campaign information. Please try again.',
      })

      return
    }

    if (!campaign) {
      setErrors({
        payment:
          'Campaign details are not available yet. Please try again.',
      })

      return
    }

    try {
      const response = await createOrder({
        campaign_id: campaignId as string,
        amount: donationAmount,
        name: donorName,
        email: donorEmail,
        phone: donorPhone,
      }).unwrap()

      if (
        !response?.razorpay_key ||
        !response?.razorpay_order_id
      ) {
        setErrors({
          payment:
            'Unable to initialize Razorpay payment. Please try again.',
        })

        return
      }

      const options: RazorpayOrderOptions = {
        key: response.razorpay_key,
        amount: response.amount_in_paise,
        currency: response.currency as 'INR',
        name: campaign.name,
        description: `Donation for ${campaign.name}`,
        order_id: response.razorpay_order_id,

        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },

        theme: {
          color: '#0f766e',
        },

        handler: async (paymentResponse) => {
          const verifyResponse = await verifyPayment({
            campaign_id: campaignId as string,
            donation_id: response.donation_id,
            razorpay_order_id:
              paymentResponse.razorpay_order_id,
            razorpay_payment_id:
              paymentResponse.razorpay_payment_id,
            razorpay_signature:
              paymentResponse.razorpay_signature,
          })

          if (isObject(verifyResponse)) {
            router.push(
              `/donate/success?donationId=${response.receipt}&transactionId=${paymentResponse.razorpay_payment_id}&amount=${donationAmount}&campaign=${response.campaign_id}&donor=${encodeURIComponent(
                donorName
              )}`
            )
          }
        },

        modal: {
          ondismiss: async () => {
            try {
              await paymentFailed({
                donation_id: response.donation_id,
                campaign_id: campaignId,
                reason: 'Payment popup closed by user',
              }).unwrap()

              router.push(`/donate/${campaignId}`)
            } catch (error) {
              console.log(error)
            }

            setErrors({
              payment: 'Payment cancelled by user.',
            })
          },
        },
      }

      const razorpayInstance = new Razorpay(options)

      razorpayInstance.on(
        'payment.failed',
        (paymentError) => {
          setErrors({
            payment:
              paymentError?.error?.description ||
              'Payment failed. Please try again.',
          })
        }
      )

      razorpayInstance.open()
      setErrors({})
    } catch (error) {
      setErrors({
        payment: 'Payment failed. Please try again.',
      })
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600"></div>
          <p className="mt-5 text-gray-600">
            Loading secure checkout...
          </p>
        </div>
      </main>
    )
  }

  if (!campaign) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-lg rounded-[2rem] border border-gray-200 bg-white p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-black text-gray-950">
            Invalid donation session
          </h2>

          <p className="mt-4 text-gray-600">
            The campaign could not be found or the session expired.
          </p>

          <Link
            href="/donate"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-7 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-teal-700"
          >
            <ArrowLeft size={18} />
            Return to Donate
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 py-10">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl"></div>

        <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-5 py-2 shadow-sm backdrop-blur">
              <Sparkles size={16} className="text-teal-700" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Secure Donation Checkout
              </span>
            </div>

            <h1 className=" text-5xl font-black leading-tight text-gray-950 md:text-4xl">
              Complete your contribution securely
            </h1>

            <p className="text-xl leading-relaxed text-gray-600">
              Every donation directly supports lives through
              healthcare, rehabilitation, education, and mobility
              access.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Campaign Card */}
            <div className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-white shadow-2xl">
              <div className="relative h-72">
                <Image
                  src={`${imageBaseUrl}${campaign.image}`}
                  alt={campaign.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    Active Campaign
                  </div>

                  <h2 className="mt-4 text-3xl font-black text-white">
                    {campaign.name}
                  </h2>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Donation Amount
                    </p>

                    <h3 className="mt-2 text-5xl font-black text-teal-700">
                      ₹{donationAmount.toLocaleString('en-IN')}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-teal-50 p-4">
                    <Heart
                      className="text-teal-700"
                      size={30}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-teal-50 p-4">
                    <ShieldCheck
                      className="mt-1 text-teal-700"
                      size={22}
                    />

                    <p className="text-sm leading-relaxed text-gray-700">
                      Your donation is securely processed with
                      end-to-end encryption.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-yellow-50 p-4">
                    <BadgeCheck
                      className="mt-1 text-yellow-700"
                      size={22}
                    />

                    <p className="text-sm leading-relaxed text-gray-700">
                      You will receive an instant payment receipt
                      and donation confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Box */}
            <div className="rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold">
                Your contribution matters
              </h3>

              <p className="mt-4 text-white/90">
                Donations help fund medical care, prosthetic
                support, rehabilitation programs, and long-term
                community empowerment.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <form
              onSubmit={handlePayment}
              className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-white shadow-2xl"
            >
              {/* HEADER */}
              <div className="border-b border-gray-100 px-8 py-4">
                <h2 className="text-3xl font-black text-gray-950">
                  Donor Information
                </h2>

                <p className="mt-3 text-gray-600">
                  Enter your details to continue securely.
                </p>
              </div>

              {/* FORM */}
              <div className="space-y-4 px-8 py-4">
                {/* NAME */}
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wide text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) =>
                      setDonorName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={`w-full rounded-2xl border bg-gray-50 px-5 py-3 text-base outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-100 ${errors.donorName
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-teal-500'
                      }`}
                  />

                  {errors.donorName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.donorName}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wide text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) =>
                      setDonorEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className={`w-full rounded-2xl border bg-gray-50  px-5 py-3 text-base outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-100 ${errors.donorEmail
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-teal-500'
                      }`}
                  />

                  {errors.donorEmail && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.donorEmail}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-wide text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) =>
                      setDonorPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    className={`w-full rounded-2xl border bg-gray-50 px-5 py-3 text-base outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-100 ${errors.donorPhone
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-teal-500'
                      }`}
                  />

                  {errors.donorPhone && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.donorPhone}
                    </p>
                  )}
                </div>

                {/* SECURITY BOX */}
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <div className="flex gap-3">
                    <Lock
                      className="mt-1 text-blue-700"
                      size={20}
                    />

                    <p className="text-sm leading-relaxed text-blue-900">
                      Your payment information is encrypted and
                      securely processed through Razorpay.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={
                    isSaving ||
                    isVerifying
                  }
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ||
                    isVerifying ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={22} />
                      Donate ₹
                      {donationAmount.toLocaleString('en-IN')}
                    </>
                  )}
                </button>

                {/* ERROR */}
                {(razorpayScriptError || errors.payment) && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                    {razorpayScriptError || errors.payment}
                  </div>
                )}

                {/* FOOTER */}
                <p className="pt-2 text-center text-sm leading-relaxed text-gray-500">
                  By completing this donation, you agree to our
                  terms and privacy policy. A receipt will be sent
                  to your email instantly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}