import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Hope Foundation - Transforming Lives, Building Communities',
  description: 'Join Hope Foundation in our mission to empower underprivileged communities through education, healthcare, and food security programs.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.className} font-sans antialiased`}>
        <main>
          <Navbar />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
          <Footer />
        </main>
      </body>
    </html>
  )
}
