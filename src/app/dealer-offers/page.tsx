'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, DollarSign, MapPin, Calendar, Tag, Percent,
  Shield, ArrowRight, Phone, MessageCircle, Building2, Search, Filter
} from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

const DEMO_OFFERS = [
  {
    id: '1', bike: 'Honda Activa 6G', dealer: 'Chennai Motors Pvt Ltd', city: 'Chennai',
    originalPrice: 78500, offerPrice: 74000, discount: 5.7, exchangeBonus: 3000,
    finance: '0% down payment, EMI from ₹2,999/mo', accessories: 'Free helmet & seat cover',
    validUntil: '31 Mar 2024', insurance: '1 year free insurance'
  },
  {
    id: '2', bike: 'Royal Enfield Hunter 350', dealer: 'RE Gallery Coimbatore', city: 'Coimbatore',
    originalPrice: 162000, offerPrice: 155000, discount: 4.3, exchangeBonus: 5000,
    finance: 'Easy EMI from ₹3,999/mo', accessories: 'Free tank bag & phone mount',
    validUntil: '15 Apr 2024', insurance: '2 year extended warranty'
  },
  {
    id: '3', bike: 'TVS Jupiter 125', dealer: 'TVS Motors Madurai', city: 'Madurai',
    originalPrice: 82000, offerPrice: 78500, discount: 4.2, exchangeBonus: 2000,
    finance: 'Zero down payment scheme', accessories: 'Free crash guard',
    validUntil: '30 Apr 2024', insurance: 'Free insurance renewal'
  },
  {
    id: '4', bike: 'Bajaj Pulsar NS200', dealer: 'Bajaj World Bengaluru', city: 'Bengaluru',
    originalPrice: 165000, offerPrice: 155000, discount: 6.1, exchangeBonus: 4000,
    finance: 'Easy finance available', accessories: 'Riding gloves free',
    validUntil: '20 Apr 2024', insurance: null
  },
  {
    id: '5', bike: 'Yamaha MT-15 V2', dealer: 'Yamaha Motors Pune', city: 'Pune',
    originalPrice: 175000, offerPrice: 168000, discount: 4.0, exchangeBonus: 3500,
    finance: '0% EMI for 6 months', accessories: 'Free tank pad & key chain',
    validUntil: '30 Apr 2024', insurance: '1 year free insurance'
  },
]

export default function DealerOffersPage() {
  const [city, setCity] = useState('')
  const [brand, setBrand] = useState('')
  const [leadModal, setLeadModal] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Dealer Offers</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Dealer Offers & Discounts
          </h1>
          <p className="text-gray-600 mt-1">Get the best deals from verified dealers near you</p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-moto-primary"
            />
          </div>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="select-field text-sm py-2.5 w-auto">
            <option value="">All Cities</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Madurai">Madurai</option>
          </select>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select-field text-sm py-2.5 w-auto">
            <option value="">All Brands</option>
            <option value="honda">Honda</option>
            <option value="royal-enfield">Royal Enfield</option>
            <option value="tvs">TVS</option>
            <option value="bajaj">Bajaj</option>
            <option value="yamaha">Yamaha</option>
          </select>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEMO_OFFERS.map(offer => (
            <div key={offer.id} className="card overflow-hidden" id={offer.id}>
              <div className="bg-gradient-to-r from-moto-primary to-moto-accent p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{offer.bike}</h3>
                    <p className="text-white/80 text-sm">{offer.dealer}</p>
                  </div>
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {offer.discount}% OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold">₹{offer.offerPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm line-through text-white/60">₹{offer.originalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-moto-primary" />
                  <span>{offer.city}</span>
                </div>
                <div className="space-y-2">
                  {offer.exchangeBonus > 0 && (
                    <p className="text-xs flex items-center gap-2 text-gray-700">
                      <ArrowRight size={12} className="text-green-600 shrink-0" />
                      Exchange bonus: <strong>₹{offer.exchangeBonus.toLocaleString('en-IN')}</strong>
                    </p>
                  )}
                  {offer.finance && (
                    <p className="text-xs flex items-center gap-2 text-gray-700">
                      <ArrowRight size={12} className="text-blue-600 shrink-0" />
                      {offer.finance}
                    </p>
                  )}
                  {offer.accessories && (
                    <p className="text-xs flex items-center gap-2 text-gray-700">
                      <ArrowRight size={12} className="text-purple-600 shrink-0" />
                      {offer.accessories}
                    </p>
                  )}
                  {offer.insurance && (
                    <p className="text-xs flex items-center gap-2 text-gray-700">
                      <ArrowRight size={12} className="text-teal-600 shrink-0" />
                      {offer.insurance}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400">Valid till {offer.validUntil}</p>
                <button
                  onClick={() => setLeadModal(offer.id)}
                  className="btn-primary w-full text-center text-sm py-2.5"
                >
                  Get Best Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        {DEMO_OFFERS.length === 0 && (
          <div className="text-center py-16">
            <DollarSign size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No dealer offers available yet</h3>
            <p className="text-gray-500">Be the first dealer to list an offer in this area.</p>
          </div>
        )}
      </div>

      {/* Lead Modal */}
      {leadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setLeadModal(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Get Best Offer</h2>
            <p className="text-sm text-gray-500 mb-4">Fill your details and the dealer will contact you</p>
            <div className="space-y-3">
              <input type="text" placeholder="Your Name" className="input-field" />
              <input type="tel" placeholder="Phone Number" className="input-field" />
              <input type="email" placeholder="Email (optional)" className="input-field" />
              <textarea placeholder="Your message (optional)" className="input-field h-20 resize-none" />
              <label className="flex items-start gap-2 text-xs text-gray-500">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300" />
                I agree to be contacted by the dealer regarding this offer
              </label>
              <button className="btn-primary w-full">Submit Enquiry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
