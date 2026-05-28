'use client'

import { useSearchParams } from 'next/navigation'
import { services } from '@/lib/mockData'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Services() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('id')
  const selectedService = selectedId ? services.find(s => s.id === parseInt(selectedId)) : null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-24">
      {/* Background Effects */}
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-200/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
              Services & Activities
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-black leading-tight text-gray-950 md:text-6xl">
            Creating impact through meaningful initiatives
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Our programs focus on healthcare, education, food support,
            rehabilitation, and community empowerment to improve lives
            with dignity and compassion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {/* Education */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            {/* Image */}
            <div className="relative h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                alt="Education Program"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

              {/* Floating Icon */}
              <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-2xl backdrop-blur-md">
                <span className="text-3xl">📚</span>
              </div>

              {/* Category */}
              <div className="absolute bottom-6 left-6">
                <span className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  Education
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-950">
                Education Support
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                Scholarships, digital learning, school supplies, and
                awareness programs helping children access quality education.
              </p>

              {/* Stats */}
              <div className="mt-8 flex items-center justify-between rounded-2xl bg-teal-50 p-5">
                <div>
                  <p className="text-sm text-gray-500">Children Supported</p>
                  <p className="text-2xl font-bold text-teal-700">12,500+</p>
                </div>

                <div className="h-12 w-px bg-teal-200"></div>

                <div>
                  <p className="text-sm text-gray-500">Schools Connected</p>
                  <p className="text-2xl font-bold text-teal-700">180+</p>
                </div>
              </div>

              {/* Button */}
              <button className="mt-8 w-full rounded-2xl bg-teal-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-700">
                Explore Program
              </button>
            </div>
          </div>

          {/* Healthcare */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div className="relative h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                alt="Healthcare"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

              <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-2xl backdrop-blur-md">
                <span className="text-3xl">🏥</span>
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  Healthcare
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-950">
                Health & Rehabilitation
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                Medical camps, prosthetic support, rehabilitation services,
                and healthcare awareness for underserved communities.
              </p>

              <div className="mt-8 flex items-center justify-between rounded-2xl bg-teal-50 p-5">
                <div>
                  <p className="text-sm text-gray-500">Patients Assisted</p>
                  <p className="text-2xl font-bold text-teal-700">8,200+</p>
                </div>

                <div className="h-12 w-px bg-teal-200"></div>

                <div>
                  <p className="text-sm text-gray-500">Health Camps</p>
                  <p className="text-2xl font-bold text-teal-700">95+</p>
                </div>
              </div>

              <button className="mt-8 w-full rounded-2xl bg-teal-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-700">
                Explore Program
              </button>
            </div>
          </div>

          {/* Food Program */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div className="relative h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                alt="Food Distribution"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

              <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-2xl backdrop-blur-md">
                <span className="text-3xl">🍲</span>
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  Food Support
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-950">
                Food Distribution
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                Nutritious meal distribution drives and emergency food
                support initiatives for families in need.
              </p>

              <div className="mt-8 flex items-center justify-between rounded-2xl bg-teal-50 p-5">
                <div>
                  <p className="text-sm text-gray-500">Meals Served</p>
                  <p className="text-2xl font-bold text-teal-700">1.2M+</p>
                </div>

                <div className="h-12 w-px bg-teal-200"></div>

                <div>
                  <p className="text-sm text-gray-500">Communities</p>
                  <p className="text-2xl font-bold text-teal-700">320+</p>
                </div>
              </div>

              <button className="mt-8 w-full rounded-2xl bg-teal-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-700">
                Explore Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
