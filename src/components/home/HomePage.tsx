'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, Bike, Tag, DollarSign, ArrowRight, MapPin, Heart,
  Star, TrendingUp, Shield, ChevronRight, Calendar, Fuel,
  Gauge, Zap, CheckCircle, MessageCircle, BarChart3, Newspaper,
  GitCompare
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

// Demo data for display
const POPULAR_BRANDS = [
  { name: 'Honda', slug: 'honda', count: 1250 },
  { name: 'Royal Enfield', slug: 'royal-enfield', count: 980 },
  { name: 'Yamaha', slug: 'yamaha', count: 760 },
  { name: 'TVS', slug: 'tvs', count: 890 },
  { name: 'Bajaj', slug: 'bajaj', count: 1100 },
  { name: 'Hero', slug: 'hero', count: 1350 },
  { name: 'Suzuki', slug: 'suzuki', count: 560 },
  { name: 'KTM', slug: 'ktm', count: 420 },
  { name: 'Jawa', slug: 'jawa', count: 180 },
  { name: 'BMW', slug: 'bmw', count: 90 },
  { name: 'Triumph', slug: 'triumph', count: 65 },
  { name: 'Kawasaki', slug: 'kawasaki', count: 110 },
]

const POPULAR_NEW_BIKES = [
  { name: 'Honda Activa 6G', slug: 'activa-6g', brand: 'honda', price: 76000, mileage: 60, engine: '109.5cc', rating: 4.3 },
  { name: 'Royal Enfield Classic 350', slug: 'classic-350', brand: 'royal-enfield', price: 193000, mileage: 35, engine: '349cc', rating: 4.5 },
  { name: 'TVS Apache RTR 160 4V', slug: 'apache-rtr-160-4v', brand: 'tvs', price: 120000, mileage: 45, engine: '159cc', rating: 4.3 },
  { name: 'Yamaha MT-15 V2', slug: 'mt-15-v2', brand: 'yamaha', price: 168000, mileage: 48, engine: '155cc', rating: 4.4 },
  { name: 'Bajaj Pulsar 150', slug: 'pulsar-150', brand: 'bajaj', price: 105000, mileage: 50, engine: '149.5cc', rating: 4.1 },
  { name: 'KTM Duke 200', slug: 'duke-200', brand: 'ktm', price: 196000, mileage: 40, engine: '199.5cc', rating: 4.4 },
]

const POPULAR_USED_BIKES = [
  { id: '1', name: 'Honda Activa 4G', year: 2019, km: 28000, price: 42000, city: 'Chennai', seller: 'individual', verified: true, dealScore: 'good_deal' },
  { id: '2', name: 'Royal Enfield Classic 350', year: 2020, km: 15000, price: 145000, city: 'Bengaluru', seller: 'individual', verified: true, dealScore: 'good_deal' },
  { id: '3', name: 'TVS Apache RTR 160', year: 2021, km: 12000, price: 85000, city: 'Mumbai', seller: 'dealer', verified: true, dealScore: 'fair_deal' },
  { id: '4', name: 'Bajaj Pulsar NS200', year: 2020, km: 20000, price: 95000, city: 'Pune', seller: 'individual', verified: false, dealScore: 'fair_deal' },
]

