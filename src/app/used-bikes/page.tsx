'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, SlidersHorizontal, X, MapPin, ChevronDown,
  ArrowUpDown, Grid3X3, List, ChevronRight, Bike,
  Calendar, Gauge, Heart, CheckCircle, Filter
} from 'lucide-react'
import UsedBikeCard from '@/components/common/BikeCard'
import AdSlot from '@/components/ads/AdSlot'
import { INDIAN_CITIES, PRICE_RANGES, formatPrice, cn } from '@/lib/utils'

const BRANDS = ['Honda', 'Yamaha', 'Royal Enfield', 'TVS', 'Bajaj', 'Hero', 'Suzuki', 'KTM', 'Jawa', 'BMW']

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'km_low', label: 'Lowest KM' },
]

// Demo data
const DEMO_LISTINGS = [
  { id: '1', title: 'Honda Activa 4G', asking_price: 42000, registration_year: 2019, km_driven: 28000, city: 'Chennai', seller_type: 'individual', is_verified: true, deal_score: 'good_deal', estimated_min_price: 44000, estimated_max_price: 52000 },
  { id: '2', title: 'Royal Enfield Classic 350', asking_price: 145000, registration_year: 2020, km_driven: 15000, city: 'Bengaluru', seller_type: 'individual', is_verified: true, deal_score: 'good_deal', estimated_min_price: 150000, estimated_max_price: 175000 },
  { id: '3', title: 'TVS Apache RTR 160 4V', asking_price: 85000, registration_year: 2021, km_driven: 12000, city: 'Mumbai', seller_type: 'dealer', is_verified: true, deal_score: 'fair_deal', estimated_min_price: 80000, estimated_max_price: 95000 },
  { id: '4', title: 'Bajaj Pulsar NS200', asking_price: 95000, registration_year: 2020, km_driven: 20000, city: 'Pune', seller_type: 'individual', is_verified: false, deal_score: 'fair_deal', estimated_min_price: 88000, estimated_max_price: 105000 },
  { id: '5', title: 'Yamaha MT-15 V2', asking_price: 130000, registration_year: 2022, km_driven: 8000, city: 'Hyderabad', seller_type: 'individual', is_verified: true, deal_score: 'good_deal', estimated_min_price: 135000, estimated_max_price: 155000 },
  { id: '6', title: 'Hero Splendor Plus', asking_price: 35000, registration_year: 2018, km_driven: 45000, city: 'Delhi', seller_type: 'individual', is_verified: false, deal_score: 'fair_deal', estimated_min_price: 32000, estimated_max_price: 42000 },
  { id: '7', title: 'KTM Duke 200', asking_price: 140000, registration_year: 2021, km_driven: 14000, city: 'Chennai', seller_type: 'dealer', is_verified: true, deal_score: 'fair_deal', estimated_min_price: 135000, estimated_max_price: 160000 },
  { id: '8', title: 'Honda SP 125', asking_price: 55000, registration_year: 2021, km_driven: 18000, city: 'Coimbatore', seller_type: 'individual', is_verified: true, deal_score: 'good_deal', estimated_min_price: 58000, estimated_max_price: 68000 },
  { id: '9', title: 'Royal Enfield Meteor 350', asking_price: 155000, registration_year: 2022, km_driven: 9000, city: 'Bengaluru', seller_type: 'individual', is_verified: true, deal_score: 'good_deal', estimated_min_price: 160000, estimated_max_price: 185000 },
  { id: '10', title: 'TVS Jupiter 125', asking_price: 60000, registration_year: 2022, km_driven: 10000, city: 'Madurai', seller_type: 'dealer', is_verified: true, deal_score: 'fair_deal', estimated_min_price: 58000, estimated_max_price: 72000 },
  { id: '11', title: 'Suzuki Access 125', asking_price: 48000, registration_year: 2020, km_driven: 22000, city: 'Mumbai', seller_type: 'individual', is_verified: false, deal_score: 'fair_deal', estimated_min_price: 45000, estimated_max_price: 55000 },
  { id: '12', title: 'Bajaj Dominar 400', asking_price: 165000, registration_year: 2021, km_driven: 16000, city: 'Pune', seller_type: 'individual', is_verified: true, deal_score: 'high_price', estimated_min_price: 140000, estimated_max_price: 160000 },
]

