'use client'

import { useParams } from 'next/navigation'
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
import { useGetCampaignByidQuery, useGetCampaignsQuery } from '@/lib/services/campaign-api'
import { imageBaseUrl } from '@/lib/constants'
import { isArray } from '@/lib/type-guards'
import { useCreateOrderMutation } from '@/lib/services/payment-api'


type Props = {
    id: string

}
export default function CampaignDetails({ id }: Props) {

    const router = useRouter()

    const campaignId = Number(id)
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState('');
    const [step, setStep] = useState(2);
    const { data: campaign, isLoading } = useGetCampaignByidQuery(campaignId);


    const predefinedAmounts = [100, 500, 1000, 2500, 5000, 10000]

    const handleAmountSelect = (amount: number) => {

        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
    }

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value)
        setSelectedAmount(null)
    }

    const handleProceedToPayment = () => {
        if (!campaign || !finalAmount) return
        console.log();

        router.push(
            `/donate/checkout?campaign=${campaign.id}&amount=${finalAmount}`
        )
    }

    const finalAmount = customAmount
        ? parseInt(customAmount)
        : selectedAmount


    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
            </div>
        )
    }

    if (!campaign) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
                <h1 className="text-5xl font-black text-gray-900">
                    Campaign Not Found
                </h1>

                <p className="mt-4 text-lg text-gray-600">
                    The campaign you are looking for does not exist.
                </p>

                <button
                    onClick={() => router.push('/donate')}
                    className="mt-8 rounded-2xl bg-teal-600 px-8 py-4 font-bold text-white"
                >
                    Back to Campaigns
                </button>
            </div>
        )
    }



    return (
        <main className="overflow-hidden bg-white">

            {/* MAIN CONTENT */}
            <section className="bg-white px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    {/* Amount Section */}
                    <button
                        onClick={() => router.push('/donate')}
                        className="mb-4 px-7 text-xl cursor-pointer inline-flex items-center gap-2 font-semibold text-teal-700"
                    >
                        <ArrowLeft size={20} />
                        Back to campaigns
                    </button>
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
                            <div>


                                <div className="overflow-hidden rounded-[2.5rem] border border-white/30 bg-white shadow-2xl">

                                    {/* Selected Campaign */}
                                    {campaign && (
                                        <div className="relative h-[320px] overflow-hidden">
                                            <Image
                                                src={`${imageBaseUrl}${campaign.image}`}
                                                alt={campaign.name}
                                                fill
                                                className="object-cover"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                            <div className="absolute bottom-8 left-8">
                                                <h2 className="text-4xl font-black text-white">
                                                    {campaign.name}
                                                </h2>

                                                <p title={campaign.description} className="mt-3 max-w-3xl line-clamp-4 text-lg text-white/80">
                                                    {campaign.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Donation Form */}
                                    <div className="p-4 md:p-8">
                                        <h3 className="text-2xl font-bold text-gray-950">
                                            Select donation amount
                                        </h3>

                                        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                                            {predefinedAmounts.map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() =>
                                                        handleAmountSelect(amount)
                                                    }
                                                    className={`rounded-3xl border-2 p-5 cursor-pointer text-xl font-bold transition-all duration-300 ${selectedAmount === amount
                                                        ? 'border-teal-600 bg-teal-600 text-white shadow-xl'
                                                        : 'border-gray-200 bg-white hover:border-teal-500'
                                                        }`}
                                                >
                                                    ₹{amount.toLocaleString('en-IN')}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Custom Amount */}
                                        <div className="mt-6">
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
                                                    className="w-full px-4 py-4 text-2xl font-semibold outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Summary */}
                                        <div className="mt-6 rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white shadow-2xl">

                                            <p className="text-lg text-white/80">
                                                Your Donation
                                            </p>

                                            <h2 className="mt-2 text-5xl font-black">
                                                ₹
                                                {finalAmount
                                                    ? finalAmount.toLocaleString('en-IN')
                                                    : '0'}
                                            </h2>

                                            <p className="mt-3 max-w-xl text-white/80">
                                                Every contribution helps us provide food,
                                                healthcare, education, and support to
                                                underserved communities.
                                            </p>

                                            <button
                                                onClick={handleProceedToPayment}
                                                disabled={!finalAmount}
                                                className="mt-5 rounded-2xl cursor-pointer bg-white px-8 py-4 text-lg font-bold text-teal-700 shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Proceed to Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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