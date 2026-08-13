'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, IndianRupee, Bike, Star, Fuel, Gauge, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRICE_CATEGORIES = [
  {
    id: 'under-1-lakh', title: 'Best Bikes Under ₹1 Lakh',
    bikes: [
      { name: 'Honda Activa 6G', price: 76000, mileage: 60, engine: '109.5cc', rating: 4.3, category: 'Scooter' },
      { name: 'Hero Splendor Plus', price: 74000, mileage: 80, engine: '97.2cc', rating: 4.0, category: 'Commuter' },
      { name: 'TVS Jupiter 125', price: 75000, mileage: 55, engine: '124.8cc', rating: 4.2, category: 'Scooter' },
      { name: 'Honda SP 125', price: 85000, mileage: 65, engine: '124cc', rating: 4.2, category: 'Commuter' },
      { name: 'Bajaj Pulsar 150', price: 105000, mileage: 50, engine: '149.5cc', rating: 4.1, category: 'Sport' },
    ]
  },
  {
    id: 'under-1.5-lakh', title: 'Best Bikes Under ₹1.5 Lakh',
    bikes: [
      { name: 'TVS Apache RTR 160 4V', price: 120000, mileage: 45, engine: '159cc', rating: 4.3, category: 'Sport' },
      { name: 'Hero Xtreme 160R', price: 114000, mileage: 50, engine: '163cc', rating: 4.2, category: 'Sport' },
      { name: 'Yamaha FZ-S V4', price: 125000, mileage: 45, engine: '149cc', rating: 4.2, category: 'Sport' },
      { name: 'Bajaj Pulsar NS200', price: 156000, mileage: 40, engine: '199.5cc', rating: 4.3, category: 'Sport' },
      { name: 'Suzuki Access 125', price: 80000, mileage: 53, engine: '124cc', rating: 4.1, category: 'Scooter' },
    ]
  },
  {
    id: 'best-mileage', title: 'Best Mileage Bikes',
    bikes: [
      { name: 'Hero Splendor Plus', price: 74000, mileage: 80, engine: '97.2cc', rating: 4.0, category: 'Commuter' },
      { name: 'Honda SP 125', price: 85000, mileage: 65, engine: '124cc', rating: 4.2, category: 'Commuter' },
      { name: 'Honda Activa 6G', price: 76000, mileage: 60, engine: '109.5cc', rating: 4.3, category: 'Scooter' },
      { name: 'Honda Shine', price: 78000, mileage: 60, engine: '124cc', rating: 4.1, category: 'Commuter' },
      { name: 'TVS Jupiter 125', price: 75000, mileage: 55, engine: '124.8cc', rating: 4.2, category: 'Scooter' },
    ]
  },
  {
    id: 'commuter', title: 'Best Commuter Bikes',
    bikes: [
      { name: 'Hero Splendor Plus', price: 74000, mileage: 80, engine: '97.2cc', rating: 4.0, category: 'Commuter' },
      { name: 'Honda Shine', price: 78000, mileage: 60, engine: '124cc', rating: 4.1, category: 'Commuter' },
      { name: 'Honda SP 125', price: 85000, mileage: 65, engine: '124cc', rating: 4.2, category: 'Commuter' },
      { name: 'Bajaj Pulsar 150', price: 105000, mileage: 50, engine: '149.5cc', rating: 4.1, category: 'Sport' },
      { name: 'TVS Apache RTR 160 4V', price: 120000, mileage: 45, engine: '159cc', rating: 4.3, category: 'Sport' },
    ]
  },
  {
    id: 'scooters', title: 'Best Scooters in India',
    bikes: [
      { name: 'Honda Activa 6G', price: 76000, mileage: 60, engine: '109.5cc', rating: 4.3, category: 'Scooter' },
      { name: 'TVS Jupiter 125', price: 75000, mileage: 55, engine: '124.8cc', rating: 4.2, category: 'Scooter' },
      { name: 'Suzuki Access 125', price: 80000, mileage: 53, engine: '124cc', rating: 4.1, category: 'Scooter' },
    ]
  },
  {
    id: 'beginners', title: 'Best Bikes for Beginners',
    bikes: [
      { name: 'Hero Splendor Plus', price: 74000, mileage: 80, engine: '97.2cc', rating: 4.0, category: 'Commuter' },
      { name: 'Honda Activa 6G', price: 76000, mileage: 60, engine: '109.5cc', rating: 4.3, category: 'Scooter' },
      { name: 'Honda SP 125', price: 85000, mileage: 65, engine: '124cc', rating: 4.2, category: 'Commuter' },
      { name: 'Royal Enfield Hunter 350', price: 149000, mileage: 36, engine: '349cc', rating: 4.3, category: 'Roadster' },
      { name: 'Bajaj Pulsar 150', price: 105000, mileage: 50, engine: '149.5cc', rating: 4.1, category: 'Sport' },
    ]
  },
]

export default function BikePricePage() {
  const [activeCategory, setActiveCategory] = useState('under-1-lakh')
  const current = PRICE_CATEGORIES.find(c => c.id === activeCategory)

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Bike Prices</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Bike Price Guide
          </h1>
          <p className="text-gray-600 mt-1">Find the best bikes in every budget and category</p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {PRICE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors',
                activeCategory === cat.id ? 'bg-moto-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Bikes List */}
        {current && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{current.title}</h2>
            <div className="space-y-3">
              {current.bikes.map((bike, idx) => (
                <div key={bike.name} className="card flex items-center p-4 gap-4">
                  <span className="text-2xl font-bold text-gray-200 w-8 text-center">{idx + 1}</span>
                  <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Bike size={24} className="text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{bike.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Star size={11} className="text-yellow-500 fill-yellow-500" />{bike.rating}</span>
                      <span>{bike.mileage} kmpl</span>
                      <span>{bike.engine}</span>
                      <span className="text-moto-primary font-medium">{bike.category}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-moto-primary">₹{(bike.price / 1000).toFixed(0)}K</p>
                    <p className="text-[10px] text-gray-400">Ex-showroom</p>
                  </div>
                  <Link href={`/new-bikes`} className="btn-outline text-xs py-1.5 px-3 shrink-0 hidden sm:inline-flex">
                    Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
