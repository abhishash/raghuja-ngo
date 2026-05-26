import { teamMembers } from '@/lib/mockData'

export const metadata = {
  title: 'Our Team - Hope Foundation',
  description: 'Meet the dedicated team members driving Hope Foundation&apos;s mission forward'
}

export default function Team() {
  const coreMembers = teamMembers.slice(0, 2)
  const supportingMembers = teamMembers.slice(2)

  return (
    <>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A dedicated group of professionals and volunteers working together to create meaningful change
          </p>
        </div>
      </section>

      {/* Core Leadership Team */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core team guides the organization&apos;s mission and strategic direction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {coreMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-8xl">👤</div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Team */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Program Heads</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experts leading our various program initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportingMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-12 text-center border border-border">
            <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for passionate individuals to join us in our mission. Whether you&apos;re interested in volunteering or career opportunities, we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:careers@hopefoundation.org"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </>
  )
}
