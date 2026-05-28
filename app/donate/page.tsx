'use client'

import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { campaigns } from '@/lib/mockData'
import {
  ArrowLeft,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

export default function Donate() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedCampaignId = searchParams.get('campaign')

  const selectedCampaign = selectedCampaignId
    ? campaigns.find((c) => c.id === parseInt(selectedCampaignId))
    : null

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [step, setStep] = useState(selectedCampaign ? 2 : 1)

  const predefinedAmounts = [100, 500, 1000, 2500, 5000, 10000]

  const handleCampaignSelect = (campaignId: number) => {
    router.push(`/donate?campaign=${campaignId}`)
    setStep(2)
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const finalAmount = customAmount
    ? parseInt(customAmount)
    : selectedAmount

  const handleProceedToPayment = () => {
    if (!selectedCampaign || !finalAmount) return

    router.push(
      `/donate/checkout?campaign=${selectedCampaign.id}&amount=${finalAmount}`
    )
  }

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-28">
        
        {/* Background Blur */}
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <Heart className="mr-2 text-teal-700" size={16} />

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Donate & Support
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-950 md:text-7xl">
              Every donation creates real change
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
              Help us provide education, healthcare, food support,
              and rehabilitation services to underserved communities.
            </p>

            {/* Features */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              
              <div className="rounded-3xl border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
                <ShieldCheck className="text-teal-700" size={28} />

                <p className="mt-4 font-bold text-gray-950">
                  Secure Payments
                </p>
              </div>

              <div className="rounded-3xl border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
                <Users className="text-teal-700" size={28} />

                <p className="mt-4 font-bold text-gray-950">
                  Trusted NGO
                </p>
              </div>

              <div className="rounded-3xl border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
                <Sparkles className="text-teal-700" size={28} />

                <p className="mt-4 font-bold text-gray-950">
                  Real Impact
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop"
                alt="Donation Impact"
                width={900}
                height={700}
                className="h-[550px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 rounded-3xl bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">
                  Lives Impacted
                </p>

                <h3 className="mt-2 text-5xl font-black text-white">
                  25K+
                </h3>

                <p className="mt-2 text-white/80">
                  Children & families supported
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            
            {/* SIDEBAR */}
            <div>
              <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">
                
                <h3 className="text-2xl font-bold text-gray-950">
                  Donation Steps
                </h3>

                <div className="mt-10 space-y-5">
                  
                  {/* Step */}
                  <div
                    onClick={() => setStep(1)}
                    className={`group cursor-pointer rounded-3xl border-2 p-5 transition-all ${
                      step >= 1
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${
                          step >= 1
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
                    className={`rounded-3xl border-2 p-5 transition-all ${
                      step >= 2
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${
                          step >= 2
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
                    className={`rounded-3xl border-2 p-5 transition-all ${
                      finalAmount
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${
                          finalAmount
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
                <div className="mt-10 rounded-3xl bg-teal-600 p-6 text-white shadow-xl">
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
              {step === 1 ? (
                <div>
                  <h2 className="text-5xl font-black text-gray-950">
                    Choose a campaign
                  </h2>

                  <p className="mt-4 text-lg text-gray-600">
                    Select a cause you want to support today.
                  </p>

                  <div className="mt-14 grid gap-8">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        onClick={() =>
                          handleCampaignSelect(campaign.id)
                        }
                        className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <div className="grid lg:grid-cols-[320px_1fr]">
                          
                          {/* IMAGE */}
                          <div className="relative h-[260px] overflow-hidden">
                            <Image
                              src={
                                campaign.category === 'Education'
                                  ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
                                  : campaign.category === 'Healthcare'
                                  ? 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop'
                                  : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'
                              }
                              alt={campaign.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur-md">
                              {campaign.category}
                            </div>
                          </div>

                          {/* CONTENT */}
                          <div className="flex flex-col justify-between p-8">
                            <div>
                              <h3 className="text-3xl font-bold text-gray-950">
                                {campaign.title}
                              </h3>

                              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                                {campaign.description}
                              </p>
                            </div>

                            {/* Progress */}
                            <div className="mt-8">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="font-semibold text-teal-700">
                                  ₹{campaign.current.toLocaleString('en-IN')} raised
                                </span>

                                <span className="text-sm text-gray-500">
                                  {campaign.donors.toLocaleString()} donors
                                </span>
                              </div>

                              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                                  style={{
                                    width: `${
                                      (campaign.current /
                                        campaign.target) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                  Goal: ₹{campaign.target.toLocaleString('en-IN')}
                                </span>

                                <span className="font-bold text-teal-700">
                                  {Math.round(
                                    (campaign.current /
                                      campaign.target) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Amount Section */}
                  <button
                    onClick={() => setStep(1)}
                    className="mb-8 inline-flex items-center gap-2 font-semibold text-teal-700"
                  >
                    <ArrowLeft size={20} />
                    Back to campaigns
                  </button>

                  <div className="overflow-hidden rounded-[2.5rem] border border-white/30 bg-white shadow-2xl">
                    
                    {/* Selected Campaign */}
                    {selectedCampaign && (
                      <div className="relative h-[320px] overflow-hidden">
                        <Image
                          src={
                            selectedCampaign.category === 'Education'
                              ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
                              : selectedCampaign.category === 'Healthcare'
                              ? 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop'
                              : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'
                          }
                          alt={selectedCampaign.title}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-8 left-8">
                          <h2 className="text-4xl font-black text-white">
                            {selectedCampaign.title}
                          </h2>

                          <p className="mt-3 max-w-2xl text-lg text-white/80">
                            {selectedCampaign.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Donation Form */}
                    <div className="p-8 md:p-12">
                      <h3 className="text-4xl font-bold text-gray-950">
                        Select donation amount
                      </h3>

                      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
                        {predefinedAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() =>
                              handleAmountSelect(amount)
                            }
                            className={`rounded-3xl border-2 p-6 text-xl font-bold transition-all duration-300 ${
                              selectedAmount === amount
                                ? 'border-teal-600 bg-teal-600 text-white shadow-xl'
                                : 'border-gray-200 bg-white hover:border-teal-500'
                            }`}
                          >
                            ₹{amount.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount */}
                      <div className="mt-10">
                        <p className="mb-4 font-semibold text-gray-700">
                          Custom Amount
                        </p>

                        <div className="flex items-center overflow-hidden rounded-3xl border-2 border-gray-200 bg-white shadow-sm">
                          <span className="px-6 text-3xl font-bold text-teal-700">
                            ₹
                          </span>

                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) =>
                              handleCustomAmountChange(
                                e.target.value
                              )
                            }
                            placeholder="Enter donation amount"
                            className="w-full px-4 py-6 text-2xl font-semibold outline-none"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-12 rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white shadow-2xl">
                        
                        <p className="text-lg text-white/80">
                          Your Donation
                        </p>

                        <h2 className="mt-3 text-6xl font-black">
                          ₹
                          {finalAmount
                            ? finalAmount.toLocaleString('en-IN')
                            : '0'}
                        </h2>

                        <p className="mt-5 max-w-xl text-white/80">
                          Every contribution helps us provide food,
                          healthcare, education, and support to
                          underserved communities.
                        </p>

                        <button
                          onClick={handleProceedToPayment}
                          disabled={!finalAmount}
                          className="mt-8 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-teal-700 shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Proceed to Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white px-4 py-28">
        
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-100 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          
          <div className="text-center">
            <div className="inline-flex rounded-full bg-teal-50 px-5 py-2">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Your Impact
              </span>
            </div>

            <h2 className="mt-6 text-5xl font-black text-gray-950">
              Small donations, big transformation
            </h2>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            
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
    </main>
  )
}