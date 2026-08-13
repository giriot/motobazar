import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">About</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">About MotoBazar</h1>
        </div>
      </div>
      <div className="container-main py-8 max-w-3xl prose prose-sm">
        <p>MotoBazar is India&apos;s motorcycle marketplace platform connecting buyers, sellers, and dealers across the country.</p>
        <h2>Our Mission</h2>
        <p>To make buying and selling motorcycles simple, transparent, and trustworthy for everyone in India.</p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>New Bike Information</strong> — Prices, specifications, and comparisons for all popular motorcycles in India.</li>
          <li><strong>Used Bike Marketplace</strong> — Buy and sell pre-owned motorcycles with verified listings and our unique Deal Score.</li>
          <li><strong>Dealer Offers</strong> — Exclusive discounts and deals from verified dealers in your city.</li>
          <li><strong>Bike Comparison</strong> — Compare up to 4 bikes side by side on specs, price, and features.</li>
          <li><strong>Bike Valuation</strong> — Get an estimated market value for your bike before buying or selling.</li>
          <li><strong>Reviews & Guides</strong> — Expert reviews, user reviews, and buying guides to help you make informed decisions.</li>
        </ul>
        <h2>Contact</h2>
        <p>For any queries, reach us at <a href="mailto:support@motobazar.com">support@motobazar.com</a></p>
        <p className="text-sm text-gray-500 mt-8"><em>Note: MotoBazar is a marketplace platform. We do not manufacture, sell, or directly deal in motorcycles. All listings are from individual sellers and registered dealers.</em></p>
      </div>
    </div>
  )
}