export default function UsedBikesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Used Bikes</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Used Bikes for Sale
          </h1>
          <p className="text-gray-600 mt-1">
            {DEMO_LISTINGS.length}+ bikes available across India
          </p>
        </div>
      </div>

      <div className="container-main py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bikes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-moto-primary focus:border-moto-primary outline-none"
                />
              </div>

              {/* City Filter */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">City</h3>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="select-field text-sm py-2"
                >
                  <option value="">All Cities</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-moto-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map(range => (
                    <label key={range.label} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-moto-primary">
                      <input
                        type="radio"
                        name="price"
                        value={range.label}
                        checked={selectedPrice === range.label}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="border-gray-300 text-moto-primary focus:ring-moto-primary"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Year</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['2024', '2023', '2022', '2021', '2020', '2019', '2018', 'Before 2018'].map(year => (
                    <label key={year} className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                      {year}
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Type */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Seller Type</h3>
                <div className="space-y-2">
                  {['Individual', 'Dealer'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* KM Driven */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">KM Driven</h3>
                <div className="space-y-2">
                  {['Under 10,000', '10K - 25K', '25K - 50K', '50K+'].map(range => (
                    <label key={range} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                      {range}
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">More Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                    Verified Seller
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                    Insurance Valid
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                    Service History
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                    Good Deal Only
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-moto-primary"
                >
                  <Filter size={16} />
                  Filters
                </button>
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{DEMO_LISTINGS.length}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-moto-primary outline-none"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn('p-2', viewMode === 'grid' ? 'text-moto-primary bg-orange-50' : 'text-gray-400')}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn('p-2', viewMode === 'list' ? 'text-moto-primary bg-orange-50' : 'text-gray-400')}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
              {['Chennai', 'Under ₹50K', 'Under ₹1 Lakh', 'Good Deals', 'Verified', 'Scooters'].map(tag => (
                <button key={tag} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-orange-50 hover:text-moto-primary rounded-full whitespace-nowrap transition-colors">
                  {tag}
                </button>
              ))}
            </div>

            {/* Listings Grid/List */}
            <div className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
            )}>
              {DEMO_LISTINGS.map(listing => (
                <UsedBikeCard
                  key={listing.id}
                  listing={listing as any}
                  layout={viewMode}
                />
              ))}
            </div>

            {/* Empty State */}
            {DEMO_LISTINGS.length === 0 && (
              <div className="text-center py-16">
                <Bike size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bikes found</h3>
                <p className="text-gray-500 mb-4">Try changing your filters or search criteria.</p>
                <button className="btn-outline" onClick={() => { setSelectedCity(''); setSelectedBrand(''); setSelectedPrice('') }}>
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:border-moto-primary">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-moto-primary text-white rounded-lg font-medium">1</button>
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:border-moto-primary">2</button>
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:border-moto-primary">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:border-moto-primary">
                Next
              </button>
            </div>

            <AdSlot placement="used_listing" />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
          <div className="bottom-sheet">
            <div className="bottom-sheet-handle" />
            <div className="flex items-center justify-between px-4 pb-3 border-b">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="p-1 text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* City */}
              <div>
                <h3 className="font-semibold text-sm mb-2">City</h3>
                <select className="select-field text-sm">
                  <option value="">All Cities</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              {/* Brand */}
              <div>
                <h3 className="font-semibold text-sm mb-2">Brand</h3>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(brand => (
                    <button key={brand} className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-moto-primary hover:text-moto-primary">
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div>
                <h3 className="font-semibold text-sm mb-2">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map(range => (
                    <button key={range.label} className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-moto-primary hover:text-moto-primary">
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex gap-3">
              <button onClick={() => setFiltersOpen(false)} className="btn-secondary flex-1">Reset</button>
              <button onClick={() => setFiltersOpen(false)} className="btn-primary flex-1">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
