'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Users, Gift } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/team', label: 'Team Page' },
    { href: '/services', label: 'Services / Activities' },
    { href: '/events', label: 'Vlogs & Events' },
    { href: '/donate', label: 'Donation System' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/careers', label: 'Careers' },
  ]

  return (
    <>
      {/* Top Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.jpeg"
                  alt="RAGHUJA SOCIALWELFARE Foundation Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-sm text-teal-600">RAGHUJA SOCIALWELFARE</div>
                <div className="text-xs text-gray-600 leading-none">FOUNDATION</div>
              </div>
            </Link>

            {/* Top Right Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/membership"
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                <Users size={18} />
                Member Registration
              </Link>
              <Link
                href="/donate"
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded font-semibold text-sm transition-colors"
              >
                <Gift size={18} />
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-teal-600 text-white sticky top-0 z-40">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center h-16 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold text-sm whitespace-nowrap flex items-center gap-2 hover:bg-teal-700 px-3 py-2 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded px-4 py-3 text-sm font-medium transition-colors hover:bg-teal-700"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-teal-500 mt-4 pt-4 flex flex-col gap-3">
                <Link
                  href="/membership"
                  className="flex items-center gap-2 text-white hover:bg-teal-700 px-4 py-2 rounded font-medium text-sm"
                >
                  <Users size={18} />
                  Member registration form
                </Link>
                <Link
                  href="/donate"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                >
                  <Gift size={18} />
                  Donate Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
