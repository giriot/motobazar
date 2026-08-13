import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Terms of Service</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: January 2024</p>
        </div>
      </div>
      <div className="container-main py-8 max-w-3xl prose prose-sm">
        <p>By using MotoBazar, you agree to these Terms of Service. Please read them carefully.</p>
        <h2>1. Platform Description</h2>
        <p>MotoBazar is an online marketplace platform that connects motorcycle buyers, sellers, and dealers. We do not manufacture, own, or directly sell any motorcycles listed on our platform.</p>
        <h2>2. User Accounts</h2>
        <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.</p>
        <h2>3. Listing Rules</h2>
        <ul>
          <li>All listings must be genuine and accurately described</li>
          <li>You must have the legal right to sell the vehicle</li>
          <li>Prohibited content includes fake listings, stolen vehicles, and misleading information</li>
          <li>All listings are subject to admin review before publication</li>
        </ul>
        <h2>4. Prohibited Activities</h2>
        <ul>
          <li>Posting false or misleading information</li>
          <li>Attempting to defraud other users</li>
          <li>Using the platform for illegal activities</li>
          <li>Spamming or harassment of other users</li>
        </ul>
        <h2>5. Disclaimer</h2>
        <p>MotoBazar does not guarantee the accuracy of listings, the condition of vehicles, or the reliability of sellers. Users should conduct their own due diligence before any transaction.</p>
        <h2>6. Limitation of Liability</h2>
        <p>MotoBazar is not liable for any disputes, damages, or losses arising from transactions between users.</p>
        <h2>7. Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p>
      </div>
    </div>
  )
}
