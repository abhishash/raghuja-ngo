import Link from 'next/link'
import { ngoInfo } from '@/lib/mockData'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Cpu,
  FileCheck2,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPinned,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'

export const metadata = {
  title: `About Us - ${ngoInfo.name}`,
  description: `${ngoInfo.name} history, mission, vision, founder message, and legal details.`,
}

export default function About() {
  const heroStats = [
    { label: 'Founded', value: ngoInfo.founded },
    { label: 'Focus', value: 'Mobility care' },
    { label: 'Model', value: 'Community led' },
  ]

  const history = [
    {
      year: '2015',
      title: 'Foundation started',
      description: 'Raghuja SocialWelfare Foundationbegan with a clear commitment to improve access to prosthetic care and restore independence.',
      icon: Rocket,
    },
    {
      year: '2017',
      title: 'Community camps expanded',
      description: 'The team increased outreach through assessment camps, follow-up care, and beneficiary support programs.',
      icon: MapPinned,
    },
    {
      year: '2020',
      title: 'Technology-led support',
      description: 'Advanced prosthetic solutions and structured rehabilitation became central to the foundation’s service model.',
    },
    {
      year: 'Today',
      title: 'Mobility with dignity',
      description: 'The foundation continues to connect donors, specialists, volunteers, and communities around life-changing mobility support.',
      icon: HeartHandshake,
    },
  ]

  const historyIcons = [Rocket, MapPinned, Cpu, HeartHandshake]

  const missionPoints = [
    { label: 'Provide advanced prosthetic support', icon: Cpu },
    { label: 'Strengthen rehabilitation access', icon: HeartHandshake },
    { label: 'Enable independent living', icon: Users },
  ]

  const visionPoints = [
    { label: 'Accessible care for underserved communities', icon: MapPinned },
    { label: 'Technology-led mobility solutions', icon: Lightbulb },
    { label: 'Long-term dignity and confidence', icon: ShieldCheck },
  ]

  const legalDetails = [
    { label: 'Organization Name', value: ngoInfo.name },
    { label: 'Organization Type', value: 'Non-profit organization' },
    { label: 'Registered Office', value: ngoInfo.contact.address },
    { label: 'Official Email', value: ngoInfo.contact.email },
  ]

  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-teal-50 via-white to-yellow-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-4 py-2 text-sm font-bold text-teal-700 shadow-sm backdrop-blur">
                <BadgeCheck size={16} />
                About us
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-gray-900 md:text-4xl">
                Helping people move forward with technology, care, and dignity.
              </h1>
              <p className="mt-5 max-w-3xl font-medium text-base leading-relaxed text-gray-600">
                {ngoInfo.description}
              </p>
              <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xl font-semibold text-gray-950">{stat.value}</p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-teal-700">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700"
                >
                  Join as Member <ArrowRight size={18} />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded border-2 border-teal-600 bg-white px-6 py-3 font-bold text-teal-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-50"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-white bg-white shadow-2xl shadow-teal-950/10">
                <div className="relative h-80 overflow-hidden bg-gray-100 md:h-[460px]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                    alt="Care team supporting a patient with mobility and rehabilitation"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/95 p-5 shadow-lg backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
                        <Landmark size={26} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Founded in {ngoInfo.founded}</p>
                        <p className="mt-2 leading-relaxed text-gray-700">
                          Built around a simple idea: quality mobility support should reach the people who need it most.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 right-4 hidden rounded-lg border border-white/20 bg-white/10 p-4 text-white shadow-2xl backdrop-blur-md md:block">
                <p className="text-sm font-bold uppercase tracking-wide text-teal-600">
                  Mission first
                </p>

                <p className="mt-2 max-w-56 px-1 rounded-md text-sm leading-relaxed text-black">
                  Care, access, and confidence beyond a single intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-teal-700">
                <CalendarDays size={16} />
                NGO history
              </span>
              <h2 className="mt-5 text-4xl font-bold text-gray-950">Our journey</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                From focused beginnings to wider community outreach, our work has grown through collaboration with beneficiaries, donors, volunteers, and care professionals.
              </p>
            </div>
            <div className="rounded-lg border border-teal-100 bg-teal-50 px-5 py-4">
              <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Milestones</p>
              <p className="mt-1 text-3xl font-bold text-gray-950">{history.length}</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-8 hidden h-1 w-[calc(100%-2rem)] rounded-full bg-gradient-to-r from-teal-100 via-teal-500 to-yellow-300 md:block" />
            <div className="grid gap-5 md:grid-cols-4">
              {history.map((item, index) => {
                const Icon = historyIcons[index]

                return (
                  <div
                    key={item.year}
                    className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10"
                  >
                    <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-gray-100 transition-colors group-hover:text-teal-50">
                      0{index + 1}
                    </div>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-teal-600 text-white shadow-lg shadow-teal-700/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-yellow-400 group-hover:text-gray-950">
                      <Icon size={26} />
                    </div>
                    <p className="mt-6 text-sm font-bold uppercase tracking-wide text-teal-700">{item.year}</p>
                    <h3 className="mt-2 text-xl font-bold text-gray-950 transition-colors group-hover:text-teal-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl mx-auto text-center">
            <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Purpose and direction</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">What guides our work</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Our mission defines the care we deliver today. Our vision keeps that care moving toward wider access, better technology, and lasting dignity.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="group overflow-hidden rounded-lg border border-teal-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/10">
              <div className="bg-teal-600 p-8 text-white">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                    <Target size={32} />
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-50">
                    Mission
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">Care that restores movement</h2>
                <p className="mt-2 text-base leading-relaxed text-white/90">{ngoInfo.mission}</p>
              </div>

              <div className="space-y-4 p-8">
                {missionPoints.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.label} className="flex items-center gap-4 rounded-lg bg-gray-50 px-3 py-1">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                        <Icon size={22} />
                      </span>
                      <p className="font-semibold text-gray-800">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="group overflow-hidden rounded-lg border border-yellow-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-900/10">
              <div className="bg-teal-600 p-8 text-white">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-400 text-gray-950">
                    <Lightbulb size={32} />
                  </div>
                  <span className="rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-200">
                    Vision
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">A future with reachable support</h2>
                <p className="mt-2 text-base leading-relaxed text-white/85">{ngoInfo.vision}</p>
              </div>

              <div className="space-y- p-8">
                {visionPoints.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.label} className="flex items-center gap-4 rounded-lg bg-gray-50 py-2 px-3">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700">
                        <Icon size={22} />
                      </span>
                      <p className="font-semibold text-gray-800">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-24">
        {/* Background Glow */}
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Founder Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                  alt="Founder"
                  className="h-[650px] w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-lg">
                  <p className="text-sm uppercase tracking-[0.25em] text-teal-100">
                    Founder
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Priya Kumar
                  </h3>

                  <p className="mt-1 text-white/80">
                    Founder & Executive Director
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 hidden rounded-3xl bg-white p-6 shadow-2xl lg:block">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-teal-100 p-4">
                    <Users className="text-teal-700" size={28} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Lives Impacted</p>
                    <p className="text-2xl font-bold text-gray-900">25,000+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
                Leadership Message
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-950 md:text-4xl">
                Building dignity, confidence, and independence through care.
              </h2>

              <div className="mt-10 space-y-6">
                <div className="relative rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-xl">
                  <div className="absolute left-6 top-5 text-6xl text-teal-200">
                    “
                  </div>

                  <p className="relative text-lg leading-relaxed text-gray-700">
                    Raghuja SocialWelfare Foundationwas created with the
                    belief that mobility is more than movement. It is confidence,
                    participation, livelihood, and dignity.
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Every prosthetic limb, every rehabilitation session, and every
                    follow-up conversation is part of helping someone return to life
                    with strength.
                  </p>

                  <p className="mt-6 text-lg leading-relaxed text-gray-700">
                    Our work is possible because people choose to stand with us:
                    donors, volunteers, medical partners, members, and families.
                    Together, we can make advanced mobility care more reachable for
                    every person who needs it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-24">
        {/* Background Effects */}
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                Legal Details
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-950 md:text-5xl">
              Organization Information
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Transparency builds trust. Below are the foundational legal and
              operational details of our organization for public reference.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {legalDetails.map((detail, index) => (
              <div
                key={detail.label}
                className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-600/0 opacity-0 transition-all duration-500 group-hover:from-teal-500/5 group-hover:to-teal-600/10 group-hover:opacity-100"></div>

                {/* Number */}
                <div className="absolute right-5 top-5 text-5xl group-hover:text-teal-300 font-black text-gray-100">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                  <FileCheck2 className="text-white" size={30} />
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                    {detail.label}
                  </p>

                  <p className="mt-3 text-lg font-bold leading-relaxed text-gray-950">
                    {detail.value}
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="relative mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-600"></div>
              </div>
            ))}
          </div>

          {/* Bottom Information Card */}
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-yellow-200/50 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 p-8 shadow-xl">

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl"></div>

            <div className="relative flex flex-col gap-6 md:flex-row md:items-start">

              {/* Icon */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg">
                <HeartHandshake className="text-white" size={30} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-gray-950">
                  Compliance & Transparency
                </h3>

                <p className="mt-4 max-w-4xl text-lg leading-relaxed text-gray-700">
                  Additional legal details such as registration certificates,
                  PAN information, 80G / 12A approvals, CSR documentation,
                  annual reports, and audited financial statements can be
                  securely displayed here as the organization expands.
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "80G Certified",
                    "12A Approved",
                    "CSR Eligible",
                    "Annual Reports",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-yellow-300 bg-white/70 px-4 py-2 text-sm font-medium text-yellow-800 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>


  )
}
