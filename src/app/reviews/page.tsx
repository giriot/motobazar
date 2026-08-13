'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Star, ThumbsUp, User, Bike, Clock, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

const DEMO_REVIEWS = [
  {
    id: '1', bike: 'Honda Activa 6G', title: 'Best Scooter for Family Use', rating: 4.2,
    author: 'Rajesh K.', expert: true, date: '2 weeks ago', duration: '6 months',
    content: 'I have been using Activa 6G for 6 months now. The mileage is excellent at 58 kmpl in city traffic. The silent start feature is very convenient.',
    pros: ['Excellent mileage', 'Silent start', 'Smooth ride', 'Good boot space'],
    cons: ['No disc brake option', 'Could be more powerful']
  },
  {
    id: '2', bike: 'Royal Enfield Classic 350', title: 'Pure Riding Joy', rating: 4.5,
    author: 'MotoBazar Editorial', expert: true, date: '1 month ago', duration: '1 year',
    content: 'The Classic 350 is not about numbers. Its about the experience. The thump, the looks, the comfortable ride - everything about this bike makes you want to ride more.',
    pros: ['Iconic design', 'Comfortable', 'Great sound', 'Build quality'],
    cons: ['Heavy in traffic', 'Lower mileage', 'Vibrations above 90kmph']
  },
  {
    id: '3', bike: 'TVS Apache RTR 160 4V', title: 'Best 160cc Commuter', rating: 4.3,
    author: 'Vikram S.', expert: false, date: '3 weeks ago', duration: '8 months',
    content: 'The Apache RTR 160 4V punches well above its weight. The 4-valve engine is responsive and the ride modes are a genuine improvement.',
    pros: ['Great engine', 'Ride modes', 'Good features', 'Aggressive design'],
    cons: ['Pillion discomfort on long rides', 'Wind blast above 100kmph']
  },
  {
    id: '4', bike: 'Yamaha MT-15 V2', title: 'Pocket Rocket', rating: 4.4,
    author: 'Arjun M.', expert: false, date: '1 month ago', duration: '4 months',
    content: 'The MT-15 V2 is the most fun you can have on two wheels at this price. The R15 engine in a naked format is a blast. Light, quick and agile.',
    pros: ['R15 engine', 'Lightweight', 'Great handling', 'Inverted forks'],
    cons: ['Small fuel tank', 'Firm suspension', 'Expensive spares']
  },
  {
    id: '5', bike: 'Hero Splendor Plus', title: 'The People Champion', rating: 4.0,
    author: 'Suresh P.', expert: false, date: '2 months ago', duration: '2 years',
    content: 'After 2 years and 40,000 km, my Splendor Plus still runs like new. The mileage is consistently above 75 kmpl. Maintenance cost is almost zero.',
    pros: ['Amazing mileage', 'Zero maintenance', 'Best resale', 'Comfortable'],
    cons: ['Outdated design', 'No power', 'Drum brakes']
  },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Bike Reviews</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Bike Reviews
          </h1>
          <p className="text-gray-600 mt-1">Honest reviews from experts and real owners</p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {['all', 'Expert Reviews', 'User Reviews', 'Scooters', 'Commuter', 'Sport'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors',
                filter === f ? 'bg-moto-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {f === 'all' ? 'All Reviews' : f}
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="space-y-5">
          {DEMO_REVIEWS.map(review => (
            <div key={review.id} className="card p-5 md:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-gray-900 text-lg">{review.bike}</h2>
                    {review.expert && (
                      <span className="badge-verified text-[10px]">
                        <Award size={10} className="mr-0.5" /> Expert
                      </span>
                    )}
                  </div>
                  <h3 className="text-gray-700 font-medium mt-0.5">{review.title}</h3>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm text-yellow-800">{review.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{review.content}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-xs font-semibold text-green-700 uppercase mb-2">👍 Pros</h4>
                  <ul className="space-y-1">
                    {review.pros.map(pro => (
                      <li key={pro} className="text-sm text-gray-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-700 uppercase mb-2">👎 Cons</h4>
                  <ul className="space-y-1">
                    {review.cons.map(con => (
                      <li key={con} className="text-sm text-gray-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={12} />{review.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{review.date}</span>
                  {review.duration && <span>Owned for {review.duration}</span>}
                </div>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-moto-primary transition-colors">
                  <ThumbsUp size={12} /> Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
