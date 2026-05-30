'use client'

import Image from 'next/image'
import Link from 'next/link'
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
import { useGetGalleryQuery } from '@/lib/services/master-api'

export default function Events() {
  const { data: galleryData, isLoading } = useGetGalleryQuery();


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
      {/* Coming Soon */}
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
                <Link key={event.id} href={`/events/${event.id}`}>
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
      <div className="my-16 px-4">
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

        <div className="mt-20 grid grid-cols-1 auto-rows-[260px] gap-6 md:grid-cols-2 lg:grid-cols-4">

          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse overflow-hidden rounded-[2rem] bg-slate-200 ${index === 0
                  ? 'lg:col-span-2 lg:row-span-2'
                  : index === 5
                    ? 'lg:col-span-2'
                    : ''
                  }`}
              />
            ))
            : galleryData?.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-[2rem] ${index === 0
                  ? 'lg:col-span-2 lg:row-span-2'
                  : index === 5
                    ? 'lg:col-span-2'
                    : ''
                  }`}
              >
                <Image
                  src={`https://awcai.cloud/script/ngo/public/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 ${index === 0 || index === 5
                    ? 'bg-gradient-to-t from-black/70 via-black/10 to-transparent'
                    : 'bg-black/30'
                    }`}
                />

                {/* Content */}
                <div className="absolute bottom-6 left-6">
                 

                  <h3
                    className={`mt-2 font-bold text-white ${index === 0 || index === 5
                      ? 'text-3xl'
                      : 'text-2xl'
                      }`}
                  >
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
        </div>
      </div>

    </main>
  )
}