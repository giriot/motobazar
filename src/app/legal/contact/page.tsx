import Link from 'next/link'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Contact</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">Contact Us</h1>
          <p className="text-gray-600 mt-1">We&apos;d love to hear from you</p>
        </div>
      </div>
      <div className="container-main py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Send us a message</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name *</label>
                <input type="text" className="input-field mt-1" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input type="email" className="input-field mt-1" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="input-field mt-1" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input type="text" className="input-field mt-1" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message *</label>
                <textarea className="input-field mt-1 h-28 resize-none" placeholder="Tell us more..."></textarea>
              </div>
              <button className="btn-primary">Send Message</button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail size={20} className="text-moto-primary mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">support@motobazar.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Phone size={20} className="text-moto-primary mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">Contact details will be provided after registration</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <MapPin size={20} className="text-moto-primary mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
