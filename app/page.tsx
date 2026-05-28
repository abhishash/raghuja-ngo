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
              <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight text-gray-950 md:text-4xl">
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
              <div className="absolute -left-28 -top-8 hidden w-64 rounded-[2rem] border border-white/30 bg-white/70 p-6 shadow-2xl backdrop-blur-xl lg:block">
                <Target className="text-teal-700" size={34} />

                <h3 className="mt-5 text-2xl font-bold text-gray-950">
                  Vision
                </h3>

                <p className="mt-3 leading-relaxed text-gray-600">
                  {ngoInfo.vision}
                </p>
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/40 to-white px-4 py-24">
        {/* Background Effects */}
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-cyan-200/40 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
                <Sparkles size={16} className="text-teal-700" />

                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                  Donation Campaigns
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
                Transform lives through meaningful giving
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                Support active projects funding prosthetic limbs,
                rehabilitation camps, healthcare access, education,
                and sustainable livelihood opportunities.
              </p>
            </div>

            <Link
              href="/donate"
              className="group inline-flex items-center gap-3 self-start rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-yellow-500/30"
            >
              Donate Now

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* CAMPAIGNS GRID */}
          <div className="grid gap-8 lg:grid-cols-3">
            {featuredCampaigns.map((campaign, index) => {
              const progress = Math.min(
                Math.round((campaign.current / campaign.target) * 100),
                100
              )

              const campaignImage = campaignImages[index]

              return (
                <Link
                  key={campaign.id}
                  href={`/donate?campaign=${campaign.id}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                  {/* TOP IMAGE */}
                  <div className="relative h-72 overflow-hidden">

                    <img
                      src={campaignImage.src}
                      alt={campaignImage.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Floating Badge */}
                    <div className="absolute left-5 top-5">
                      <div className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-xl backdrop-blur-md">
                        {campaign.category}
                      </div>
                    </div>

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
                      {campaign.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
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
                            ₹{campaign.current.toLocaleString('en-IN')}
                          </h4>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Goal
                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-700">
                            ₹{campaign.target.toLocaleString('en-IN')}
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
        </div>
      </section>

      {/* =========================
   SERVICES SECTION
========================= */}
      <section className="relative overflow-hidden bg-white px-4 py-24">
        {/* Background Glow */}
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-teal-100 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-100 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <Sparkles size={16} className="text-teal-700" />

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                Our Work
              </span>
            </div>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight text-gray-950 md:text-6xl">
              Programs creating measurable impact
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              Each initiative is designed to move communities from
              immediate support toward sustainable independence and dignity.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services?id=${service.id}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-900/10"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Icon */}
                  <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-xl backdrop-blur-md">
                    <Heart size={28} />
                  </div>

                  {/* Impact Badge */}
                  <div className="absolute bottom-5 left-5 rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-white shadow-xl">
                    {service.impact}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold leading-snug text-gray-950 transition-colors duration-300 group-hover:text-teal-700">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                      Learn More
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
   EVENTS SECTION
========================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 py-24">

        <div className="absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-teal-100/60 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                  Upcoming Events
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-black text-gray-950 md:text-6xl">
                Meet us at our next programs
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Join camps, awareness drives, outreach initiatives,
                and community gatherings where support transforms into action.
              </p>
            </div>

            <Link
              href="/events"
              className="group inline-flex items-center gap-3 rounded-2xl border border-teal-200 bg-white px-7 py-4 font-semibold text-teal-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 hover:text-white"
            >
              View Events

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Event Cards */}
          <div className="grid gap-8 lg:grid-cols-2">
            {latestEvents.map((event, index) => {
              const eventImage = eventImages[index]

              return (
                <Link
                  key={event.id}
                  href={`/events?id=${event.id}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="grid sm:grid-cols-[0.9fr_1.1fr]">

                    {/* Image */}
                    <div className="relative min-h-[320px] overflow-hidden">
                      <Image
                        src={eventImage.src}
                        alt={eventImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                      {/* Date */}
                      <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
                        <p className="text-4xl font-black text-teal-700">
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                          })}
                        </p>

                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            month: 'short',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                        <CalendarDays size={28} />
                      </div>

                      <h3 className="mt-6 text-3xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-teal-700">
                        {event.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-gray-600">
                        {event.description}
                      </p>

                      {/* Info */}
                      <div className="mt-8 space-y-4 text-sm">

                        <div className="flex items-center gap-3 text-gray-600">
                          <Clock size={18} className="text-teal-700" />
                          {event.time}
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin size={18} className="text-teal-700" />
                          {event.location}
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <Users size={18} className="text-teal-700" />
                          {event.attendees.toLocaleString('en-IN')} attendees
                        </div>
                      </div>

                      <div className="mt-auto pt-8">
                        <span className="inline-flex items-center gap-2 font-semibold text-teal-700 transition-transform duration-300 group-hover:translate-x-1">
                          Event Details

                          <ArrowRight size={18} />
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

      {/* =========================
   VLOGS SECTION
========================= */}
      <section className="relative overflow-hidden bg-white px-4 py-24">
        <div className="absolute -right-20 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-100/60 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-teal-200 bg-teal-50/70 px-5 py-2 shadow-sm backdrop-blur-md">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                  Impact Vlogs
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-black text-gray-950 md:text-6xl">
                Stories from the field
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Watch inspiring moments from our outreach programs,
                rehabilitation camps, volunteer drives, and transformation journeys.
              </p>
            </div>

            <Link
              href="/events"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Watch More

              <PlayCircle size={20} />
            </Link>
          </div>

          {/* Vlog Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {latestVlogs.map((vlog, index) => {
              const vlogImage = vlogImages[index]

              return (
                <Link
                  key={vlog.id}
                  href="/events"
                  className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={vlogImage.src}
                      alt={vlogImage.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-gray-950">
                        <PlayCircle size={36} />
                      </div>
                    </div>

                    {/* Views */}
                    <div className="absolute bottom-5 right-5 rounded-full bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                      <span className="inline-flex items-center gap-2">
                        <Eye size={16} />
                        {vlog.views.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h3 className="text-2xl font-bold leading-snug text-gray-950 transition-colors group-hover:text-teal-700">
                      {vlog.title}
                    </h3>

                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {new Date(vlog.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>

                      <span className="inline-flex items-center gap-2 font-semibold text-teal-700 transition-transform duration-300 group-hover:translate-x-1">
                        Play

                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================
   CTA SECTION
========================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 px-4 py-24">

        {/* Glow */}
        <div className="absolute -left-20 top-0 h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Left */}
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Join The Movement
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
              Become part of something meaningful
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-white/85">
              Members help us identify urgent needs, organize programs,
              support rehabilitation camps, and keep care connected
              beyond a single donation.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-5">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
            >
              Join as Member

              <Users
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            <Link
              href="/donate"
              className="group inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-gray-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
            >
              Donate Now

              <Heart
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </section>


    </>
  )
}
