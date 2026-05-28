'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { events, vlogs } from '@/lib/mockData'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Play,
  ArrowRight,
} from 'lucide-react'

export default function Events() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('id')

  const selectedEvent = selectedId
    ? events.find((e) => e.id === parseInt(selectedId))
    : null

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-28">
        {/* Background Effects */}
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                Events & Vlogs
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-950 md:text-7xl">
              Stories, events & moments of impact
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              Stay connected with our latest community programs,
              celebrations, outreach activities, and inspiring stories
              through events and video highlights.
            </p>
          </div>
        </div>
      </section>

      {selectedEvent ? (
        /* EVENT DETAIL PAGE */
        <section className="relative bg-white px-4 py-24">
          <div className="mx-auto max-w-5xl">
            {/* Back Button */}
            <Link
              href="/events"
              className="mb-10 inline-flex items-center gap-2 font-semibold text-teal-700 transition-colors hover:text-teal-800"
            >
              <ArrowLeft size={20} />
              Back to Events
            </Link>

            {/* Main Card */}
            <div className="overflow-hidden rounded-[2.5rem] border border-white/30 bg-white shadow-2xl">

              {/* Hero Image */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src={
                    selectedEvent.image ||
                    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop'
                  }
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="inline-flex rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                    Upcoming Event
                  </div>

                  <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                    {selectedEvent.title}
                  </h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">

                {/* Info Grid */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                  <div className="rounded-3xl bg-teal-50 p-6">
                    <Calendar className="text-teal-700" size={28} />

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                      Date
                    </p>

                    <p className="mt-2 font-bold text-gray-950">
                      {new Date(selectedEvent.date).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-teal-50 p-6">
                    <Clock className="text-teal-700" size={28} />

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                      Time
                    </p>

                    <p className="mt-2 font-bold text-gray-950">
                      {selectedEvent.time}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-teal-50 p-6">
                    <MapPin className="text-teal-700" size={28} />

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                      Location
                    </p>

                    <p className="mt-2 font-bold text-gray-950">
                      {selectedEvent.location}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-teal-50 p-6">
                    <Users className="text-teal-700" size={28} />

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                      Attendees
                    </p>

                    <p className="mt-2 font-bold text-gray-950">
                      {selectedEvent.attendees}+ Expected
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-14 rounded-[2rem] bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-950">
                    About This Event
                  </h2>

                  <p className="mt-6 text-lg leading-relaxed text-gray-600">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-10 text-center shadow-2xl">

                  <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>

                  <div className="relative">
                    <h2 className="text-4xl font-bold text-white">
                      Join this meaningful event
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                      Become part of our mission and help us create
                      positive change together with the community.
                    </p>

                    <a
                      href="mailto:events@hopefoundation.org"
                      className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      Register Now
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>

        /* LIST PAGE */
          <section className="bg-white px-4 py-24">
            <div className="mx-auto max-w-7xl">

              {/* EVENTS */}
              <div>
                <div className="text-center">
                  <div className="inline-flex rounded-full bg-teal-50 px-5 py-2">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                      Upcoming Events
                    </span>
                  </div>

                  <h2 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
                    Community gatherings & celebrations
                  </h2>

                  <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
                    Join our events and outreach programs designed to
                    inspire, support, and empower communities.
                  </p>
                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2">
                  {events.map((event) => (
                    <Link key={event.id} href={`/events?id=${event.id}`}>
                      <div className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                        {/* Image */}
                        <div className="relative h-80 overflow-hidden">
                          <Image
                            src={
                              event.image ||
                              'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop'
                            }
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                          {/* Date */}
                          <div className="absolute left-6 top-6 rounded-2xl bg-white/20 px-5 py-3 text-white shadow-xl backdrop-blur-md">
                            <p className="text-sm font-medium">
                              {new Date(event.date).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                }
                              )}
                            </p>

                            <p className="text-2xl font-bold">
                              {new Date(event.date).toLocaleDateString(
                                'en-US',
                                {
                                  day: 'numeric',
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <h3 className="text-3xl font-bold text-gray-950">
                            {event.title}
                          </h3>

                          <p className="mt-5 leading-relaxed text-gray-600">
                            {event.description}
                          </p>

                          <div className="mt-8 flex items-center justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-gray-500">
                                <MapPin size={18} />
                                {event.location}
                              </div>

                              <div className="flex items-center gap-2 text-gray-500">
                                <Users size={18} />
                                {event.attendees}+ Attendees
                              </div>
                            </div>

                            <div className="rounded-full bg-teal-50 p-4 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                              <ArrowRight size={22} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* VLOGS */}
              <div className="mt-32">
                <div className="text-center">
                  <div className="inline-flex rounded-full bg-teal-50 px-5 py-2">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                      Latest Vlogs
                    </span>
                  </div>

                  <h2 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
                    Stories of impact in motion
                  </h2>

                  <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
                    Watch inspiring videos showcasing our outreach,
                    community support, and transformation journeys.
                  </p>
                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2">
                  {vlogs.map((vlog) => (
                    <div
                      key={vlog.id}
                      className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={
                            vlog.thumbnail
                            // ||
                            // `https://img.youtube.com/vi/${vlog.videoId}/maxresdefault.jpg`
                          }
                          alt={vlog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                            <Play
                              className="ml-1 text-white"
                              fill="white"
                              size={36}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-950">
                          {vlog.title}
                        </h3>

                        <div className="mt-5 flex items-center justify-between">
                          <div>
                            <p className="text-gray-500">
                              {new Date(vlog.date).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </p>

                            <p className="mt-1 font-semibold text-teal-700">
                              {vlog.views.toLocaleString()} views
                            </p>
                          </div>

                          <a
                            href={`https://youtube.com/watch?v=${vlog.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-2xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-700"
                          >
                            Watch
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* PHOTO GALLERY */}
          <div className="my-16">
            <div className="text-center">
              <div className="inline-flex rounded-full bg-teal-50 px-5 py-2">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Photo Gallery
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
                Capturing moments of impact
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
                A glimpse into our community programs, outreach initiatives,
                healthcare camps, education drives, and inspiring stories.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-[260px]">

              {/* Image 1 */}
              <div className="group relative overflow-hidden rounded-[2rem] lg:col-span-2 lg:row-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop"
                  alt="Community support"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-8 left-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">
                    Community Outreach
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Food distribution drive
                  </h3>
                </div>
              </div>

              {/* Image 2 */}
              <div className="group relative overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Education"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    Education Support
                  </h3>
                </div>
              </div>

              {/* Image 3 */}
              <div className="group relative overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                  alt="Healthcare"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    Healthcare Camps
                  </h3>
                </div>
              </div>

              {/* Image 4 */}
              <div className="group relative overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop"
                  alt="Workshop"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    Youth Workshops
                  </h3>
                </div>
              </div>

              {/* Image 5 */}
              <div className="group relative overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
                  alt="Volunteers"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    Volunteers
                  </h3>
                </div>
              </div>

              {/* Image 6 */}
              <div className="group relative overflow-hidden rounded-[2rem] lg:col-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1400&auto=format&fit=crop"
                  alt="Children"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-8 left-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">
                    Hope & Smiles
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Empowering children together
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}