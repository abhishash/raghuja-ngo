import Link from 'next/link'
import { HeroCarousel } from '@/components/HeroCarousel'
import { ngoInfo, services, campaigns, events, vlogs } from '@/lib/mockData'
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  PlayCircle,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { BannerDataTypes, HomePageDataTypes } from '@/lib/types'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { HOMEPAGE_SLIDERS } from '@/lib/constants'
import { isArray } from '@/lib/type-guards'

export default async function Home() {

  const homePageBanners = await fetchHandler<{
    data: HomePageDataTypes[];
  }>({
    ...(HOMEPAGE_SLIDERS as {
      endpoint: string;
      method: methods;
    }),
  });
  const heroSlides = [
    {
      image: '/hero-prosthetic.jpg',
      title: 'Challenging disabilities, enabling lives',
      description:
        'Advanced prosthetic care, rehabilitation, and community support for people who need a stronger path forward.',
      cta: {
        text: 'Donate Now',
        link: '/donate',
      },
    },
    {
      image: '/hero-prosthetic.jpg',
      title: 'Restoring mobility with dignity',
      description:
        'Join RAGHUJA SOCIALWELFARE Foundation as a member, volunteer, or donor and help expand access to quality prosthetic limbs.',
      cta: {
        text: 'Join as Member',
        link: '/membership',
      },
    },
  ]

  const {
    data: homePageBannerLists,
  }: {
    data: BannerDataTypes[];
  } = homePageBanners;

  const campaignLabels = ['Limb Support', 'Rehab Care', 'Skill Training', 'Mobile Clinic']
  const featuredCampaigns = campaigns.slice(0, 3)
  const latestEvents = events.slice(0, 2)
  const latestVlogs = vlogs.slice(0, 3)

  return (
    <>
      
      {isArray(homePageBannerLists) ? (
        <HeroCarousel slides={homePageBannerLists} />) : null}

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                <Sparkles size={16} />
                NGO introduction
              </span>
              <h1 className="mt-6 text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
                {ngoInfo.name} builds access to mobility, confidence, and independence.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-gray-700">{ngoInfo.description}</p>
              <p className="mt-4 text-base leading-relaxed text-gray-700">{ngoInfo.mission}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded bg-yellow-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-600"
                >
                  Donate Now <ArrowRight size={20} />
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded border-2 border-teal-600 px-6 py-3 font-semibold text-teal-600 transition-colors hover:bg-teal-50"
                >
                  Join as Member
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <Heart className="mb-5 text-teal-600" size={30} />
                <h2 className="text-xl font-bold text-gray-900">Mission</h2>
                <p className="mt-3 text-gray-700">{ngoInfo.mission}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <Target className="mb-5 text-teal-600" size={30} />
                <h2 className="text-xl font-bold text-gray-900">Vision</h2>
                <p className="mt-3 text-gray-700">{ngoInfo.vision}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <Users className="mb-5 text-teal-600" size={30} />
                <h2 className="text-xl font-bold text-gray-900">Community</h2>
                <p className="mt-3 text-gray-700">
                  Members, donors, doctors, and volunteers working together since {ngoInfo.founded}.
                </p>
              </div>
              <div className="rounded-lg border border-teal-200 bg-teal-600 p-6 text-white">
                <h2 className="text-xl font-bold">Need support?</h2>
                <p className="mt-3 text-white/90">
                  Register as a member to connect with programs, camps, and care updates.
                </p>
                <Link
                  href="/membership"
                  className="mt-5 inline-flex items-center gap-2 rounded bg-white px-4 py-2 font-semibold text-teal-700 transition-colors hover:bg-gray-100"
                >
                  Join as Member <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Donation campaigns</span>
              <h2 className="mt-3 text-4xl font-bold text-gray-900">Highlighted projects</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-700">
                Support active projects that fund prosthetic limbs, rehab camps, skills training, and mobile access.
              </p>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded bg-yellow-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-600"
            >
              Donate Now <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredCampaigns.map((campaign, index) => {
              const progress = Math.min(Math.round((campaign.current / campaign.target) * 100), 100)

              return (
                <Link
                  key={campaign.id}
                  href={`/donate?campaign=${campaign.id}`}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="mb-5 flex h-32 items-center justify-center rounded bg-teal-50 text-center text-xl font-bold text-teal-700">
                    {campaignLabels[index]}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase text-yellow-700">
                      {campaign.category}
                    </span>
                    <span className="text-sm font-semibold text-teal-700">{progress}% funded</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">{campaign.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{campaign.description}</p>
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold text-gray-900">
                        Rs. {campaign.current.toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-600">Rs. {campaign.target.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-teal-600"
                        style={{ width: `${progress}%` }}
                        aria-label={`${progress}% donation progress`}
                      />
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {campaign.donors.toLocaleString('en-IN')} donors have contributed.
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Our work</span>
            <h2 className="mt-3 text-4xl font-bold text-gray-900">Programs that create measurable impact</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
              Each program is designed to move people from urgent support toward long-term independence.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services?id=${service.id}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-gray-700">{service.description}</p>
                <p className="mt-5 text-sm font-bold text-teal-700">{service.impact}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Latest updates</span>
              <h2 className="mt-3 text-4xl font-bold text-gray-900">Events and vlogs preview</h2>
              <p className="mt-4 text-lg text-gray-700">
                Follow recent camps, community gatherings, and stories from the people behind the work.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded border-2 border-teal-600 px-6 py-3 font-semibold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  View Events <ArrowRight size={20} />
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Join as Member
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {latestEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events?id=${event.id}`}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <CalendarDays className="mb-5 text-teal-600" size={28} />
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{event.description}</p>
                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {new Date(event.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.location}
                    </p>
                  </div>
                </Link>
              ))}

              {latestVlogs.map((vlog) => (
                <Link
                  key={vlog.id}
                  href="/events"
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="mb-5 flex h-24 items-center justify-center rounded bg-gray-900 text-white">
                    <PlayCircle size={36} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{vlog.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {vlog.views.toLocaleString('en-IN')} views -{' '}
                    {new Date(vlog.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-600 px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-4xl font-bold text-white">Become part of the movement.</h2>
            <p className="mt-4 max-w-2xl text-xl text-white/90">
              Members help us identify needs, support camps, share stories, and keep care connected beyond a single donation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 font-semibold text-teal-700 transition-colors hover:bg-gray-100"
            >
              Join as Member <Users size={20} />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded bg-yellow-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-600"
            >
              Donate Now <Heart size={20} />
            </Link>
          </div>
        </div>
      </section>

      
    </>
  )
}
