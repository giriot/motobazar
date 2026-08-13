-- MotoBazar Database Schema
-- PostgreSQL / Supabase
-- Run this in Supabase SQL Editor

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'moderator', 'dealer', 'user');
CREATE TYPE listing_status AS ENUM ('pending', 'approved', 'rejected', 'sold', 'expired', 'suspended');
CREATE TYPE dealer_status AS ENUM ('pending', 'verified', 'suspended');
CREATE TYPE content_status AS ENUM ('pending', 'approved', 'rejected', 'flagged', 'removed');
CREATE TYPE deal_score AS ENUM ('good_deal', 'fair_deal', 'high_price', 'unknown');
CREATE TYPE seller_type AS ENUM ('individual', 'dealer');
CREATE TYPE listing_plan AS ENUM ('free', 'featured', 'premium');
CREATE TYPE notification_type AS ENUM ('listing_approved', 'listing_rejected', 'new_enquiry', 'price_update', 'dealer_offer', 'listing_expiring', 'account_verified', 'system');
CREATE TYPE fuel_type AS ENUM ('petrol', 'diesel', 'electric', 'hybrid');
CREATE TYPE transmission_type AS ENUM ('manual', 'automatic', 'cvt');
CREATE TYPE condition_type AS ENUM ('excellent', 'good', 'fair', 'needs_repair');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');

-- ============================================================
-- USERS & PROFILES
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE, -- Will link to auth.users when auth is enabled
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  city TEXT,
  role user_role DEFAULT 'user',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Add foreign key to auth.users when Authentication is enabled
-- Uncomment this after enabling Supabase Auth:
-- ALTER TABLE profiles ADD CONSTRAINT fk_auth_user FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============================================================
-- CITIES
-- ============================================================
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  region TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BIKE BRANDS
-- ============================================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  country TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BIKE MODELS
-- ============================================================
CREATE TABLE bike_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT, -- commuter, sport, cruiser, scooter, adventure, touring
  description TEXT,
  launch_year INT,
  is_discontinued BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id, slug)
);

