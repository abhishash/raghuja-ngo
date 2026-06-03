
import EventDetails from '@/components/events/event-details'

type Props = {
    params: {
        id: string
    }
}

export default async function EventDetailPage({ params }: Props) {
    const { id } = await params

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

            <EventDetails id={id} />
        </main>
    )
}