import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Users2 } from "lucide-react";
import { teamMembers } from "@/lib/mockData";

export const metadata = {
  title: "Our Team - Hope Foundation",
  description:
    "Meet the dedicated team members driving Hope Foundation's mission forward",
};

export default function Team() {
  const coreMembers = teamMembers.slice(0, 2);
  const supportingMembers = teamMembers.slice(2);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-28">
        {/* Background Blur */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                Our Team
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-gray-950 md:text-7xl">
              The people behind the mission.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              A passionate team of changemakers, healthcare advocates,
              volunteers, and leaders working together to build dignity,
              accessibility, and hope for every life we touch.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#leadership"
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700"
              >
                Meet Leadership
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#join"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-7 py-4 font-semibold text-gray-900 backdrop-blur-md transition-all duration-300 hover:bg-white"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        id="leadership"
        className="relative overflow-hidden bg-white px-4 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-teal-50 px-5 py-2">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Leadership Team
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
              Guiding the organization forward
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              Our leadership team brings together compassion, expertise,
              and years of commitment to social impact and healthcare access.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {coreMembers.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-[420px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  {/* Floating Role */}
                  <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white shadow-2xl backdrop-blur-lg">
                    <p className="text-sm uppercase tracking-[0.2em] text-teal-100">
                      {member.role}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-lg leading-relaxed text-gray-600">
                    {member.bio}
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                    <span className="font-medium text-gray-700">
                      Dedicated to creating meaningful change
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-24">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-teal-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-white/70 px-5 py-2 shadow-sm backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Program Heads
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold text-gray-950 md:text-5xl">
              Experts leading initiatives
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              Specialists and coordinators managing our outreach,
              rehabilitation, education, and community programs.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {supportingMembers.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="inline-flex rounded-full bg-teal-50 px-4 py-1 text-sm font-semibold text-teal-700">
                    {member.role}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-gray-950">
                    {member.name}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600">
                    {member.bio}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-teal-700">
                    <Users2 size={18} />
                    <span className="font-medium">
                      Community Impact Team
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="join"
        className="relative overflow-hidden bg-white px-4 py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600"></div>

        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-2xl md:p-16">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 shadow-xl backdrop-blur-md">
              <HeartHandshake className="text-white" size={42} />
            </div>

            <h2 className="mt-10 text-4xl font-bold text-white md:text-5xl">
              Become part of the mission
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
              We are always looking for passionate volunteers,
              healthcare professionals, and changemakers who want
              to contribute toward creating a more inclusive and
              empowered society.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <a
                href="mailto:careers@hopefoundation.org"
                className="rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Volunteer Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}