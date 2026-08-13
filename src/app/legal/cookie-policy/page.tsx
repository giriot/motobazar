import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Cookie Policy</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">Cookie Policy</h1>
        </div>
      </div>
      <div className="container-main py-8 max-w-3xl prose prose-sm">
        <p>This Cookie Policy explains how MotoBazar uses cookies and similar technologies.</p>
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>
        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Essential Cookies</strong> — Required for the website to function (authentication, security)</li>
          <li><strong>Analytics Cookies</strong> — Help us understand how visitors use our site (currently disabled)</li>
          <li><strong>Advertising Cookies</strong> — Used for displaying relevant ads (currently disabled)</li>
        </ul>
        <h2>Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Note that disabling essential cookies may affect website functionality.</p>
        <h2>Contact</h2>
        <p>Questions about our cookie policy? Email <a href="mailto:support@motobazar.com">support@motobazar.com</a></p>
      </div>
    </div>
  )
}
