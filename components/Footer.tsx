'use client'

import Link from 'next/link'
import { ngoInfo } from '@/lib/mockData'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Prosthetic Limbs', href: '/services' },
        { label: 'Donate', href: '/donate' },
        { label: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: 'Our Programs',
      links: [
        { label: 'Prosthetic Limbs', href: '/services' },
        { label: 'Rehabilitation', href: '/services' },
        { label: 'Training & Support', href: '/services' },
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Events', href: '/events' },
        { label: 'Team', href: '/team' },
        { label: 'Member registration form', href: '/membership' },
        { label: 'Careers', href: '/careers' },
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Organization Info */}
          <div>
            <div className="font-bold text-lg mb-4 text-white">
              {ngoInfo.name}
            </div>
            <p className="text-sm text-gray-400 mb-4">{ngoInfo.tagline}</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>{ngoInfo.contact.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>{ngoInfo.contact.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{ngoInfo.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} {ngoInfo.name}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-yellow-500" />
              <span>Made with passion for social impact</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
