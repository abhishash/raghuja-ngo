import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react"
import Image from "next/image"

const DonateHeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-16">

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

                    <h1 className="mt-8 text-5xl font-black leading-tight text-gray-950 md:text-5xl">
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
                            className="h-[480px] w-full object-cover"
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
    )
}

export default DonateHeroSection;