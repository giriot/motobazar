import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakh`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatPriceShort(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)} Cr`
  }
  if (price >= 100000) {
    return `${(price / 100000).toFixed(1)} L`
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`
  }
  return `${price}`
}

export function formatKm(km: number): string {
  if (km >= 100000) {
    return `${(km / 100000).toFixed(1)}L km`
  }
  return `${km.toLocaleString('en-IN')} km`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function calculateDealScore(
  askingPrice: number,
  estimatedMin: number,
  estimatedMax: number
): 'good_deal' | 'fair_deal' | 'high_price' | 'unknown' {
  if (!estimatedMin || !estimatedMax) return 'unknown'
  
  const marketMid = (estimatedMin + estimatedMax) / 2
  const diffPercent = ((askingPrice - marketMid) / marketMid) * 100
  
  if (diffPercent <= -5) return 'good_deal'
  if (diffPercent <= 10) return 'fair_deal'
  return 'high_price'
}

export function calculateEstimatedValue(
  exShowroomPrice: number,
  year: number,
  kmDriven: number,
  owners: number,
  condition: string,
  hasInsurance: boolean,
  hasServiceHistory: boolean
): { min: number; max: number } {
  const currentYear = new Date().getFullYear()
  const age = currentYear - year
  
  // Base depreciation: 12% per year
  let depreciationRate = 12
  let value = exShowroomPrice
  
  // Apply year depreciation
  for (let i = 0; i < age; i++) {
    value = value * (1 - depreciationRate / 100)
    if (i >= 3) depreciationRate = Math.max(8, depreciationRate - 1)
  }
  
  // KM adjustment: -0.5% per 10,000 km
  const kmPenalty = (kmDriven / 10000) * 0.5
  value = value * (1 - kmPenalty / 100)
  
  // Owner penalty: -8% per additional owner
  if (owners > 1) {
    value = value * (1 - (owners - 1) * 8 / 100)
  }
  
  // Condition adjustment
  const conditionFactors: Record<string, number> = {
    excellent: 1.05,
    good: 1.0,
    fair: 0.9,
    needs_repair: 0.75
  }
  value = value * (conditionFactors[condition] || 1.0)
  
  // Insurance bonus
  if (hasInsurance) value = value * 1.03
  
  // Service history bonus
  if (hasServiceHistory) value = value * 1.02
  
  const min = Math.round(value * 0.93)
  const max = Math.round(value * 1.07)
  
  return { min: Math.max(5000, min), max: Math.max(8000, max) }
}

export function getDealScoreColor(score: string): string {
  switch (score) {
    case 'good_deal': return 'text-green-600 bg-green-50 border-green-200'
    case 'fair_deal': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'high_price': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export function getDealScoreLabel(score: string): string {
  switch (score) {
    case 'good_deal': return 'GOOD DEAL'
    case 'fair_deal': return 'FAIR DEAL'
    case 'high_price': return 'HIGH PRICE'
    default: return 'PRICE UNKNOWN'
  }
}

export function getDealScoreEmoji(score: string): string {
  switch (score) {
    case 'good_deal': return '🟢'
    case 'fair_deal': return '🟡'
    case 'high_price': return '🔴'
    default: return '⚪'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': case 'verified': case 'active': return 'text-green-600 bg-green-50'
    case 'pending': return 'text-yellow-600 bg-yellow-50'
    case 'rejected': case 'suspended': return 'text-red-600 bg-red-50'
    case 'sold': return 'text-blue-600 bg-blue-50'
    case 'expired': return 'text-gray-600 bg-gray-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getCitySlug(city: string): string {
  return slugify(city)
}

export const INDIAN_CITIES = [
  'Chennai', 'Coimbatore', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune',
  'Delhi', 'Kochi', 'Madurai', 'Salem', 'Tiruppur', 'Trichy', 'Erode',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Kolkata', 'Nagpur', 'Indore', 'Vizag'
]

export const PRICE_RANGES = [
  { label: 'Under ₹30,000', min: 0, max: 30000 },
  { label: '₹30K - ₹50K', min: 30000, max: 50000 },
  { label: '₹50K - ₹75K', min: 50000, max: 75000 },
  { label: '₹75K - ₹1 Lakh', min: 75000, max: 100000 },
  { label: '₹1L - ₹1.5L', min: 100000, max: 150000 },
  { label: '₹1.5L+', min: 150000, max: 9999999 },
]

export const QUICK_SEARCH_RANGES = [
  { label: 'Under ₹50K', min: 0, max: 50000 },
  { label: 'Under ₹1 Lakh', min: 0, max: 100000 },
  { label: 'Under ₹1.5 Lakh', min: 0, max: 150000 },
  { label: 'Under ₹2 Lakh', min: 0, max: 200000 },
  { label: 'Premium Bikes', min: 200000, max: 9999999 },
  { label: 'Scooters', min: 0, max: 0, category: 'scooter' },
]
