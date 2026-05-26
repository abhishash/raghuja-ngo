import Link from 'next/link'
import { ngoInfo } from '@/lib/mockData'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileCheck2,
  HeartHandshake,
  Landmark,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'

export const metadata = {
  title: `About Us - ${ngoInfo.name}`,
  description: `${ngoInfo.name} history, mission, vision, founder message, and legal details.`,
}

export default function About() {
  const history = [
    {
      year: '2015',
      title: 'Foundation started',
      description: 'RAGHUJA SOCIALWELFARE Foundation began with a clear commitment to improve access to prosthetic care and restore independence.',
    },
    {
      year: '2017',
      title: 'Community camps expanded',
      description: 'The team increased outreach through assessment camps, follow-up care, and beneficiary support programs.',
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
    },
  ]

  const legalDetails = [
    { label: 'Organization Name', value: ngoInfo.name },
    { label: 'Organization Type', value: 'Non-profit organization' },
    { label: 'Registered Office', value: ngoInfo.contact.address },
    { label: 'Official Email', value: ngoInfo.contact.email },
  ]

  return (
    <>
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm">
                <BadgeCheck size={16} />
                About us
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
                Helping people move forward with technology, care, and dignity.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                {ngoInfo.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-bold text-white transition-colors hover:bg-teal-700"
                >
                  Join as Member <ArrowRight size={18} />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded border-2 border-teal-600 bg-white px-6 py-3 font-bold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            <div className="rounded-lg bg-teal-700 p-6 text-white shadow-lg">
              <Landmark size={34} />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-teal-100">Founded</p>
              <p className="mt-2 text-5xl font-bold">{ngoInfo.founded}</p>
              <p className="mt-5 leading-relaxed text-white/90">
                Built around a simple idea: quality mobility support should reach the people who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-wide text-teal-700">NGO history</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">Our journey</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              From focused beginnings to wider community outreach, our work has grown through collaboration with beneficiaries, donors, volunteers, and care professionals.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {history.map((item) => (
              <div key={item.year} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <CalendarDays size={24} />
                </div>
                <p className="mt-5 text-2xl font-bold text-gray-950">{item.year}</p>
                <h3 className="mt-3 text-lg font-bold text-gray-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Target size={28} />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-950">Mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">{ngoInfo.mission}</p>
              <div className="mt-6 space-y-3">
                {['Provide advanced prosthetic support', 'Strengthen rehabilitation access', 'Enable independent living'].map((item) => (
                  <p key={item} className="flex items-center gap-3 font-semibold text-gray-800">
                    <ShieldCheck className="text-teal-600" size={20} />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700">
                <Lightbulb size={28} />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-950">Vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">{ngoInfo.vision}</p>
              <div className="mt-6 space-y-3">
                {['Accessible care for underserved communities', 'Technology-led mobility solutions', 'Long-term dignity and confidence'].map((item) => (
                  <p key={item} className="flex items-center gap-3 font-semibold text-gray-800">
                    <ShieldCheck className="text-teal-600" size={20} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-lg bg-teal-700 p-8 text-white shadow-lg">
              <Users size={36} />
              <h2 className="mt-6 text-3xl font-bold">Founder message</h2>
              <p className="mt-4 text-white/90">
                A note from the leadership behind the foundation’s mission and day-to-day work.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
              <p className="text-xl leading-relaxed text-gray-800">
                “RAGHUJA SOCIALWELFARE Foundation was created with the belief that mobility is more than movement. It is confidence, participation, livelihood, and dignity. Every prosthetic limb, every rehabilitation session, and every follow-up conversation is part of helping someone return to life with strength.”
              </p>
              <p className="mt-6 text-xl leading-relaxed text-gray-800">
                “Our work is possible because people choose to stand with us: donors, volunteers, medical partners, members, and families. Together, we can make advanced mobility care more reachable for every person who needs it.”
              </p>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-lg font-bold text-gray-950">Priya Kumar</p>
                <p className="text-gray-600">Founder & Executive Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Legal details</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">Organization information</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Basic public information for reference. Additional registration and compliance documents can be added here when available.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {legalDetails.map((detail) => (
              <div key={detail.label} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <FileCheck2 className="text-teal-600" size={26} />
                <p className="mt-5 text-sm font-semibold text-gray-500">{detail.label}</p>
                <p className="mt-2 font-bold leading-relaxed text-gray-950">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-5">
            <div className="flex items-start gap-3">
              <HeartHandshake className="mt-1 flex-shrink-0 text-yellow-700" size={22} />
              <p className="text-sm leading-relaxed text-yellow-900">
                Optional legal fields such as registration number, PAN, 80G/12A, CSR details, or audited reports can be displayed in this section once finalized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>


  )
}
