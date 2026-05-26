'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { campaigns } from '@/lib/mockData'
import { CreditCard, Lock } from 'lucide-react'

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const campaignId = searchParams.get('campaign')
  const amount = searchParams.get('amount')
  
  const campaign = campaignId ? campaigns.find(c => c.id === parseInt(campaignId)) : null
  const donationAmount = amount ? parseInt(amount) : 0

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'card'>('razorpay')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!campaign || !donationAmount) {
    return (
      <main>
        <section className="py-20 px-4 bg-background min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-6">Invalid donation session</p>
            <Link href="/donate" className="text-primary font-semibold hover:text-primary/80">
              Return to Donation Page
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!donorName.trim()) newErrors.donorName = 'Name is required'
    if (!donorEmail.trim()) newErrors.donorEmail = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) newErrors.donorEmail = 'Invalid email'
    if (!donorPhone.trim()) newErrors.donorPhone = 'Phone is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate transaction ID
      const transactionId = `TXN${Date.now()}`
      
      // Redirect to success page
      router.push(`/donate/success?transactionId=${transactionId}&amount=${donationAmount}&campaign=${campaign.id}&donor=${encodeURIComponent(donorName)}`)
    } catch (error) {
      console.error('Payment error:', error)
      setErrors({ payment: 'Payment failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Complete Your Donation</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Donation Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign</span>
                    <span className="font-semibold">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-primary text-lg">₹{donationAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 text-sm text-muted-foreground">
                  <p>Your donation is secure and encrypted. We&apos;re a registered NGO with 501(c)(3) equivalent status.</p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="md:col-span-2">
              <form onSubmit={handlePayment} className="space-y-8">
                {/* Donor Information */}
                <div className="bg-white rounded-lg shadow-lg border border-border p-8">
                  <h2 className="text-2xl font-bold mb-6">Donor Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.donorName ? 'border-destructive' : 'border-border'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.donorName && <p className="text-destructive text-sm mt-1">{errors.donorName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.donorEmail ? 'border-destructive' : 'border-border'
                        }`}
                        placeholder="Your email address"
                      />
                      {errors.donorEmail && <p className="text-destructive text-sm mt-1">{errors.donorEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.donorPhone ? 'border-destructive' : 'border-border'
                        }`}
                        placeholder="Your phone number"
                      />
                      {errors.donorPhone && <p className="text-destructive text-sm mt-1">{errors.donorPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-lg border border-border p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard size={28} />
                    Payment Method
                  </h2>

                  <div className="space-y-3 mb-8">
                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors" style={{ borderColor: paymentMethod === 'razorpay' ? 'var(--color-primary)' : '' }}>
                      <input
                        type="radio"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-semibold">Razorpay Payment Gateway</p>
                        <p className="text-sm text-muted-foreground">UPI, Cards, Wallets, Netbanking</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-semibold">Direct UPI</p>
                        <p className="text-sm text-muted-foreground">Fast and secure UPI transfer</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Secure card payment</p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <Lock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900">
                      Your payment information is encrypted and securely processed through our payment partner.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                {errors.payment && (
                  <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive text-sm">
                    {errors.payment}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      Complete Donation - ₹{donationAmount.toLocaleString('en-IN')}
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  By completing this donation, you agree to our terms. You will receive a receipt via email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
