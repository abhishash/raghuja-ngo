import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { events } from '@/lib/mockData'

import {
    Calendar,
    Clock,
    MapPin,
    Users,
    ArrowLeft,
    ArrowRight,
} from 'lucide-react'

type Props = {
    params: {
        id: string
    }
}

export default async function EventDetails({ params }: Props) {
    const { id } = await params
    const event = events.find(
        (e) => e.id === parseInt(id)
    )

    if (!event) {
        notFound()
    }

    return (
        <main className="bg-white">
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

            <div className="mx-auto max-w-5xl px-4 py-24">
                {/* Back */}
                <Link
                    href="/events"
                    className="mb-10 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-800"
                >
                    <ArrowLeft size={20} />
                    Back to Events
                </Link>

                {/* Card */}
                <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">

                    {/* Image */}
                    <div className="relative h-[500px]">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <div className="inline-flex rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white">
                                Upcoming Event
                            </div>

                            <h1 className="mt-5 text-5xl font-black text-white">
                                {event.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">

                        {/* Info */}
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                            <div className="rounded-3xl bg-teal-50 p-6">
                                <Calendar
                                    className="text-teal-700"
                                    size={28}
                                />

                                <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                                    Date
                                </p>

                                <p className="mt-2 font-bold text-gray-950">
                                    {new Date(event.date).toLocaleDateString(
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
                                <Clock
                                    className="text-teal-700"
                                    size={28}
                                />

                                <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                                    Time
                                </p>

                                <p className="mt-2 font-bold text-gray-950">
                                    {event.time}
                                </p>
                            </div>

                            <div className="rounded-3xl bg-teal-50 p-6">
                                <MapPin
                                    className="text-teal-700"
                                    size={28}
                                />

                                <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                                    Location
                                </p>

                                <p className="mt-2 font-bold text-gray-950">
                                    {event.location}
                                </p>
                            </div>

                            <div className="rounded-3xl bg-teal-50 p-6">
                                <Users
                                    className="text-teal-700"
                                    size={28}
                                />

                                <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                                    Attendees
                                </p>

                                <p className="mt-2 font-bold text-gray-950">
                                    {event.attendees}+ Expected
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-14 rounded-[2rem] bg-slate-50 p-8">
                            <h2 className="text-3xl font-bold text-gray-950">
                                About This Event
                            </h2>

                            <p className="mt-6 text-lg leading-relaxed text-gray-600">
                                {event.description}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-14 rounded-[2rem] bg-gradient-to-r from-teal-600 to-cyan-600 p-10 text-center">

                            <h2 className="text-4xl font-bold text-white">
                                Join this meaningful event
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
                                Become part of our mission and help us create
                                positive change together.
                            </p>

                            <a
                                href="mailto:events@hopefoundation.org"
                                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700"
                            >
                                Register Now
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}