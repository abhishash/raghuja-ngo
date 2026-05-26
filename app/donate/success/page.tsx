'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { campaigns, donationReceipt } from '@/lib/mockData'
import { generateReceiptPDF } from '@/lib/membershipUtils'
import { CheckCircle, Download, Share2, Home } from 'lucide-react'

export default function DonationSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const transactionId = searchParams.get('transactionId')
  const amount = searchParams.get('amount')
  const campaignId = searchParams.get('campaign')
  const donor = searchParams.get('donor')

  const campaign = campaignId ? campaigns.find(c => c.id === parseInt(campaignId)) : null
  const donationAmount = amount ? parseInt(amount) : 0

  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false)

  useEffect(() => {
    if (!transactionId || !amount || !campaignId || !donor) {
      router.push('/donate')
    }
  }, [transactionId, amount, campaignId, donor, router])

  const handleDownloadReceipt = async () => {
    if (!campaign) return
    
    setIsGeneratingReceipt(true)
    try {
      const blob = await generateReceiptPDF(
        decodeURIComponent(donor || ''),
        donationAmount,
        campaign.title,
        transactionId || '',
        donationReceipt.organizationName,
        donationReceipt.organizationEmail,
        donationReceipt.organizationAddress,
        donationReceipt.taxId
      )

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Donation-Receipt-${transactionId}.pdf`
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
    const text = `I just donated ₹${donationAmount.toLocaleString('en-IN')} to ${campaign?.title} through Hope Foundation. Join me in making a difference! 🙏`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I Donated to Hope Foundation',
          text: text,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text)
      alert('Message copied to clipboard!')
    }
  }

  if (!campaign || !transactionId) {
    return (
      <main>
        <section className="py-20 px-4 bg-background min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="py-20 px-4 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-primary/80 p-12 text-center text-white">
              <div className="inline-block bg-white rounded-full p-4 mb-6">
                <CheckCircle className="text-primary" size={48} />
              </div>
              <h1 className="text-4xl font-bold mb-3">Thank You!</h1>
              <p className="text-xl opacity-90">Your donation has been received</p>
            </div>

            {/* Content */}
            <div className="p-12">
              <div className="grid md:grid-cols-2 gap-12 mb-8">
                {/* Donation Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Donation Details</h2>
                  
                  <div className="space-y-4">
                    <div className="border-b border-border pb-4">
                      <p className="text-sm text-muted-foreground mb-1">Amount Donated</p>
                      <p className="text-3xl font-bold text-primary">₹{donationAmount.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="border-b border-border pb-4">
                      <p className="text-sm text-muted-foreground mb-1">Campaign</p>
                      <p className="text-lg font-semibold">{campaign.title}</p>
                    </div>

                    <div className="border-b border-border pb-4">
                      <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                      <p className="font-mono font-bold">{transactionId}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                      <p className="font-semibold">{new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' })}</p>
                    </div>
                  </div>
                </div>

                {/* Campaign Impact */}
                <div className="bg-secondary rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {campaign.story}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span>Your donation directly helps reach the campaign goal</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span>You will receive a detailed impact report</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">✓</span>
                      <span>Tax receipt available for your records</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Update */}
              <div className="bg-secondary rounded-lg p-8 mb-8">
                <h2 className="text-lg font-bold mb-4">Campaign Progress Update</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Funded Amount</span>
                    <span className="font-bold text-primary">₹{(campaign.current + donationAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Target Amount</span>
                    <span className="font-bold">₹{campaign.target.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${Math.min(((campaign.current + donationAmount) / campaign.target) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(((campaign.current + donationAmount) / campaign.target) * 100)}% funded by {campaign.donors + 1} donors
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={handleDownloadReceipt}
                  disabled={isGeneratingReceipt}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Download size={20} />
                  {isGeneratingReceipt ? 'Generating...' : 'Download Receipt'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  <Share2 size={20} />
                  Share
                </button>
                <Link
                  href="/membership"
                  className="flex items-center justify-center gap-2 border-2 border-border text-foreground py-3 rounded-lg font-semibold hover:border-primary transition-colors"
                >
                  Join Membership
                </Link>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-blue-900 mb-3">What&apos;s Next?</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• A confirmation email has been sent to your email address</li>
                  <li>• Your tax receipt PDF is ready to download (eligible for tax deduction)</li>
                  <li>• You will receive regular updates on campaign progress</li>
                  <li>• Consider becoming a member for exclusive benefits and recurring donation options</li>
                </ul>
              </div>

              {/* Continue */}
              <div className="flex gap-4">
                <Link
                  href="/donate"
                  className="flex-1 bg-secondary text-foreground py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center"
                >
                  Make Another Donation
                </Link>
                <Link
                  href="/"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Home size={20} />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
