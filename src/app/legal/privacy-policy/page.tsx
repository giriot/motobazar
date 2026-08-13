import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: January 2024</p>
        </div>
      </div>
      <div className="container-main py-8 max-w-3xl prose prose-sm">
        <p>MotoBazar (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li>Account information (name, email, phone number)</li>
          <li>Listing information (bike details, photos, pricing)</li>
          <li>Communication preferences</li>
          <li>Usage data and analytics</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our marketplace services</li>
          <li>To facilitate communication between buyers and sellers</li>
          <li>To send relevant notifications about listings and account activity</li>
          <li>To ensure platform safety and prevent fraud</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul>
          <li>Other users (limited seller information for active listings)</li>
          <li>Service providers who help operate our platform</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
        <h2>Your Rights</h2>
        <p>You may access, update, or delete your account information through your dashboard settings. Contact us at support@motobazar.com for assistance.</p>
        <h2>Contact</h2>
        <p>For privacy-related queries, email us at <a href="mailto:support@motobazar.com">support@motobazar.com</a></p>
      </div>
    </div>
  )
}
