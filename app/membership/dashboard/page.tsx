'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { generateIdCardPDF, generateMemberId } from '@/lib/membershipUtils'
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Download,
  FileText,
  HeartHandshake,
  MapPin,
  Phone,
  Printer,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

const donationHistory = [
  { id: 1, campaign: 'Provide 100 Prosthetic Limbs', amount: 5000, date: '2026-05-20', status: 'Completed' },
  { id: 2, campaign: 'Rehabilitation Camp Drive', amount: 3000, date: '2026-04-15', status: 'Completed' },
  { id: 3, campaign: 'Mobile Prosthetic Clinic', amount: 4000, date: '2026-03-20', status: 'Completed' },
  { id: 4, campaign: 'Skill Training Program', amount: 3000, date: '2026-02-10', status: 'Completed' },
]

export default function Dashboard() {
  const [memberId, setMemberId] = useState(() => generateMemberId())
  const [isDownloading, setIsDownloading] = useState(false)

  const member = useMemo(
    () => ({
      id: memberId,
      memberId,
      name: 'RAGHUJA SOCIALWELFARE MEMBER',
      email: 'Not provided',
      phone: '+91 98765 43210',
      address: 'Bangalore, Karnataka, India',
      registrationDate: new Date().toISOString(),
      joinedDate: '2026-05-26',
      totalDonations: 15000,
      campaignsSupported: donationHistory.length,
      idProof: 'Aadhaar Card',
      status: 'Active',
    }),
    [memberId]
  )

  const handleDownloadIdCard = async () => {
    setIsDownloading(true)
    try {
      const blob = await generateIdCardPDF({
        id: member.memberId,
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        registrationDate: member.registrationDate,
        memberId: member.memberId,
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${member.name.replace(/\s+/g, '-')}-ID-Card.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading ID card:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleRegenerateMemberId = () => {
    setMemberId(generateMemberId())
  }

  return (
    <main>
      <section className="bg-gray-50 px-4 py-16 print:hidden md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="grid gap-0 lg:grid-cols-[1fr_380px]">
              <div className="p-6 md:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
                  <BadgeCheck size={16} />
                  Member dashboard
                </span>

                <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-gray-950 md:text-2xl">
                  Your membership, ID card, and support history in one place.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                  Auto-generate a member ID, preview the ID card, download it as a PDF, or print it for offline use.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadIdCard}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 rounded bg-teal-600 px-5 py-3 font-bold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download size={18} />
                    {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded border-2 border-teal-600 bg-white px-5 py-3 font-bold text-teal-700 transition-colors hover:bg-teal-50"
                  >
                    <Printer size={18} />
                    Print ID Card
                  </button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-500">Member ID</p>
                    <p className="mt-1 font-bold text-gray-950">{member.memberId}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-500">Status</p>
                    <p className="mt-1 font-bold text-teal-700">{member.status}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-500">Actions</p>
                    <p className="mt-1 font-bold text-gray-950">Download & Print</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-700 p-6 text-white md:p-8 lg:p-10">
                <div className="flex h-full min-h-[340px] flex-col justify-between rounded-lg border border-white/20 bg-white/10 p-6 shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-100">Live card</p>
                        <p className="mt-1 text-xl font-bold">ID Preview</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
                        <CreditCard size={26} />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">
                        <UserRound size={34} />
                      </div>
                      <div>
                        <p className="text-sm text-teal-100">Member Name</p>
                        <p className="text-xs font-bold leading-tight">{member.name}</p>
                        <span className="mt-2 inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase text-gray-950">
                          {member.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-white/10 bg-white/15 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-teal-100">Auto generated ID</p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="text-xl font-bold tracking-wide">{member.memberId}</p>
                        <ShieldCheck className="text-yellow-300" size={24} />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm">
                      <p className="flex items-center gap-2 text-teal-50">
                        <Phone size={16} />
                        {member.phone}
                      </p>
                      <p className="flex items-center gap-2 text-teal-50">
                        <CalendarDays size={16} />
                        Joined {new Date(member.joinedDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                      <p className="text-teal-100">PDF</p>
                      <p className="mt-1 flex items-center gap-2 font-bold">
                        <Download size={15} />
                        Ready
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                      <p className="text-teal-100">Print</p>
                      <p className="mt-1 flex items-center gap-2 font-bold">
                        <Printer size={15} />
                        Enabled
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 print:bg-white print:px-0 print:py-0">
        <div className="mx-auto max-w-7xl print:max-w-none">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] print:block">
            <aside className="space-y-6 print:space-y-0">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg print:border-0 print:p-0 print:shadow-none">
                <div className="mb-5 flex items-center justify-between print:hidden">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-700">ID card preview</p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-950">Ready to download</h2>
                  </div>
                  <CreditCard className="text-teal-600" size={32} />
                </div>

                <div id="printable-member-card" className="overflow-hidden rounded-lg bg-teal-700 text-white shadow-sm print:mx-auto print:w-[340px] print:shadow-none">
                  <div className="bg-teal-800 px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-100">RAGHUJA SOCIALWELFAREFoundation</p>
                        <p className="mt-1 text-lg font-bold">Member ID Card</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-white text-teal-700">
                        <ShieldCheck size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-white/15">
                        <UserRound size={34} />
                      </div>
                      <div>
                        <p className="text-sm text-teal-100">Member Name</p>
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <span className="mt-2 inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase text-gray-950">
                          {member.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 rounded bg-white/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-teal-100">Auto generated member ID</p>
                      <p className="mt-1 text-3xl font-bold tracking-wide">{member.memberId}</p>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm">
                      <p className="flex items-center gap-2">
                        <Phone size={16} />
                        {member.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        Joined {new Date(member.joinedDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5" size={16} />
                        {member.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3 print:hidden">
                  <button
                    onClick={handleDownloadIdCard}
                    disabled={isDownloading}
                    className="inline-flex items-center justify-center gap-2 rounded bg-teal-600 px-4 py-3 font-bold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download size={18} />
                    PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded border-2 border-teal-600 px-4 py-3 font-bold text-teal-700 transition-colors hover:bg-teal-50"
                  >
                    <Printer size={18} />
                    Print
                  </button>
                  <button
                    onClick={handleRegenerateMemberId}
                    className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 px-4 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <RefreshCw size={18} />
                    New ID
                  </button>
                </div>
              </div>
            </aside>

            <div className="space-y-6 print:hidden">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <HeartHandshake className="text-teal-600" size={28} />
                  <p className="mt-5 text-sm font-semibold text-gray-500">Total Donations</p>
                  <p className="mt-1 text-3xl font-bold text-gray-950">Rs. {member.totalDonations.toLocaleString('en-IN')}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <FileText className="text-teal-600" size={28} />
                  <p className="mt-5 text-sm font-semibold text-gray-500">Campaigns Supported</p>
                  <p className="mt-1 text-3xl font-bold text-gray-950">{member.campaignsSupported}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <ShieldCheck className="text-teal-600" size={28} />
                  <p className="mt-5 text-sm font-semibold text-gray-500">Verification</p>
                  <p className="mt-1 text-3xl font-bold text-gray-950">Active</p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Member profile</p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-950">Basic information</h2>
                  </div>
                  <Link
                    href="/membership"
                    className="rounded border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Update details
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ['Full Name', member.name],
                    ['Member ID', member.memberId],
                    ['Mobile Number', member.phone],
                    ['ID Proof', member.idProof],
                    [
                      'Registration Date',
                      new Date(member.registrationDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }),
                    ],
                    ['Address', member.address],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-gray-500">{label}</p>
                      <p className="mt-1 font-bold text-gray-950">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Donation history</p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-950">Recent support</h2>
                  </div>
                  <Link
                    href="/donate"
                    className="rounded bg-yellow-500 px-5 py-3 text-center font-bold text-white transition-colors hover:bg-yellow-600"
                  >
                    Donate Now
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-gray-50 text-left text-sm text-gray-600">
                      <tr>
                        <th className="px-6 py-4 font-bold">Campaign</th>
                        <th className="px-6 py-4 font-bold">Amount</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationHistory.map((donation) => (
                        <tr key={donation.id} className="border-t border-gray-200">
                          <td className="px-6 py-4 font-semibold text-gray-950">{donation.campaign}</td>
                          <td className="px-6 py-4 font-bold text-teal-700">Rs. {donation.amount.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 text-gray-700">
                            {new Date(donation.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700">
                              {donation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
