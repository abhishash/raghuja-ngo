'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react'
import { useGetCampaignsQuery } from '@/lib/services/campaign-api'
import { imageBaseUrl } from '@/lib/constants'
import { isArray } from '@/lib/type-guards'
import DonateHeroSection from '@/components/campaign/donate'

export default function Donate() {
  const searchParams = useSearchParams()

  const selectedCampaignId = searchParams.get('campaign');

  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  const selectedCampaign = selectedCampaignId
    ? campaigns?.find((c) => c.id === parseInt(selectedCampaignId))
    : null

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [step, setStep] = useState(selectedCampaign ? 2 : 1)

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const finalAmount = customAmount
    ? parseInt(customAmount)
    : selectedAmount



  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <DonateHeroSection />

      {/* MAIN CONTENT */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

            {/* SIDEBAR */}
            <div>
              <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">

                <h3 className="text-2xl font-bold text-gray-950">
                  Donation Steps
                </h3>

                <div className="mt-8 space-y-4">

                  {/* Step */}
                  <div
                    onClick={() => setStep(1)}
                    className={`group cursor-pointer rounded-3xl border-2 p-5 transition-all ${step >= 1
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${step >= 1
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        1
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          Select Campaign
                        </p>

                        <p className="text-sm text-gray-500">
                          Choose your cause
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step */}
                  <div
                    className={`rounded-3xl border-2 p-5 transition-all ${step >= 2
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${step >= 2
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        2
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          Donation Amount
                        </p>

                        <p className="text-sm text-gray-500">
                          Select contribution
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step */}
                  <div
                    className={`rounded-3xl border-2 p-5 transition-all ${finalAmount
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${finalAmount
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        3
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          Secure Payment
                        </p>

                        <p className="text-sm text-gray-500">
                          Complete donation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="mt-8 rounded-3xl bg-teal-600 p-6 text-white shadow-xl">
                  <CheckCircle2 size={30} />

                  <h4 className="mt-4 text-xl font-bold">
                    100% Transparency
                  </h4>

                  <p className="mt-3 leading-relaxed text-white/80">
                    Your donation directly supports verified NGO
                    initiatives and community programs.
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-4xl font-black text-gray-950">
                Choose a campaign
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Select a cause you want to support today.
              </p>

              <div className="mt-10 grid gap-8">
                {isLoading ? (
                  <div className="space-y-8">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl animate-pulse"
                      >
                        <div className="grid lg:grid-cols-[320px_1fr]">

                          {/* IMAGE SKELETON */}
                          <div className="h-[260px] bg-gray-200" />

                          {/* CONTENT SKELETON */}
                          <div className="flex flex-col justify-between px-8 py-6">
                            <div>
                              {/* Title */}
                              <div className="h-8 w-2/3 rounded-full bg-gray-200" />

                              {/* Description */}
                              <div className="mt-4 space-y-3">
                                <div className="h-4 w-full rounded-full bg-gray-200" />
                                <div className="h-4 w-11/12 rounded-full bg-gray-200" />
                                <div className="h-4 w-8/12 rounded-full bg-gray-200" />
                              </div>
                            </div>

                            {/* Progress Section */}
                            <div className="mt-8">
                              <div className="mb-3 flex items-center justify-between">
                                <div className="h-5 w-32 rounded-full bg-gray-200" />
                                <div className="h-4 w-20 rounded-full bg-gray-200" />
                              </div>

                              {/* Progress Bar */}
                              <div className="h-3 w-full rounded-full bg-gray-200" />

                              <div className="mt-4 flex items-center justify-between">
                                <div className="h-4 w-28 rounded-full bg-gray-200" />
                                <div className="h-5 w-12 rounded-full bg-gray-200" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  isArray(campaigns) ? campaigns?.map((campaign) => (
                    <Link
                      key={campaign.id}
                      href={`/donate/${campaign.id}`}
                      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="grid lg:grid-cols-[320px_1fr]">

                        {/* IMAGE */}
                        <div className="relative h-[260px] overflow-hidden bg-gray-100">
                          <Image
                            src={
                              campaign.image
                                ? `${imageBaseUrl}${campaign.image}`
                                : "/placeholder-campaign.jpg"
                            }
                            alt={campaign.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-col justify-between px-8 py-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-950">
                              {campaign.name}
                            </h3>

                            <p className="mt-3 text-lg line-clamp-3 leading-relaxed text-gray-600">
                              {campaign.description}
                            </p>
                          </div>

                          {/* Progress */}
                          <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="font-semibold text-teal-700">
                                ₹{campaign.raised_amount} raised
                              </span>

                              <span className="text-sm text-gray-500">
                                {campaign.donors} donors
                              </span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                                style={{
                                  width: `${(parseFloat(campaign.raised_amount) /
                                    parseFloat(campaign.target_amount)) *
                                    100
                                    }%`,
                                }}
                              />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Goal: ₹{campaign.target_amount}
                              </span>

                              <span className="font-bold text-teal-700">
                                {Math.round(
                                  (parseFloat(campaign.raised_amount) /
                                    parseFloat(campaign.target_amount)) *
                                  100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )) : <div className="flex min-h-[450px] py-8 flex-col items-center justify-center rounded-[2rem] border border-dashed border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 px-6 text-center shadow-lg">

                    {/* ICON */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
                      <span className="text-5xl">📢</span>
                    </div>

                    {/* TITLE */}
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                      No Campaigns Found
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-gray-600">
                      We couldn&apos;t find any active campaigns right now.
                      Please check back later or explore other initiatives.
                    </p>

                    {/* BUTTON */}
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Refresh Page
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white px-4 py-12">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-100 blur-3xl"></div>
        <div className="relative mx-auto max-w-7xl">

          <div className="text-center">
            <div className="inline-flex rounded-full bg-teal-50 px-5 py-2">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Your Impact
              </span>
            </div>

            <h2 className="mt-3 text-4xl font-black text-gray-950">
              Small donations, big transformation
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                amount: '₹100',
                text: 'Feeds one child for a month',
                image:
                  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
              },
              {
                amount: '₹500',
                text: 'School supplies for children',
                image:
                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
              },
              {
                amount: '₹1000',
                text: 'Medical support for families',
                image:
                  'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop',
              },
              {
                amount: '₹5000',
                text: 'Scholarship for one student',
                image:
                  'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop',
              },
            ].map((item) => (
              <div
                key={item.amount}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-4xl font-black text-white">
                      {item.amount}
                    </h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main >
  )
}