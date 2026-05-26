'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { campaigns } from '@/lib/mockData'
import { ArrowLeft, Heart } from 'lucide-react'

export default function Donate() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCampaignId = searchParams.get('campaign')
  const selectedCampaign = selectedCampaignId 
    ? campaigns.find(c => c.id === parseInt(selectedCampaignId))
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

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleProceedToPayment = () => {
    if (!selectedCampaign || !finalAmount) return
    router.push(`/donate/checkout?campaign=${selectedCampaign.id}&amount=${finalAmount}`)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Make a Donation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Your generous contribution helps us transform lives and build stronger communities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Progress Steps */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${step >= 1 ? 'border-primary bg-primary/10' : 'border-border'}`} onClick={() => setStep(1)}>
                    <p className="font-bold text-sm">Step 1</p>
                    <p>Select Campaign</p>
                  </div>
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${step >= 2 ? 'border-primary bg-primary/10' : 'border-border'}`} onClick={() => selectedCampaign && setStep(2)}>
                    <p className="font-bold text-sm">Step 2</p>
                    <p>Choose Amount</p>
                  </div>
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${step >= 3 ? 'border-primary bg-primary/10' : 'border-border'}`} onClick={() => finalAmount && setStep(3)}>
                    <p className="font-bold text-sm">Step 3</p>
                    <p>Payment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              {step === 1 ? (
                // Campaign Selection
                <div>
                  <h2 className="text-3xl font-bold mb-8">Select a Campaign</h2>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        onClick={() => handleCampaignSelect(campaign.id)}
                        className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-border hover:border-primary cursor-pointer transition-all hover:shadow-xl"
                      >
                        <div className="md:flex">
                          <div className="h-32 md:w-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl">
                              {campaign.category === 'Education' ? '📚' : campaign.category === 'Healthcare' ? '⚕️' : '🍲'}
                            </span>
                          </div>
                          <div className="p-6 flex-1">
                            <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{campaign.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-primary">
                                {Math.round((campaign.current / campaign.target) * 100)}% funded
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {campaign.donors.toLocaleString()} donors
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : step === 2 ? (
                // Amount Selection
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <button onClick={() => setStep(1)} className="text-primary hover:text-primary/80">
                      <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-3xl font-bold">Choose Donation Amount</h2>
                  </div>

                  {selectedCampaign && (
                    <div className="bg-secondary rounded-lg p-6 mb-8">
                      <h3 className="font-bold text-lg mb-2">{selectedCampaign.title}</h3>
                      <p className="text-muted-foreground">{selectedCampaign.description}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-4">Quick Amount Selection</p>
                      <div className="grid grid-cols-3 gap-3">
                        {predefinedAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => handleAmountSelect(amount)}
                            className={`p-4 rounded-lg font-semibold transition-all ${
                              selectedAmount === amount
                                ? 'bg-primary text-primary-foreground border-2 border-primary'
                                : 'bg-white border-2 border-border hover:border-primary'
                            }`}
                          >
                            ₹{amount.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-4">Or enter a custom amount</p>
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center border-2 border-border rounded-lg overflow-hidden">
                          <span className="px-4 py-3 font-semibold text-primary">₹</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            placeholder="Enter amount"
                            className="flex-1 px-4 py-3 border-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-border">
                      <p className="text-muted-foreground mb-3">Your Donation</p>
                      <p className="text-4xl font-bold text-primary mb-6">
                        ₹{finalAmount ? finalAmount.toLocaleString('en-IN') : '0'}
                      </p>
                      <button
                        onClick={handleProceedToPayment}
                        disabled={!finalAmount}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              ) : step === 3 ? (
                // This will be handled by checkout page
                <div>Payment section</div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Your Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center border border-border">
              <p className="text-4xl font-bold text-primary mb-2">₹100</p>
              <p className="text-muted-foreground">Feeds 1 child for a month</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-border">
              <p className="text-4xl font-bold text-primary mb-2">₹500</p>
              <p className="text-muted-foreground">School supplies for 5 children</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-border">
              <p className="text-4xl font-bold text-primary mb-2">₹1000</p>
              <p className="text-muted-foreground">Medical checkup for 10 people</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-border">
              <p className="text-4xl font-bold text-primary mb-2">₹5000</p>
              <p className="text-muted-foreground">Scholarship for 1 student</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
