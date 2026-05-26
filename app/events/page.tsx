'use client'

import { useSearchParams } from 'next/navigation'
import { events, vlogs } from '@/lib/mockData'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react'

export default function Events() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('id')
  const selectedEvent = selectedId ? events.find(e => e.id === parseInt(selectedId)) : null

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Events & Vlogs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Stay updated with our latest initiatives, celebrations, and community gatherings
          </p>
        </div>
      </section>

      {selectedEvent ? (
        // Event Detail
        <section className="py-20 px-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <Link href="/events" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold">
              <ArrowLeft size={20} /> Back to Events
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
              <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-8xl">
                🎉
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold mb-6">{selectedEvent.title}</h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-lg">
                    <Calendar className="text-primary" size={24} />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Clock className="text-primary" size={24} />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <MapPin className="text-primary" size={24} />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Users className="text-primary" size={24} />
                    <span>{selectedEvent.attendees} expected attendees</span>
                  </div>
                </div>

                <div className="bg-secondary rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
                  <p className="mb-6">Register your interest in attending this event</p>
                  <a
                    href="mailto:events@hopefoundation.org"
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Upcoming Events */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join us for meaningful community events and celebrations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {events.map((event) => (
                  <Link key={event.id} href={`/events?id=${event.id}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-border h-full flex flex-col">
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl">
                        🎉
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">{event.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <Calendar size={16} />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin size={16} />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Vlogs Section */}
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Latest Vlogs</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Watch videos showcasing our impact and stories of change
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {vlogs.map((vlog) => (
                  <div key={vlog.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow group">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      <div className="text-8xl group-hover:scale-110 transition-transform">🎥</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{vlog.title}</h3>
                      <div className="space-y-2 text-sm mb-4">
                        <p className="text-muted-foreground">
                          {new Date(vlog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-primary font-semibold">{vlog.views.toLocaleString()} views</p>
                      </div>
                      <a
                        href={`https://youtube.com/embed/${vlog.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
