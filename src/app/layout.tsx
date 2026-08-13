import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'MotoBazar - Buy & Sell New and Used Bikes in India',
  description: "India's trusted motorcycle marketplace. Buy new bikes, sell used bikes, compare models and find the best dealer offers across India.",
  keywords: 'used bikes, new bikes, sell bike, motorcycle marketplace, bike comparison, dealer offers, India bikes',
  openGraph: {
    title: 'MotoBazar - Buy & Sell New and Used Bikes in India',
    description: "India's trusted motorcycle marketplace. Buy new bikes, sell used bikes, compare models and find dealer offers.",
    type: 'website',
    locale: 'en_IN',
    siteName: 'MotoBazar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotoBazar - Buy & Sell New and Used Bikes in India',
    description: "India's trusted motorcycle marketplace.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#E85D04" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
