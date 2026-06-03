"use client";

import Link from 'next/link'
import {
    ArrowRight,
    CalendarDays,
    Clock,
    MapPin,
    Users,
} from 'lucide-react'
import Image from 'next/image'

import { useGetHomeUpComingEventQuery, useGetUpComingEventQuery } from "@/lib/services/events-api";
import { imageBaseUrl } from '@/lib/constants';
import { isArray } from '@/lib/type-guards';

const EventCardSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl">
            <div className="grid sm:grid-cols-[0.9fr_1.1fr] animate-pulse">

                {/* Image Skeleton */}
                <div className="relative min-h-[320px] bg-gray-200">
                    <div className="absolute left-5 top-5 h-20 w-20 rounded-2xl bg-white/70"></div>
                </div>

                {/* Content Skeleton */}
                <div className="flex flex-col p-8">
                    <div className="h-14 w-14 rounded-2xl bg-gray-200"></div>

                    <div className="mt-6 h-8 w-3/4 rounded bg-gray-200"></div>

                    <div className="mt-4 space-y-3">
                        <div className="h-4 w-full rounded bg-gray-200"></div>
                        <div className="h-4 w-11/12 rounded bg-gray-200"></div>
                        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="h-5 w-32 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EventsSection = () => {
    const { data: latestEvents, isLoading } = useGetHomeUpComingEventQuery();

    if (isLoading) {
        return (

            <div className="grid gap-8 lg:grid-cols-2">
                {Array.from({ length: 2 }, (_, index) => (
                    <EventCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    return (
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

                {/* Events */}

                {
                    isLoading ? <div className="grid gap-8 lg:grid-cols-2">
                        {Array.from({ length: 2 }, (_, index) => (
                            <EventCardSkeleton key={index} />
                        ))}
                    </div> : isArray(latestEvents) ? (
                        <div className="grid gap-8 lg:grid-cols-2">
                            {latestEvents?.map((event) => {
                                return (
                                    <Link
                                        key={event.id}
                                        href={`/events/${event.id}`}
                                        className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                    >
                                        <div className="grid sm:grid-cols-[0.9fr_1.1fr]">

                                            {/* Image */}
                                            <div className="relative min-h-[320px] overflow-hidden">
                                                <Image
                                                    src={`${imageBaseUrl}${event.image}`}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                                                {/* Date */}
                                                <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
                                                    <p className="text-4xl font-black text-teal-700">
                                                        {new Date(event.event_date).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                        })}
                                                    </p>

                                                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                                                        {new Date(event.event_date).toLocaleDateString('en-IN', {
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

                                                <p className="mt-4 line-clamp-3 leading-relaxed text-gray-600">
                                                    {event.description}
                                                </p>

                                                {/* Info */}
                                                <div className="mt-8 space-y-4 text-sm">

                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Clock size={18} className="text-teal-700" />
                                                        {event.event_date
                                                            ? new Date(event.event_date).toLocaleTimeString('en-IN', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })
                                                            : 'Time not specified'}
                                                    </div>

                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <MapPin size={18} className="text-teal-700" />
                                                        {event.location}
                                                    </div>

                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Users size={18} className="text-teal-700" />
                                                        {event.attendees} attendees
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
                    ) : <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-teal-200 bg-white px-6 py-24 text-center shadow-lg">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
                            <CalendarDays className="text-teal-700" size={40} />
                        </div>

                        <h3 className="mt-6 text-3xl font-bold text-gray-900">
                            No Upcoming Events
                        </h3>

                        <p className="mt-4 max-w-xl text-gray-600">
                            We don’t have any scheduled events right now.
                            Please check back later for awareness drives,
                            community programs, and fundraising activities.
                        </p>
                    </div>
                }

            </div>
        </section>
    )
}

export default EventsSection