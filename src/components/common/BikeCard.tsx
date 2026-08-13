'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Calendar, Gauge, Star, CheckCircle, Tag, Bike } from 'lucide-react'
import { formatPrice, formatKm, getDealScoreColor, getDealScoreLabel, cn } from '@/lib/utils'
import type { UsedBikeListing } from '@/types'

interface UsedBikeCardProps {
  listing: UsedBikeListing | DemoListing
  layout?: 'grid' | 'list'
}

interface DemoListing {
  id: string
  title: string
  asking_price: number
  registration_year: number
  km_driven: number
  city: string
  seller_type: string
  is_verified: boolean
  deal_score: string
  estimated_min_price?: number
  estimated_max_price?: number
  images?: { image_url: string; is_primary: boolean }[]
}

export default function UsedBikeCard({ listing, layout = 'grid' }: UsedBikeCardProps) {
  const [isFavourite, setIsFavourite] = useState(false)

  if (layout === 'list') {
    return (
      <div className="card flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-56 h-40 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-50 shrink-0">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Bike size={40} />
          </div>
          {'is_verified' in listing && listing.is_verified && (
            <span className="absolute top-2 left-2 badge-verified text-[10px]">✓ Verified</span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 hover:text-moto-primary transition-colors">
                {listing.title}
              </h3>
              <button
                onClick={() => setIsFavourite(!isFavourite)}
                className={cn('p-1 transition-colors', isFavourite ? 'text-red-500' : 'text-gray-400 hover:text-red-500')}
              >
                <Heart size={18} fill={isFavourite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={11} />{listing.registration_year}</span>
              <span className="flex items-center gap-1"><Gauge size={11} />{formatKm(listing.km_driven)}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{listing.city}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-moto-primary">{formatPrice(listing.asking_price)}</span>
            <div className="flex items-center gap-2">
              {listing.deal_score !== 'unknown' && (
                <span className={cn('badge-deal text-xs', getDealScoreColor(listing.deal_score))}>
                  {getDealScoreLabel(listing.deal_score)}
                </span>
              )}
              <Link href={`/used-bikes/${listing.id}`} className="btn-outline text-xs py-1.5 px-3">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card group">
      <div className="relative h-44 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform duration-300">
          <Bike size={48} />
        </div>
        {'is_verified' in listing && listing.is_verified && (
          <span className="absolute top-3 left-3 badge-verified text-[10px]">✓ Verified</span>
        )}
        <button
          onClick={() => setIsFavourite(!isFavourite)}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm',
            isFavourite ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'
          )}
        >
          <Heart size={14} fill={isFavourite ? 'currentColor' : 'none'} />
        </button>
        {listing.deal_score !== 'unknown' && (
          <div className="absolute bottom-3 left-3">
            <span className={cn('badge-deal text-[10px]', getDealScoreColor(listing.deal_score))}>
              {getDealScoreLabel(listing.deal_score)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-moto-primary transition-colors line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={11} />{listing.registration_year}</span>
          <span className="flex items-center gap-1"><Gauge size={11} />{formatKm(listing.km_driven)}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
          <MapPin size={11} />
          <span>{listing.city}</span>
          <span className="mx-1">•</span>
          <span className={listing.seller_type === 'dealer' ? 'text-blue-600 font-medium' : ''}>
            {listing.seller_type === 'dealer' ? 'Dealer' : 'Individual'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-moto-primary">{formatPrice(listing.asking_price)}</span>
          <Link href={`/used-bikes/${listing.id}`} className="text-xs text-moto-primary font-medium hover:text-moto-accent">
            View →
          </Link>
        </div>
      </div>
    </div>
  )
}
