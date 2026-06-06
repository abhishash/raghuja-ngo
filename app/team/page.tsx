import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Users2 } from "lucide-react";
import { teamMembers } from "@/lib/mockData";
import Team from "@/components/team";

export const metadata = {
  title: "Our Team - Raghuja SocialWelfare Foundation",
  description:
    "Meet the dedicated team members driving Raghuja SocialWelfare Foundation's mission forward",
};

export default function TeamPage() {
  const coreMembers = teamMembers.slice(0, 2);
  const supportingMembers = teamMembers.slice(2);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-20">
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

            <h1 className="mt-8 text-3xl font-black leading-tight text-gray-950 md:text-5xl">
              The people behind the mission.
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-600">
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
          <Team />
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
              <Link
                href="/contact"
                className="rounded-2xl bg-white px-8 py-4 font-semibold text-teal-700 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}