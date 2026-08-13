'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bike, Star, Fuel, Gauge, ChevronRight, Heart, GitCompare,
  ArrowRight, Shield, CheckCircle, IndianRupee, Wrench
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

const BRANDS_DATA = [
  { slug: 'honda', name: 'Honda', country: 'Japan' },
  { slug: 'yamaha', name: 'Yamaha', country: 'Japan' },
  { slug: 'royal-enfield', name: 'Royal Enfield', country: 'India' },
  { slug: 'tvs', name: 'TVS', country: 'India' },
  { slug: 'bajaj', name: 'Bajaj', country: 'India' },
  { slug: 'hero', name: 'Hero', country: 'India' },
  { slug: 'suzuki', name: 'Suzuki', country: 'Japan' },
  { slug: 'ktm', name: 'KTM', country: 'Austria' },
  { slug: 'jawa', name: 'Jawa', country: 'India' },
  { slug: 'bmw', name: 'BMW', country: 'Germany' },
  { slug: 'triumph', name: 'Triumph', country: 'UK' },
  { slug: 'kawasaki', name: 'Kawasaki', country: 'Japan' },
]

const ALL_BIKES = [
  { name: 'Honda Activa 6G', slug: 'activa-6g', brand: 'honda', category: 'Scooter', price: 76000, mileage: 60, engine: '109.5cc', power: '7.8 BHP', rating: 4.3, image: '/images/bikes/honda-activa-6g.jpg' },
  { name: 'Honda SP 125', slug: 'sp-125', brand: 'honda', category: 'Commuter', price: 85000, mileage: 65, engine: '124cc', power: '10.7 BHP', rating: 4.2, image: '/images/bikes/honda-sp-125.jpg' },
  { name: 'Honda Shine', slug: 'shine', brand: 'honda', category: 'Commuter', price: 78000, mileage: 60, engine: '124cc', power: '10.6 BHP', rating: 4.1, image: '/images/bikes/honda-shine.jpg' },
  { name: 'Royal Enfield Classic 350', slug: 'classic-350', brand: 'royal-enfield', category: 'Cruiser', price: 193000, mileage: 35, engine: '349cc', power: '20.2 BHP', rating: 4.5, image: '/images/bikes/re-classic-350.jpg' },
  { name: 'Royal Enfield Meteor 350', slug: 'meteor-350', brand: 'royal-enfield', category: 'Cruiser', price: 210000, mileage: 35, engine: '349cc', power: '20.2 BHP', rating: 4.4, image: '/images/bikes/re-meteor-350.jpg' },
  { name: 'Royal Enfield Hunter 350', slug: 'hunter-350', brand: 'royal-enfield', category: 'Roadster', price: 149000, mileage: 36, engine: '349cc', power: '20.2 BHP', rating: 4.3, image: '/images/bikes/re-hunter-350.jpg' },
  { name: 'Yamaha MT-15 V2', slug: 'mt-15-v2', brand: 'yamaha', category: 'Sport', price: 168000, mileage: 48, engine: '155cc', power: '18.2 BHP', rating: 4.4, image: '/images/bikes/yamaha-mt-15-v2.jpg' },
  { name: 'Yamaha R15 V4', slug: 'r15-v4', brand: 'yamaha', category: 'Sport', price: 182000, mileage: 45, engine: '155cc', power: '18.4 BHP', rating: 4.5, image: '/images/bikes/yamaha-r15-v4.jpg' },
  { name: 'TVS Apache RTR 160 4V', slug: 'apache-rtr-160-4v', brand: 'tvs', category: 'Sport', price: 120000, mileage: 45, engine: '159cc', power: '16.3 BHP', rating: 4.3, image: '/images/bikes/tvs-apache-rtr-160-4v.jpg' },
  { name: 'TVS Jupiter 125', slug: 'jupiter-125', brand: 'tvs', category: 'Scooter', price: 75000, mileage: 55, engine: '124.8cc', power: '8.0 BHP', rating: 4.2, image: '/images/bikes/tvs-jupiter-125.jpg' },
  { name: 'Bajaj Pulsar 150', slug: 'pulsar-150', brand: 'bajaj', category: 'Sport', price: 105000, mileage: 50, engine: '149.5cc', power: '13.8 BHP', rating: 4.1, image: '/images/bikes/bajaj-pulsar-150.jpg' },
  { name: 'Bajaj Pulsar NS200', slug: 'pulsar-ns200', brand: 'bajaj', category: 'Sport', price: 156000, mileage: 40, engine: '199.5cc', power: '24.3 BHP', rating: 4.3, image: '/images/bikes/bajaj-pulsar-ns200.jpg' },
  { name: 'Hero Splendor Plus', slug: 'splendor-plus', brand: 'hero', category: 'Commuter', price: 74000, mileage: 80, engine: '97.2cc', power: '7.9 BHP', rating: 4.0, image: '/images/bikes/hero-splendor-plus.jpg' },
  { name: 'Hero Xtreme 160R', slug: 'xtreme-160r', brand: 'hero', category: 'Sport', price: 114000, mileage: 50, engine: '163cc', power: '15 BHP', rating: 4.2, image: '/images/bikes/hero-xtreme-160r.jpg' },
  { name: 'KTM Duke 200', slug: 'duke-200', brand: 'ktm', category: 'Sport', price: 196000, mileage: 40, engine: '199.5cc', power: '25 BHP', rating: 4.4, image: '/images/bikes/ktm-duke-200.jpg' },
  { name: 'KTM Duke 390', slug: 'duke-390', brand: 'ktm', category: 'Sport', price: 312000, mileage: 35, engine: '373cc', power: '43 BHP', rating: 4.5, image: '/images/bikes/ktm-duke-390.jpg' },
  { name: 'Suzuki Access 125', slug: 'access-125', brand: 'suzuki', category: 'Scooter', price: 80000, mileage: 53, engine: '124cc', power: '8.5 BHP', rating: 4.1, image: '/images/bikes/suzuki-access-125.jpg' },
  { name: 'Suzuki Gixxer SF 250', slug: 'gixxer-sf-250', brand: 'suzuki', category: 'Sport', price: 193000, mileage: 35, engine: '249cc', power: '26 BHP', rating: 4.3, image: '/images/bikes/suzuki-gixxer-sf-250.jpg' },
]

