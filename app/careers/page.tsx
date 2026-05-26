import Link from 'next/link'
import { ngoInfo } from '@/lib/mockData'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, HeartHandshake, Mail, MapPin, Users } from 'lucide-react'

export const metadata = {
  title: `Careers - ${ngoInfo.name}`,
  description: `Career and volunteer opportunities at ${ngoInfo.name}.`,
}

export default function Careers() {
  const openings = [
    {
      title: 'Community Outreach Volunteer',
      type: 'Volunteer',
      location: 'Field camps / Remote support',
      description: 'Help with member coordination, camp registration, beneficiary follow-ups, and event support.',
    },
    {
      title: 'Rehabilitation Program Assistant',
      type: 'Part-time',
      location: 'Bangalore',
      description: 'Support prosthetic care programs, documentation, and coordination with beneficiaries and specialists.',
    },
    {
      title: 'Fundraising & Partnerships Intern',
      type: 'Internship',
      location: 'Hybrid',
      description: 'Assist with donor communication, campaign updates, and partnership research for active projects.',
    },
  ]

  return (
    <main>
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm">
                <BriefcaseBusiness size={16} />
                Careers
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
                Work with a team restoring mobility and confidence.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                Join us as a staff member, intern, volunteer, or partner. Every role helps bring prosthetic care and rehabilitation closer to people who need it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${ngoInfo.contact.email}`} className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-bold text-white transition-colors hover:bg-teal-700">
                  Apply by Email <Mail size={18} />
                </a>
                <Link href="/contact" className="rounded border-2 border-teal-600 bg-white px-6 py-3 font-bold text-teal-700 transition-colors hover:bg-teal-50">
                  Contact Team
                </Link>
              </div>
            </div>

            <div className="rounded-lg bg-teal-700 p-8 text-white shadow-lg">
              <HeartHandshake size={36} />
              <h2 className="mt-6 text-3xl font-bold">People-first work</h2>
              <p className="mt-4 leading-relaxed text-white/90">
                We value empathy, accountability, field learning, and practical problem-solving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Open roles</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-950">Current opportunities</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              These sample roles can be updated anytime as your hiring or volunteer needs change.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {openings.map((opening) => (
              <div key={opening.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Users size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-950">{opening.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase text-yellow-700">{opening.type}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                    <MapPin size={13} />
                    {opening.location}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{opening.description}</p>
                <a href={`mailto:${ngoInfo.contact.email}?subject=Application: ${opening.title}`} className="mt-6 inline-flex items-center gap-2 font-bold text-teal-700 transition-colors hover:text-teal-800">
                  Apply now <ArrowRight size={17} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ['Field impact', 'Work close to communities and real beneficiary needs.'],
            ['Learning culture', 'Build skills through camps, coordination, and program work.'],
            ['Purposeful contribution', 'Support mobility, dignity, and long-term independence.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <BadgeCheck className="text-teal-600" size={26} />
              <h3 className="mt-5 text-xl font-bold text-gray-950">{title}</h3>
              <p className="mt-3 text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
