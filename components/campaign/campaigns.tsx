"use client"
import { imageBaseUrl } from "@/lib/constants";
import { useGetCampaignsQuery } from "@/lib/services/campaign-api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CampaignsSkeleton from "./placehoder/campaigns-skeleton";

const Campaigns = () => {
    const { data: campaigns, isLoading } = useGetCampaignsQuery();
    if (isLoading) {
        return <CampaignsSkeleton />
    }

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {campaigns?.map((campaign, index) => {
                const raisedAmount = Number(campaign.raised_amount) || 0;
                const targetAmount = Number(campaign.target_amount) || 1;
                const progress = Math.min(
                    Math.round((raisedAmount / targetAmount) * 100),
                    100
                )


                return (
                    <Link
                        key={campaign.id}
                        href={`/donate/${campaign.id}`}
                        className="group relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-900/10"
                    >
                        {/* TOP IMAGE */}
                        <div className="relative h-72 overflow-hidden">

                            <img
                                src={
                                    campaign.image
                                        ? `${imageBaseUrl}${campaign.image}`
                                        : "/placeholder-campaign.jpg"
                                }
                                alt={campaign.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>


                            {/* Progress Chip */}
                            <div className="absolute bottom-5 left-5">
                                <div className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-white shadow-2xl">
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-300"></span>

                                    {progress}% Funded
                                </div>
                            </div>

                            {/* Donor Count */}
                            <div className="absolute bottom-5 right-5 rounded-full bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                {campaign.donors.toLocaleString('en-IN')} Donors
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-7">

                            <h3 className="text-2xl font-bold leading-snug text-gray-950 transition-colors duration-300 group-hover:text-teal-700">
                                {campaign.name}
                            </h3>

                            <p className="mt-4 text-[15px] line-clamp-4 leading-relaxed text-gray-600">
                                {campaign.description}
                            </p>

                            {/* Stats */}
                            <div className="mt-7 rounded-3xl bg-gray-50 p-5">

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Raised
                                        </p>

                                        <h4 className="mt-1 text-2xl font-black text-gray-950">
                                            ₹{campaign.raised_amount}
                                        </h4>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Goal
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-700">
                                            ₹{campaign.target_amount}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-5">
                                    <div className="relative h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner">

                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-yellow-400 shadow-[0_0_20px_rgba(20,184,166,0.45)] transition-all duration-1000"
                                            style={{ width: `${progress}%` }}
                                        />

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.45)_40%,transparent_70%)] animate-[progress-shine_2.8s_linear_infinite]" />
                                    </div>
                                </div>

                                {/* Bottom CTA */}
                                <div className="mt-6 flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Every contribution creates real impact
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg transition-all duration-300 group-hover:translate-x-1 group-hover:bg-teal-700">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-200/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                    </Link>
                )
            })}
        </div>

    )
}

export default Campaigns;