const DEALER_OFFERS = [
  { id: '1', bike: 'Honda Activa 6G', dealer: 'Chennai Motors', city: 'Chennai', originalPrice: 78500, offerPrice: 74000, discount: 5.7, exchangeBonus: 3000, finance: '0% down payment', validity: '31 Mar 2024' },
  { id: '2', bike: 'Royal Enfield Hunter 350', dealer: 'RE Gallery Coimbatore', city: 'Coimbatore', originalPrice: 162000, offerPrice: 155000, discount: 4.3, exchangeBonus: 5000, finance: 'Easy EMI from ₹3,999/mo', validity: '15 Apr 2024' },
  { id: '3', bike: 'TVS Jupiter 125', dealer: 'TVS Motors Madurai', city: 'Madurai', originalPrice: 82000, offerPrice: 78500, discount: 4.2, exchangeBonus: 2000, finance: 'Zero down payment', validity: '30 Apr 2024' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Chennai')

  return (
    <div className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-br from-moto-dark via-gray-900 to-moto-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-moto-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-moto-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container-main relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4 leading-tight">
              Find Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-moto-primary to-moto-secondary">
                Bike
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Buy new, discover used bikes, compare models and find the best dealer offers.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bike, brand or model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-gray-800 rounded-xl outline-none text-sm md:text-base"
                  />
                </div>
                <button className="bg-moto-primary hover:bg-moto-accent text-white px-6 py-3 rounded-xl font-semibold transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link href="/new-bikes" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-sm border border-white/10">
                <Bike size={16} /> New Bikes
              </Link>
              <Link href="/used-bikes" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-sm border border-white/10">
                <Tag size={16} /> Used Bikes
              </Link>
              <Link href="/sell" className="inline-flex items-center gap-2 px-5 py-2.5 bg-moto-primary hover:bg-moto-accent text-white rounded-full text-sm font-medium transition-colors shadow-lg">
                <DollarSign size={16} /> Sell Your Bike
              </Link>
              <Link href="/dealer-offers" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-sm border border-white/10">
                <Zap size={16} /> Dealer Offers
              </Link>
            </div>

            {/* Quick Price Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-gray-400 text-xs">Quick search:</span>
              {['Under ₹50K', 'Under ₹1 Lakh', 'Under ₹1.5 Lakh', 'Under ₹2 Lakh', 'Premium', 'Scooters'].map((label) => (
                <Link key={label} href={`/used-bikes?price=${label}`} className="px-3 py-1 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST BAR ========== */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              <span>Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-600" />
              <span>Free to Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-moto-primary" />
              <span>Deal Score</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-purple-600" />
              <span>Price Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== POPULAR BRANDS ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Popular Brands</h2>
              <p className="section-subtitle">Find bikes from India&apos;s most trusted manufacturers</p>
            </div>
            <Link href="/new-bikes" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              All Brands <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {POPULAR_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/new-bikes/${brand.slug}`}
                className="card p-4 text-center group hover:border-moto-primary/20"
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 group-hover:bg-orange-50 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 group-hover:text-moto-primary transition-colors">
                  {brand.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-moto-primary transition-colors truncate">
                  {brand.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{brand.count}+ models</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot placement="home_top" />

      {/* ========== POPULAR NEW BIKES ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Popular New Bikes</h2>
              <p className="section-subtitle">Discover the most sought-after motorcycles in India</p>
            </div>
            <Link href="/new-bikes" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_NEW_BIKES.map((bike) => (
              <div key={bike.slug} className="card group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Bike size={48} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-moto-primary font-medium uppercase">{bike.brand.replace('-', ' ')}</p>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-moto-primary transition-colors">
                    {bike.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{bike.rating}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><IndianRupee size={12} />₹{(bike.price / 1000).toFixed(0)}K</span>
                    <span className="flex items-center gap-1"><Fuel size={12} />{bike.mileage} kmpl</span>
                    <span className="flex items-center gap-1"><Gauge size={12} />{bike.engine}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Link href={`/new-bikes/${bike.brand}/${bike.slug}`} className="btn-outline flex-1 text-center text-xs py-2">
                      View Details
                    </Link>
                    <Link href={`/compare?add=${bike.slug}`} className="btn-secondary text-xs py-2 px-3">
                      <GitCompareIcon size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== POPULAR USED BIKES ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Used Bikes Near You</h2>
              <p className="section-subtitle">Pre-owned bikes with verified sellers in {selectedCity}</p>
            </div>
            <Link href="/used-bikes" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_USED_BIKES.map((bike) => (
              <div key={bike.id} className="card group">
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Bike size={40} />
                  </div>
                  <div className="absolute top-3 left-3">
                    {bike.verified && (
                      <span className="badge-verified text-[10px]">✓ Verified</span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                      <Heart size={14} />
                    </button>
                  </div>
                  <div className={`absolute bottom-3 left-3 ${getDealScoreBg(bike.dealScore)}`}>
                    <span className={`badge-deal text-[10px] ${getDealScoreStyle(bike.dealScore)}`}>
                      {getDealScoreLabel(bike.dealScore)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-moto-primary transition-colors">
                    {bike.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={11} />{bike.year}</span>
                    <span className="flex items-center gap-1"><Gauge size={11} />{(bike.km / 1000).toFixed(0)}K km</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-moto-primary">₹{bike.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-500">{bike.city}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-medium ${bike.seller === 'dealer' ? 'text-blue-600' : 'text-gray-500'}`}>
                      {bike.seller === 'dealer' ? '🏪 Dealer' : '👤 Individual'}
                    </span>
                    <Link href={`/used-bikes/${bike.id}`} className="text-xs text-moto-primary font-medium">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot placement="home_middle" />

      {/* ========== DEALER OFFERS ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Dealer Offers</h2>
              <p className="section-subtitle">Exclusive deals from verified dealers</p>
            </div>
            <Link href="/dealer-offers" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              All Offers <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DEALER_OFFERS.map((offer) => (
              <div key={offer.id} className="card p-5 border-l-4 border-l-moto-primary">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{offer.bike}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{offer.dealer} • {offer.city}</p>
                  </div>
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {offer.discount}% OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-bold text-moto-primary">₹{offer.offerPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{offer.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-3 space-y-1.5">
                  {offer.exchangeBonus > 0 && (
                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                      <ArrowRight size={12} className="text-green-600" />
                      Exchange bonus: ₹{offer.exchangeBonus.toLocaleString('en-IN')}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <ArrowRight size={12} className="text-blue-600" />
                    {offer.finance}
                  </p>
                  <p className="text-xs text-gray-400">Valid till {offer.validity}</p>
                </div>
                <Link href={`/dealer-offers#${offer.id}`} className="btn-primary w-full text-center mt-4 text-sm py-2.5">
                  Get Best Offer
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPARE SECTION ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="bg-gradient-to-br from-moto-dark to-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">
              Compare Bikes Side by Side
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Make an informed decision. Compare price, specs, mileage and features of up to 4 bikes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <div className="flex-1 w-full">
                <input type="text" placeholder="Select Bike 1" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-moto-primary text-sm" />
              </div>
              <span className="text-white font-bold text-lg">VS</span>
              <div className="flex-1 w-full">
                <input type="text" placeholder="Select Bike 2" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-moto-primary text-sm" />
              </div>
            </div>
            <Link href="/compare" className="btn-primary mt-6 inline-flex">
              Compare Now <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BIKE PRICE GUIDE ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-main">
          <h2 className="section-title text-center mb-2">Bike Price Guide</h2>
          <p className="section-subtitle text-center mb-8">Find the best bikes in your budget</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: 'Under ₹1 Lakh', href: '/bike-price?range=under-1-lakh', color: 'from-green-500 to-emerald-600' },
              { title: 'Under ₹1.5 Lakh', href: '/bike-price?range=under-1.5-lakh', color: 'from-blue-500 to-indigo-600' },
              { title: 'Best Mileage', href: '/bike-price?range=best-mileage', color: 'from-yellow-500 to-orange-500' },
              { title: 'Best Commuter', href: '/bike-price?range=commuter', color: 'from-purple-500 to-pink-600' },
              { title: 'Best Scooters', href: '/bike-price?range=scooters', color: 'from-teal-500 to-cyan-600' },
              { title: 'For Beginners', href: '/bike-price?range=beginners', color: 'from-red-500 to-rose-600' },
            ].map((item) => (
              <Link key={item.title} href={item.href} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-white text-center hover:scale-105 transition-transform`}>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs opacity-80 mt-1">View bikes →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LATEST REVIEWS ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Latest Reviews</h2>
              <p className="section-subtitle">Expert and user reviews to help you decide</p>
            </div>
            <Link href="/reviews" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              All Reviews <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Honda Activa 6G Review', rating: 4.3, desc: 'Best scooter for family use with excellent mileage and smooth ride quality.', bike: 'Honda Activa 6G' },
              { title: 'RE Classic 350 Review', rating: 4.5, desc: 'Pure riding joy with iconic design and comfortable cruising experience.', bike: 'Royal Enfield Classic 350' },
              { title: 'Apache RTR 160 4V Review', rating: 4.3, desc: 'Best 160cc commuter with sporty performance and modern features.', bike: 'TVS Apache RTR 160 4V' },
            ].map((review) => (
              <div key={review.title} className="card p-5">
                <div className="flex items-center gap-1 mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-1">{review.rating}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{review.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{review.desc}</p>
                <Link href={`/reviews/${review.bike.toLowerCase().replace(/\s+/g, '-')}`} className="text-moto-primary text-sm font-medium mt-3 inline-flex items-center gap-1 hover:text-moto-accent">
                  Read Review <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUATION CTA ========== */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-moto-primary to-moto-accent">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">
            Know Your Bike&apos;s Value
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get an instant estimated market value for your bike. Free and accurate.
          </p>
          <Link href="/bike-value" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-moto-primary font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
            <BarChart3 size={20} />
            Calculate Used Bike Value
          </Link>
        </div>
      </section>

      {/* ========== SELL CTA ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="bg-white rounded-2xl border-2 border-dashed border-moto-primary/30 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-moto-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-moto-dark font-display mb-3">
              Sell Your Bike FREE
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Reach genuine buyers in your city. List your bike for free and sell faster with MotoBazar Deal Score.
            </p>
            <Link href="/sell" className="btn-sell text-lg py-4 px-10">
              Start Selling Now <ArrowRight size={20} className="ml-2" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">No charges. No hidden fees. Completely free.</p>
          </div>
        </div>
      </section>

      {/* ========== LATEST NEWS ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Latest Bike News</h2>
              <p className="section-subtitle">Stay updated with the motorcycle world</p>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center gap-1 text-moto-primary hover:text-moto-accent text-sm font-medium">
              All News <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Best Bikes Under ₹1 Lakh in 2024', category: 'Price Guide', date: '2 days ago' },
              { title: 'Used Bike Buying Guide: What to Check', category: 'Guide', date: '5 days ago' },
              { title: 'Top 5 Scooters for Daily Commuting', category: 'Buying Guide', date: '1 week ago' },
            ].map((article) => (
              <div key={article.title} className="card group">
                <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <Newspaper size={32} className="text-gray-300" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-moto-primary font-medium">{article.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-moto-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot placement="home_middle" />

      {/* ========== SEO CONTENT ========== */}
      <section className="py-12 md:py-16">
        <div className="container-main max-w-4xl">
          <h2 className="text-xl font-bold text-moto-dark mb-4">
            MotoBazar — India&apos;s Motorcycle Marketplace
          </h2>
          <div className="prose prose-sm text-gray-600 space-y-3">
            <p>
              MotoBazar is India&apos;s trusted motorcycle marketplace where you can buy new bikes, explore 
              second hand bikes for sale, compare motorcycles, and find the best dealer offers in your city. 
              Whether you are looking for a new motorcycle, a pre-owned bike, or want to sell your current 
              bike, MotoBazar makes it simple and transparent.
            </p>
            <p>
              Browse thousands of <strong>used bikes</strong> across Chennai, Bengaluru, Mumbai, Delhi, 
              Hyderabad, Pune and more. Our unique <strong>MotoBazar Deal Score</strong> helps you 
              identify good deals instantly. Every listing is moderated to ensure a safe buying experience.
            </p>
            <p>
              Use our <strong>bike comparison</strong> tool to compare specifications, prices and features 
              side by side. Read <strong>expert bike reviews</strong> and user reviews to make informed 
              decisions. Planning to sell? List your bike for <strong>free</strong> and reach genuine buyers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Helper components & functions
function GitCompareIcon({ size = 14 }: { size?: number }) {
  return <GitCompare size={size} />
}

function IndianRupee({ size = 12 }: { size?: number }) {
  return <span className="text-xs">₹</span>
}

function getDealScoreBg(score: string): string {
  return ''
}

function getDealScoreStyle(score: string): string {
  switch (score) {
    case 'good_deal': return 'bg-green-50 text-green-700 border-green-200'
    case 'fair_deal': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    case 'high_price': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

function getDealScoreLabel(score: string): string {
  switch (score) {
    case 'good_deal': return '🟢 GOOD DEAL'
    case 'fair_deal': return '🟡 FAIR DEAL'
    case 'high_price': return '🔴 HIGH PRICE'
    default: return '⚪ UNKNOWN'
  }
}