export default function NewBikesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')

  const categories = ['all', 'Scooter', 'Commuter', 'Sport', 'Cruiser', 'Roadster']
  
  const filteredBikes = ALL_BIKES.filter(bike => {
    if (selectedCategory !== 'all' && bike.category !== selectedCategory) return false
    if (selectedBrand !== 'all' && bike.brand !== selectedBrand) return false
    return true
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">New Bikes</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            New Bikes in India
          </h1>
          <p className="text-gray-600 mt-1">
            Explore all new motorcycles, scooters and their prices, specifications and reviews
          </p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Brand Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedBrand === 'all' ? 'bg-moto-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            {BRANDS_DATA.map(brand => (
              <button
                key={brand.slug}
                onClick={() => setSelectedBrand(brand.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selectedBrand === brand.slug ? 'bg-moto-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                selectedCategory === cat ? 'bg-moto-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBikes.map(bike => (
            <div key={bike.slug} className="card group">
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                  <Bike size={48} />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium bg-white/90 px-2 py-0.5 rounded-full text-gray-600">
                    {bike.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500">
                    <Heart size={13} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-moto-primary font-medium uppercase">{bike.brand.replace('-', ' ')}</p>
                <h3 className="font-semibold text-gray-900 mt-0.5 group-hover:text-moto-primary transition-colors">
                  {bike.name}
                </h3>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={13} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium text-gray-700">{bike.rating}</span>
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">₹{(bike.price / 1000).toFixed(0)}K</span>
                  <span className="flex items-center gap-1">{bike.mileage} kmpl</span>
                  <span className="flex items-center gap-1">{bike.engine}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/new-bikes/${bike.brand}/${bike.slug}`}
                    className="btn-outline flex-1 text-center text-xs py-2"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/compare?add=${bike.slug}`}
                    className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-moto-primary hover:border-moto-primary transition-colors"
                  >
                    <GitCompare size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBikes.length === 0 && (
          <div className="text-center py-16">
            <Bike size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bikes found</h3>
            <p className="text-gray-500">Try selecting a different brand or category.</p>
          </div>
        )}

        <AdSlot placement="used_listing" />
      </div>
    </div>
  )
}
