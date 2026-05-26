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
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Our Services & Activities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive programs designed to address the most pressing needs of underprivileged communities
          </p>
        </div>
      </section>

      {selectedService ? (
        // Detail View
        <section className="py-20 px-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold">
              <ArrowLeft size={20} /> Back to Services
            </Link>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border mb-12">
              <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-8xl">
                {selectedService.icon}
              </div>
              
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">{selectedService.title}</h1>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-primary">About This Program</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedService.longDescription}
                    </p>
                  </div>

                  <div className="bg-secondary rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-3 text-primary">Our Impact</h2>
                    <p className="text-xl font-semibold text-primary">{selectedService.impact}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">Key Initiatives</h2>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-xl">•</span>
                        <span>Providing essential resources and infrastructure</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-xl">•</span>
                        <span>Training and capacity building for communities</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-xl">•</span>
                        <span>Partnerships with local organizations</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-xl">•</span>
                        <span>Monitoring and evaluation for continuous improvement</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Support This Program</h2>
                    <p className="mb-6">Your contribution can directly help us expand and sustain this vital service</p>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
                    >
                      Make a Donation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Services List
        <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link key={service.id} href={`/services?id=${service.id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-border h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                      {service.icon}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1">{service.description}</p>
                      <p className="text-sm font-semibold text-primary">{service.impact}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Services Overview */}
            <div className="mt-20 space-y-12">
              {services.map((service, idx) => (
                <div key={service.id} className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:auto-cols-reverse' : ''}`}>
                  <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {service.longDescription}
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-primary text-lg">{service.impact}</p>
                    </div>
                  </div>
                  <div className={`bg-white rounded-lg shadow-lg p-8 border border-border text-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="text-8xl mb-4">{service.icon}</div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
