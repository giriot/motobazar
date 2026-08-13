// ============================================================
// MotoBazar Type Definitions
// ============================================================

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'dealer' | 'user'
export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'sold' | 'expired' | 'suspended'
export type DealerStatus = 'pending' | 'verified' | 'suspended'
export type ContentStatus = 'pending' | 'approved' | 'rejected' | 'flagged' | 'removed'
export type DealScore = 'good_deal' | 'fair_deal' | 'high_price' | 'unknown'
export type SellerType = 'individual' | 'dealer'
export type ListingPlan = 'free' | 'featured' | 'premium'
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid'
export type TransmissionType = 'manual' | 'automatic' | 'cvt'
export type ConditionType = 'excellent' | 'good' | 'fair' | 'needs_repair'
export type NotificationType = 'listing_approved' | 'listing_rejected' | 'new_enquiry' | 'price_update' | 'dealer_offer' | 'listing_expiring' | 'account_verified' | 'system'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  city?: string
  role: UserRole
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url?: string
  country: string
  description?: string
  is_active: boolean
  sort_order: number
}

export interface BikeModel {
  id: string
  brand_id: string
  name: string
  slug: string
  category?: string
  description?: string
  launch_year?: number
  is_discontinued: boolean
  is_active: boolean
  brand?: Brand
  images?: BikeImage[]
  variants?: BikeVariant[]
}

export interface BikeVariant {
  id: string
  model_id: string
  name: string
  slug?: string
  year_from: number
  year_to?: number
  ex_showroom_price?: number
  on_road_price?: number
  engine_cc?: number
  power_bhp?: number
  torque_nm?: number
  mileage_kmpl?: number
  weight_kg?: number
  seat_height_mm?: number
  ground_clearance_mm?: number
  fuel_capacity_l?: number
  fuel_type: FuelType
  transmission: TransmissionType
  abs_type?: string
  front_brakes?: string
  rear_brakes?: string
  front_suspension?: string
  rear_suspension?: string
  front_tyre?: string
  rear_tyre?: string
  starting?: string
  top_speed_kmh?: number
  features: string[]
  colours: string[]
  pros: string[]
  cons: string[]
}

export interface BikeImage {
  id: string
  variant_id?: string
  model_id?: string
  image_url: string
  alt_text?: string
  sort_order: number
  is_primary: boolean
}

export interface UsedBikeListing {
  id: string
  user_id: string
  dealer_id?: string
  brand_id?: string
  model_id?: string
  variant_id?: string
  title: string
  description?: string
  registration_year: number
  km_driven: number
  owners: number
  fuel_type: FuelType
  transmission: TransmissionType
  condition_type: ConditionType
  asking_price: number
  estimated_min_price?: number
  estimated_max_price?: number
  deal_score: DealScore
  city: string
  city_slug?: string
  locality?: string
  insurance_valid: boolean
  insurance_expiry?: string
  rc_status?: string
  service_history: boolean
  seller_type: SellerType
  seller_name?: string
  whatsapp_contact: boolean
  status: ListingStatus
  plan: ListingPlan
  is_verified: boolean
  views_count: number
  favourites_count: number
  enquiries_count: number
  expires_at?: string
  created_at: string
  updated_at: string
  images?: UsedBikeImage[]
  brand?: Brand
  model?: BikeModel
  user?: Profile
}

export interface UsedBikeImage {
  id: string
  listing_id: string
  image_url: string
  thumbnail_url?: string
  sort_order: number
  is_primary: boolean
}

export interface Dealer {
  id: string
  user_id?: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  cover_url?: string
  address?: string
  city: string
  city_slug?: string
  state?: string
  pincode?: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  opening_hours?: Record<string, string>
  brands: string[]
  status: DealerStatus
  is_verified: boolean
  gst_number?: string
  established_year?: number
  total_listings: number
  total_sold: number
  rating: number
  review_count: number
  created_at: string
}

export interface DealerOffer {
  id: string
  dealer_id: string
  brand_id?: string
  model_id?: string
  variant_id?: string
  title: string
  description?: string
  original_price?: number
  offer_price: number
  discount_percent?: number
  exchange_bonus?: number
  finance_offer?: string
  insurance_offer?: string
  accessories_included?: string
  city: string
  city_slug?: string
  valid_from?: string
  valid_until?: string
  is_active: boolean
  views_count: number
  leads_count: number
  dealer?: Dealer
  brand?: Brand
  model?: BikeModel
}

export interface DealerLead {
  id: string
  dealer_id: string
  offer_id?: string
  listing_id?: string
  name: string
  email?: string
  phone?: string
  message?: string
  bike_interest?: string
  status: LeadStatus
  notes?: string
  created_at: string
}

export interface Favourite {
  id: string
  user_id: string
  listing_id?: string
  model_id?: string
  offer_id?: string
  created_at: string
}

export interface SavedSearch {
  id: string
  user_id: string
  name?: string
  search_type: string
  filters: Record<string, unknown>
  city?: string
  brand?: string
  model?: string
  min_price?: number
  max_price?: number
  notify_enabled: boolean
  created_at: string
}

export interface BikeReview {
  id: string
  user_id?: string
  variant_id?: string
  model_id?: string
  title: string
  content: string
  rating: number
  ownership_duration?: string
  km_driven?: number
  mileage_actual?: number
  pros: string[]
  cons: string[]
  status: ContentStatus
  is_expert: boolean
  helpful_count: number
  created_at: string
  model?: BikeModel
  user?: Profile
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  author_id?: string
  author_name?: string
  category_id?: string
  meta_title?: string
  meta_description?: string
  keywords?: string
  status: ContentStatus
  is_featured: boolean
  published_at?: string
  views_count: number
  category?: ArticleCategory
}

export interface ArticleCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface City {
  id: string
  name: string
  slug: string
  state: string
  region?: string
  is_active: boolean
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message?: string
  link?: string
  is_read: boolean
  created_at: string
}

export interface Report {
  id: string
  reporter_id?: string
  listing_id?: string
  dealer_id?: string
  article_id?: string
  reason: string
  description?: string
  status: ContentStatus
  admin_notes?: string
  created_at: string
}

export interface ValuationRule {
  id: string
  brand_id?: string
  model_id?: string
  depreciation_year: number
  min_depreciation: number
  max_depreciation: number
  km_factor: number
  owner_factor: number
  condition_factors: Record<string, number>
  insurance_bonus: number
  service_history_bonus: number
}

export interface SiteSettings {
  site_name: string
  tagline: string
  support_email: string
  contact_phone?: string
  default_city: string
  currency: string
  seo_title: string
  seo_description: string
  maintenance_mode: boolean
  registration_enabled: boolean
  used_bike_listing_enabled: boolean
  dealer_registration_enabled: boolean
  analytics_enabled: boolean
  google_analytics_id?: string
}

export interface AdSettings {
  ads_enabled: boolean
  adsense_publisher_id?: string
  placements: {
    home_top: boolean
    home_middle: boolean
    article_middle: boolean
    article_bottom: boolean
    sidebar: boolean
    used_listing: boolean
    bike_detail: boolean
  }
}

// Filter types
export interface UsedBikeFilters {
  city?: string
  brand?: string
  model?: string
  min_price?: number
  max_price?: number
  year_from?: number
  year_to?: number
  km_max?: number
  fuel_type?: FuelType[]
  owners?: number[]
  seller_type?: SellerType[]
  transmission?: TransmissionType[]
  abs?: boolean
  insurance_valid?: boolean
  service_history?: boolean
  is_verified?: boolean
  deal_score?: DealScore[]
}

export interface SortOption {
  value: string
  label: string
}
