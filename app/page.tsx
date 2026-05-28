import Link from 'next/link'
import { HeroCarousel } from '@/components/HeroCarousel'
import { ngoInfo, services, campaigns, events, vlogs } from '@/lib/mockData'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Eye,
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
import Image from 'next/image'

export default async function Home() {

  const homePageBanners = await fetchHandler<{
    data: HomePageDataTypes[];
  }>({
    ...(HOMEPAGE_SLIDERS as {
      endpoint: string;
      method: methods;
    }),
  });

  const {
    data: homePageBannerLists,
  }: {
    data: BannerDataTypes[];
  } = homePageBanners;

  const campaignImages = [
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      alt: 'Healthcare team supporting a patient during mobility care',
    },
    {
      src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=900&q=80',
      alt: 'Rehabilitation therapist helping a patient with recovery',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      alt: 'Community skill training session with young learners',
    },
    {
      src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      alt: 'Mobile healthcare support reaching people in the community',
    },
  ]
  const eventImages = [
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
      alt: 'Community gathering during a foundation event',
    },
    {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
      alt: 'People attending a social impact conference',
    },
  ]
  const vlogImages = [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      alt: 'Students and volunteers sharing a community story',
    },
    {
      src: 'https://images.unsplash.com/photo-1576765607924-6f3d9f62fdaf?auto=format&fit=crop&w=900&q=80',
      alt: 'Healthcare support team documenting field work',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80',
      alt: 'Volunteers working together during an outreach program',
    },
  ]
  const featuredCampaigns = campaigns.slice(0, 3)
  const latestEvents = events.slice(0, 2)
  const latestVlogs = vlogs.slice(0, 3)

  return (
    <>

      {isArray(homePageBannerLists) ? (
        <HeroCarousel slides={homePageBannerLists} />) : null}

      <section className="relative overflow-hidden bg-white px-4 py-24">
        {/* Background Effects */}
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-teal-100 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-100 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

            {/* LEFT CONTENT */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-5 py-2 shadow-sm backdrop-blur-md">
                <Sparkles size={16} className="text-teal-700" />

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  NGO Introduction
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                {ngoInfo.name} builds access to mobility, confidence, and independence.
              </h1>

              {/* Description */}
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
                {ngoInfo.description}
              </p>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
                {ngoInfo.mission}
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="/donate"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Donate Now

                  <ArrowRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/membership"
                  className="inline-flex items-center gap-3 rounded-2xl border border-teal-200 bg-white px-8 py-4 font-semibold text-teal-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 hover:bg-teal-50"
                >
                  Join as Member
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-14 grid gap-5 sm:grid-cols-3">

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
                  <h3 className="text-4xl font-black text-teal-700">
                    15K+
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Lives impacted through programs
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
                  <h3 className="text-4xl font-black text-teal-700">
                    120+
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Community volunteers
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
                  <h3 className="text-4xl font-black text-teal-700">
                    {new Date().getFullYear() - ngoInfo.founded}+
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Years of service
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop"
                  alt="NGO Community"
                  width={900}
                  height={1000}
                  className="h-[650px] w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* Floating Mission Card */}
                <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg">
                      <Heart size={28} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
                        Mission First
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-white">
                        Care beyond intervention
                      </h3>

                      <p className="mt-3 leading-relaxed text-white/80">
                        We believe mobility is dignity, independence, and
                        opportunity for every individual.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-10 hidden w-64 rounded-[2rem] border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-xl lg:block">
                <Target className="text-teal-700" size={34} />

                <h3 className="mt-5 text-2xl font-bold text-gray-950">
                  Vision
                </h3>

                <p className="mt-3 leading-relaxed text-gray-600">
                  {ngoInfo.vision}
                </p>
              </div>

              <div className="absolute -bottom-10 right-0 hidden w-72 rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-7 text-white shadow-2xl lg:block">
                <Users size={34} />

                <h3 className="mt-5 text-2xl font-bold">
                  Community Driven
                </h3>

                <p className="mt-3 leading-relaxed text-white/85">
                  Members, donors, doctors, and volunteers working together
                  since {ngoInfo.founded}.
                </p>

                <Link
                  href="/membership"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-teal-700 transition-all hover:bg-gray-100"
                >
                  Join Community

                  <ArrowRight size={18} />
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
              const campaignImage = campaignImages[index]

              return (
                <Link
                  key={campaign.id}
                  href={`/donate?campaign=${campaign.id}`}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/10"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={campaignImage.src}
                      alt={campaignImage.alt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/10 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase text-teal-700 shadow-sm backdrop-blur">
                      {campaign.category}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-gray-950 shadow-lg">
                        <span className="h-2 w-2 rounded-full bg-teal-700" />
                        {progress}% funded
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-teal-700">
                      {campaign.title}
                    </h3>
                    <p className="mt-3 min-h-12 text-sm leading-relaxed text-gray-700">{campaign.description}</p>

                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                      <div className="mb-3 flex items-end justify-between gap-4 text-sm">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Raised</p>
                          <p className="mt-1 font-bold text-gray-900">
                            Rs. {campaign.current.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Goal</p>
                          <p className="mt-1 font-semibold text-gray-700">
                            Rs. {campaign.target.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <div
                        className="relative h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${progress}% donation progress`}
                      >
                        <div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-yellow-400 shadow-[0_0_18px_rgba(20,184,166,0.45)] animate-[progress-fill_1.2s_ease-out_both]"
                          style={{ width: `${progress}%` }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.55)_35%,transparent_70%)] animate-[progress-shine_2.4s_ease-in-out_infinite]" />
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-bold text-teal-700">
                            {campaign.donors.toLocaleString('en-IN')}
                          </span>{' '}
                          donors
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-700 transition-transform group-hover:translate-x-1">
                          Support <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
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
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Upcoming events</span>
              <h2 className="mt-3 text-4xl font-bold text-gray-900">Meet us at our next programs</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-700">
                Join camps, gatherings, and community sessions where support turns into direct action.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded border-2 border-teal-600 px-6 py-3 font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              View Events <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {latestEvents.map((event, index) => {
              const eventImage = eventImages[index]

              return (
                <Link
                  key={event.id}
                  href={`/events?id=${event.id}`}
                  className="group grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/10 sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative min-h-64 overflow-hidden bg-gray-100 sm:min-h-full">
                    <Image
                      src={eventImage.src}
                      alt={eventImage.alt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-3 text-center shadow-lg">
                      <p className="text-3xl font-bold leading-none text-teal-700">
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric' })}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                      <CalendarDays size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-teal-700">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{event.description}</p>
                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-teal-700" />
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-teal-700" />
                        {event.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users size={16} className="text-teal-700" />
                        {event.attendees.toLocaleString('en-IN')} expected attendees
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold text-teal-700 transition-transform group-hover:translate-x-1">
                      Event details <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Impact vlogs</span>
              <h2 className="mt-3 text-4xl font-bold text-gray-900">Stories from the field</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-700">
                Watch recent updates from our camps, beneficiaries, volunteers, and care teams.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
            >
              Watch More <PlayCircle size={20} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestVlogs.map((vlog, index) => {
              const vlogImage = vlogImages[index]

              return (
                <Link
                  key={vlog.id}
                  href="/events"
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img
                      src={vlogImage.src}
                      alt={vlogImage.alt}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-teal-700 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-gray-950">
                        <PlayCircle size={34} />
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs font-semibold text-white">
                      <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">Video story</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 backdrop-blur">
                        <Eye size={14} />
                        {vlog.views.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-teal-700">
                      {vlog.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-600">
                      <span>
                        {new Date(vlog.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-teal-700 transition-transform group-hover:translate-x-1">
                        Play <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
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
