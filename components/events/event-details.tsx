"use client";

import { useGetEventByIdQuery } from "@/lib/services/events-api";
import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
} from "lucide-react";

import { imageBaseUrl } from "@/lib/constants";
import { isObject } from "@/lib/type-guards";
import RegisterPopup from "./modal/register-popup";
import RegisterPopUp from "./modal/register-popup";

const EventDetails = ({ id }: { id: string }) => {
  const {
    data: event,
    isLoading,
    isError,
  } = useGetEventByIdQuery(id);

  /* ------------------------------ Loading UI ----------------------------- */
  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24">
        <div className="animate-pulse overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">

          {/* Image Skeleton */}
          <div className="h-[500px] bg-gray-200"></div>

          {/* Content */}
          <div className="p-8 md:p-12">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-gray-100 p-6"
                >
                  <div className="h-8 w-8 rounded bg-gray-200"></div>

                  <div className="mt-4 h-4 w-24 rounded bg-gray-200"></div>

                  <div className="mt-3 h-5 w-full rounded bg-gray-200"></div>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-[2rem] bg-gray-100 p-8">
              <div className="h-8 w-60 rounded bg-gray-200"></div>

              <div className="mt-6 space-y-4">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ 404 Page ------------------------------ */
  if (isError || !isObject(event)) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl rounded-[2.5rem] bg-white p-10 text-center shadow-2xl">

          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-50 text-6xl font-black text-red-500">
            404
          </div>

          <h1 className="mt-8 text-5xl font-black text-gray-950">
            Event Not Found
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            The event you are looking for does not exist,
            may have been removed, or the link may be incorrect.
          </p>

          <Link
            href="/events"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-teal-600 px-8 py-4 font-semibold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft size={20} />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-24">

      {/* Back Button */}
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-teal-200 bg-white px-6 py-3 font-semibold text-teal-700 shadow-sm transition hover:bg-teal-600 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Events
      </Link>

      {/* Card */}
      <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">

        {/* Image */}
        <div className="relative h-[500px]">
          <Image
            src={`${imageBaseUrl}${event.image}`}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-10 left-10 right-10">
            <div className="inline-flex rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white">
              Upcoming Event
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">

          {/* Info */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Date */}
            <div className="rounded-3xl bg-teal-50 p-6">
              <Calendar
                className="text-teal-700"
                size={28}
              />

              <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                Date
              </p>

              <p className="mt-2 font-bold text-gray-950">
                {event.event_date
                  ? new Date(event.event_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                  : "Date not available"}
              </p>
            </div>

            {/* Time */}
            <div className="rounded-3xl bg-teal-50 p-6">
              <Clock
                className="text-teal-700"
                size={28}
              />

              <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                Time
              </p>

              <p className="mt-2 font-bold text-gray-950">
                {event.event_date
                  ? new Date(event.event_date).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                  : "Time not specified"}
              </p>
            </div>

            {/* Location */}
            <div className="rounded-3xl bg-teal-50 p-6">
              <MapPin
                className="text-teal-700"
                size={28}
              />

              <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                Location
              </p>

              <p className="mt-2 font-bold text-gray-950">
                {event.location || "Location not available"}
              </p>
            </div>

            {/* Attendees */}
            <div className="rounded-3xl bg-teal-50 p-6">
              <Users
                className="text-teal-700"
                size={28}
              />

              <p className="mt-4 text-sm font-semibold uppercase text-teal-700">
                Attendees
              </p>

              <p className="mt-2 font-bold text-gray-950">
                {event.attendees || 0}+ Expected
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-14 rounded-[2rem] bg-slate-50 p-8">
            <h2 className="text-3xl font-bold text-gray-950">
              About This Event
            </h2>

            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-gray-600">
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

            {event && <RegisterPopUp eventId={event.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;