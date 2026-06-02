const CampaignsSkeleton = () => {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl animate-pulse"
                >
                    {/* IMAGE */}
                    <div className="relative h-72 overflow-hidden bg-gray-200">

                        {/* Progress Chip */}
                        <div className="absolute bottom-5 left-5 h-10 w-32 rounded-full bg-gray-300" />

                        {/* Donor Count */}
                        <div className="absolute bottom-5 right-5 h-10 w-24 rounded-full bg-gray-300" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-7">

                        {/* Stats Card */}
                        <div className="mt-7 rounded-3xl bg-gray-50 p-5">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="h-3 w-16 rounded bg-gray-200" />
                                    <div className="mt-3 h-8 w-28 rounded-xl bg-gray-300" />
                                </div>

                                <div className="text-right">
                                    <div className="ml-auto h-3 w-14 rounded bg-gray-200" />
                                    <div className="mt-3 ml-auto h-6 w-24 rounded-lg bg-gray-300" />
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-5">
                                <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                                    <div className="h-full w-2/3 rounded-full bg-gray-300" />
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="h-3 w-44 rounded bg-gray-200" />
                                    <div className="h-3 w-36 rounded bg-gray-200" />
                                </div>

                                <div className="h-12 w-12 rounded-2xl bg-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gray-200/50 blur-3xl" />
                </div>
            ))}
        </div>
    )
}

export default CampaignsSkeleton