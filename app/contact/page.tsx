import Link from 'next/link'
import { ngoInfo } from '@/lib/mockData'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useGetFAQQuery } from '@/lib/services/master-api'
import FAQSection from '@/components/contact/faq'
import ContactForm from '@/components/contact/contact-form'

export const metadata = {
  title: `Contact Us - ${ngoInfo.name}`,
  description: `Contact ${ngoInfo.name} for membership, donation, prosthetic support, and partnership enquiries.`,
}

export default function Contact() {

  return (
    <main>
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-bold text-teal-700 shadow-sm">
                <MessageCircle size={16} />
                Contact us
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
                Have a question? Our team is ready to help.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                Reach out for member registration help, donation support, prosthetic services, events, or partnership enquiries.
              </p>
            </div>

            <div className="rounded-lg bg-teal-700 p-8 text-white shadow-lg">
              <Mail size={34} />
              <h2 className="mt-6 text-2xl font-bold">Quick response desk</h2>
              <p className="mt-3 text-white/90">Send us your details and our team will connect with you.</p>
              <div className="mt-6 space-y-4 text-sm">
                <p className="flex items-start gap-3">
                  <Phone className="mt-0.5 flex-shrink-0" size={18} />
                  {ngoInfo.contact.phone}
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="mt-0.5 flex-shrink-0" size={18} />
                  {ngoInfo.contact.email}
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 flex-shrink-0" size={18} />
                  {ngoInfo.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-5">
            {[
              { icon: Phone, label: 'Call us', value: ngoInfo.contact.phone },
              { icon: Mail, label: 'Email us', value: ngoInfo.contact.email },
              { icon: Clock, label: 'Office hours', value: 'Monday to Saturday, 10:00 AM - 6:00 PM' },
              { icon: MapPin, label: 'Visit office', value: ngoInfo.contact.address },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <Icon className="text-teal-600" size={26} />
                  <p className="mt-4 text-sm font-semibold text-gray-500">{item.label}</p>
                  <p className="mt-1 font-bold leading-relaxed text-gray-950">{item.value}</p>
                </div>
              )
            })}
          </aside>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-10">
            <h2 className="text-3xl font-bold text-gray-950">Send an enquiry</h2>
            <p className="mt-3 text-gray-600">This form is ready for UI use. Connect it to your API when the backend is available.</p>

            <ContactForm />
          </div>
        </div>
      </section>



      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-950">Want to support the mission?</h2>
            <p className="mt-2 text-gray-600">Become a member or contribute to an active donation campaign.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/membership" className="rounded border-2 border-teal-600 px-5 py-3 font-bold text-teal-700 transition-colors hover:bg-teal-50">
              Join as Member
            </Link>
            <Link href="/donate" className="inline-flex items-center gap-2 rounded bg-yellow-500 px-5 py-3 font-bold text-white transition-colors hover:bg-yellow-600">
              Donate Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />

    </main>
  )
}