-- ============================================================
-- BIKE VARIANTS
-- ============================================================
CREATE TABLE bike_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID NOT NULL REFERENCES bike_models(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT,
  year_from INT NOT NULL,
  year_to INT,
  ex_showroom_price INT,
  on_road_price INT,
  engine_cc DECIMAL,
  power_bhp DECIMAL,
  torque_nm DECIMAL,
  mileage_kmpl DECIMAL,
  weight_kg DECIMAL,
  seat_height_mm INT,
  ground_clearance_mm INT,
  fuel_capacity_l DECIMAL,
  fuel_type fuel_type DEFAULT 'petrol',
  transmission transmission_type DEFAULT 'manual',
  abs_type TEXT, -- none, single_channel, dual_channel, switchable
  front_brakes TEXT,
  rear_brakes TEXT,
  front_suspension TEXT,
  rear_suspension TEXT,
  front_tyre TEXT,
  rear_tyre TEXT,
  starting TEXT, -- self_start, kick_start, both
  top_speed_kmh INT,
  features JSONB DEFAULT '[]',
  colours JSONB DEFAULT '[]',
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BIKE IMAGES
-- ============================================================
CREATE TABLE bike_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID REFERENCES bike_variants(id) ON DELETE CASCADE,
  model_id UUID REFERENCES bike_models(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEALERS (created before listings for foreign key reference)
-- ============================================================
CREATE TABLE dealers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  address TEXT,
  city TEXT NOT NULL,
  city_slug TEXT,
  state TEXT,
  pincode TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  opening_hours JSONB,
  brands JSONB DEFAULT '[]',
  status dealer_status DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT false,
  verification_notes TEXT,
  gst_number TEXT,
  established_year INT,
  total_listings INT DEFAULT 0,
  total_sold INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USED BIKE LISTINGS
-- ============================================================
CREATE TABLE used_bike_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES dealers(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id),
  model_id UUID REFERENCES bike_models(id),
  variant_id UUID REFERENCES bike_variants(id),
  
  -- Bike details
  title TEXT NOT NULL,
  description TEXT,
  registration_year INT NOT NULL,
  km_driven INT NOT NULL,
  owners INT DEFAULT 1,
  fuel_type fuel_type DEFAULT 'petrol',
  transmission transmission_type DEFAULT 'manual',
  condition_type condition_type DEFAULT 'good',
  
  -- Pricing
  asking_price INT NOT NULL,
  estimated_min_price INT,
  estimated_max_price INT,
  deal_score deal_score DEFAULT 'unknown',
  
  -- Location
  city TEXT NOT NULL,
  city_slug TEXT,
  locality TEXT,
  
  -- Documents
  insurance_valid BOOLEAN DEFAULT false,
  insurance_expiry DATE,
  rc_status TEXT, -- valid, expired, transfer_pending
  service_history BOOLEAN DEFAULT false,
  
  -- Seller
  seller_type seller_type DEFAULT 'individual',
  seller_name TEXT,
  seller_phone TEXT, -- encrypted at app level
  seller_email TEXT,
  whatsapp_contact BOOLEAN DEFAULT false,
  
  -- Status
  status listing_status DEFAULT 'pending',
  plan listing_plan DEFAULT 'free',
  featured_until TIMESTAMPTZ,
  priority_score INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  
  -- Metrics
  views_count INT DEFAULT 0,
  favourites_count INT DEFAULT 0,
  enquiries_count INT DEFAULT 0,
  
  -- Moderation
  moderation_notes TEXT,
  rejected_reason TEXT,
  
  -- Timestamps
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USED BIKE IMAGES
-- ============================================================
CREATE TABLE used_bike_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES used_bike_listings(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEALER OFFERS
-- ============================================================
CREATE TABLE dealer_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id),
  model_id UUID REFERENCES bike_models(id),
  variant_id UUID REFERENCES bike_variants(id),
  
  title TEXT NOT NULL,
  description TEXT,
  original_price INT,
  offer_price INT NOT NULL,
  discount_percent DECIMAL,
  exchange_bonus INT,
  finance_offer TEXT,
  insurance_offer TEXT,
  accessories_included TEXT,
  
  city TEXT NOT NULL,
  city_slug TEXT,
  
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  status content_status DEFAULT 'pending',
  
  views_count INT DEFAULT 0,
  leads_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEALER LEADS
-- ============================================================
CREATE TABLE dealer_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES dealer_offers(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES used_bike_listings(id) ON DELETE SET NULL,
  
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  bike_interest TEXT,
  
  status lead_status DEFAULT 'new',
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FAVOURITES
-- ============================================================
CREATE TABLE favourites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES used_bike_listings(id) ON DELETE CASCADE,
  model_id UUID REFERENCES bike_models(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES dealer_offers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id),
  UNIQUE(user_id, model_id),
  UNIQUE(user_id, offer_id)
);

-- ============================================================
-- SAVED SEARCHES
-- ============================================================
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT,
  search_type TEXT DEFAULT 'used', -- used, new, dealer
  filters JSONB DEFAULT '{}',
  city TEXT,
  brand TEXT,
  model TEXT,
  min_price INT,
  max_price INT,
  notify_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REVIEWS (User Reviews for Bikes)
-- ============================================================
CREATE TABLE bike_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES bike_variants(id) ON DELETE CASCADE,
  model_id UUID REFERENCES bike_models(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  ownership_duration TEXT,
  km_driven INT,
  mileage_actual DECIMAL,
  
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  
  status content_status DEFAULT 'pending',
  is_expert BOOLEAN DEFAULT false,
  
  helpful_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ARTICLES (News, Reviews, Guides)
-- ============================================================
CREATE TABLE article_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT,
  category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  
  -- Status
  status content_status DEFAULT 'pending',
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  
  -- Metrics
  views_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REPORTS
-- ============================================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES used_bike_listings(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  
  reason TEXT NOT NULL,
  description TEXT,
  status content_status DEFAULT 'pending',
  admin_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VALUATION RULES
-- ============================================================
CREATE TABLE valuation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  model_id UUID REFERENCES bike_models(id) ON DELETE CASCADE,
  
  depreciation_year DECIMAL DEFAULT 10, -- % depreciation per year
  min_depreciation DECIMAL DEFAULT 5,
  max_depreciation DECIMAL DEFAULT 25,
  km_factor DECIMAL DEFAULT 0.5, -- price reduction per 10k km
  owner_factor DECIMAL DEFAULT 8, -- % reduction per additional owner
  condition_factors JSONB DEFAULT '{"excellent": 5, "good": 0, "fair": -10, "needs_repair": -25}',
  insurance_bonus DECIMAL DEFAULT 3, -- % bonus for valid insurance
  service_history_bonus DECIMAL DEFAULT 2,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AD SETTINGS
-- ============================================================
CREATE TABLE ad_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ads_enabled BOOLEAN DEFAULT false,
  adsense_publisher_id TEXT,
  placements JSONB DEFAULT '{
    "home_top": false,
    "home_middle": false,
    "article_middle": false,
    "article_bottom": false,
    "sidebar": false,
    "used_listing": false,
    "bike_detail": false
  }',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default site settings
INSERT INTO site_settings (key, value) VALUES
('site_name', '"MotoBazar"'),
('tagline', '"Buy. Sell. Compare. Ride."'),
('support_email', '"support@motobazar.com"'),
('default_city', '"Chennai"'),
('currency', '"₹"'),
('seo_title', '"MotoBazar - Buy & Sell New and Used Bikes in India"'),
('seo_description', '"India''s trusted motorcycle marketplace. Buy new bikes, sell used bikes, compare models and find dealer offers."'),
('maintenance_mode', 'false'),
('registration_enabled', 'true'),
('used_bike_listing_enabled', 'true'),
('dealer_registration_enabled', 'true'),
('analytics_enabled', 'false'),
('google_analytics_id', '""'),
('adsense_publisher_id', '""');

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  data JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUBSCRIPTIONS (Future)
-- ============================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL, -- featured, premium, dealer_pro
  status TEXT DEFAULT 'inactive', -- active, inactive, cancelled, expired
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  amount INT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS (Future)
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount INT NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_gateway TEXT,
  payment_gateway_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_listings_city ON used_bike_listings(city);
CREATE INDEX idx_listings_brand ON used_bike_listings(brand_id);
CREATE INDEX idx_listings_model ON used_bike_listings(model_id);
CREATE INDEX idx_listings_price ON used_bike_listings(asking_price);
CREATE INDEX idx_listings_year ON used_bike_listings(registration_year);
CREATE INDEX idx_listings_km ON used_bike_listings(km_driven);
CREATE INDEX idx_listings_status ON used_bike_listings(status);
CREATE INDEX idx_listings_created ON used_bike_listings(created_at DESC);
CREATE INDEX idx_listings_user ON used_bike_listings(user_id);
CREATE INDEX idx_listings_dealer ON used_bike_listings(dealer_id);
CREATE INDEX idx_listings_seller_type ON used_bike_listings(seller_type);
CREATE INDEX idx_listings_plan ON used_bike_listings(plan);

CREATE INDEX idx_models_brand ON bike_models(brand_id);
CREATE INDEX idx_models_slug ON bike_models(slug);
CREATE INDEX idx_models_category ON bike_models(category);

CREATE INDEX idx_variants_model ON bike_variants(model_id);
CREATE INDEX idx_variants_year ON bike_variants(year_from);

CREATE INDEX idx_dealers_city ON dealers(city);
CREATE INDEX idx_dealers_status ON dealers(status);
CREATE INDEX idx_dealers_slug ON dealers(slug);

CREATE INDEX idx_offers_dealer ON dealer_offers(dealer_id);
CREATE INDEX idx_offers_city ON dealer_offers(city);
CREATE INDEX idx_offers_active ON dealer_offers(is_active);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_published ON articles(published_at DESC);

CREATE INDEX idx_reviews_model ON bike_reviews(model_id);
CREATE INDEX idx_reviews_status ON bike_reviews(status);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

CREATE INDEX idx_favourites_user ON favourites(user_id);
CREATE INDEX idx_favourites_listing ON favourites(listing_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_bike_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_bike_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE bike_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: Approved listings viewable by all, own listings always viewable
CREATE POLICY "Approved listings public" ON used_bike_listings FOR SELECT 
  USING (status = 'approved' OR user_id = auth.uid());
CREATE POLICY "Users insert own listings" ON used_bike_listings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own listings" ON used_bike_listings FOR UPDATE 
  USING (auth.uid() = user_id);
CREATE POLICY "Users delete own listings" ON used_bike_listings FOR DELETE 
  USING (auth.uid() = user_id);

-- Listing images
CREATE POLICY "Listing images public" ON used_bike_images FOR SELECT USING (true);
CREATE POLICY "Users manage own listing images" ON used_bike_images FOR ALL 
  USING (listing_id IN (SELECT id FROM used_bike_listings WHERE user_id = auth.uid()));

-- Dealers: Verified dealers viewable by all
CREATE POLICY "Dealers viewable" ON dealers FOR SELECT USING (true);
CREATE POLICY "Users insert dealers" ON dealers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own dealers" ON dealers FOR UPDATE USING (auth.uid() = user_id);

-- Dealer offers
CREATE POLICY "Active offers public" ON dealer_offers FOR SELECT USING (is_active = true);

-- Favourites
CREATE POLICY "Users view own favourites" ON favourites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage favourites" ON favourites FOR ALL USING (auth.uid() = user_id);

-- Saved searches
CREATE POLICY "Users view own searches" ON saved_searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage searches" ON saved_searches FOR ALL USING (auth.uid() = user_id);

-- Reviews
CREATE POLICY "Approved reviews public" ON bike_reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Users insert reviews" ON bike_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own reviews" ON bike_reviews FOR UPDATE USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Reports
CREATE POLICY "Users insert reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON bike_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_variants_updated_at BEFORE UPDATE ON bike_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON used_bike_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON dealers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON dealer_offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate deal score
CREATE OR REPLACE FUNCTION calculate_deal_score(
  p_listing_id UUID
) RETURNS deal_score AS $$
DECLARE
  v_listing RECORD;
  v_market_mid INT;
  v_diff_pct DECIMAL;
  v_score deal_score;
BEGIN
  SELECT * INTO v_listing FROM used_bike_listings WHERE id = p_listing_id;
  
  IF v_listing.estimated_min_price IS NULL OR v_listing.estimated_max_price IS NULL THEN
    RETURN 'unknown';
  END IF;
  
  v_market_mid := (v_listing.estimated_min_price + v_listing.estimated_max_price) / 2;
  v_diff_pct := ((v_listing.asking_price - v_market_mid)::DECIMAL / v_market_mid) * 100;
  
  IF v_diff_pct <= -5 THEN
    v_score := 'good_deal';
  ELSIF v_diff_pct <= 10 THEN
    v_score := 'fair_deal';
  ELSE
    v_score := 'high_price';
  END IF;
  
  UPDATE used_bike_listings SET deal_score = v_score WHERE id = p_listing_id;
  
  RETURN v_score;
END;
$$ LANGUAGE plpgsql;
