import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Disclaimer</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">Disclaimer</h1>
        </div>
      </div>
      <div className="container-main py-8 max-w-3xl prose prose-sm">
        <p>The information provided on MotoBazar is for general informational purposes only.</p>
        <h2>Vehicle Information</h2>
        <p>While we strive to provide accurate information about motorcycle specifications, prices, and features, we cannot guarantee that all information is current, complete, or error-free. Prices shown are indicative and may differ from actual dealer prices. Always verify details directly with the seller or dealer.</p>
        <h2>Used Bike Valuation</h2>
        <p>The MotoBazar Deal Score and Bike Valuation tool provide estimates only. These are not guaranteed valuations. Actual market prices depend on many factors including condition, location, demand, and negotiation. Never rely solely on our estimates for purchasing decisions.</p>
        <h2>Third-Party Content</h2>
        <p>Listings are created by individual users and dealers. MotoBazar does not verify the accuracy of listing information, the condition of vehicles, or the legitimacy of sellers beyond our standard moderation process.</p>
        <h2>No Professional Advice</h2>
        <p>Content on MotoBazar does not constitute professional mechanical, financial, or legal advice. Consult qualified professionals for specific guidance.</p>
        <h2>External Links</h2>
        <p>Our site may contain links to external websites. We are not responsible for the content or practices of third-party sites.</p>
      </div>
    </div>
  )
}
