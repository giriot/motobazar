# MotoBazar — Buy. Sell. Compare. Ride.

India's trusted motorcycle marketplace platform.

## 🏍️ Overview

MotoBazar is a full-stack motorcycle marketplace built with Next.js, Supabase, and PostgreSQL. It enables users to buy new and used bikes, sell their bikes for free, compare models, find dealer offers, and get bike valuations.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Supabase (Auth, Database, Storage) |
| Database | PostgreSQL with Row Level Security |
| Icons | Lucide React |
| Deployment | Vercel / any Node.js host |

## 📁 Project Structure

```
motobazar/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   ├── admin/            # Admin panel
│   │   ├── auth/             # Login/Register
│   │   ├── bike-price/       # Price guides
│   │   ├── bike-value/       # Used bike valuation
│   │   ├── compare/          # Bike comparison
│   │   ├── dashboard/        # User dashboard
│   │   ├── dealer/           # Dealer dashboard
│   │   ├── dealer-offers/    # Dealer offers marketplace
│   │   ├── legal/            # About, Contact, Privacy, Terms, etc.
│   │   ├── new-bikes/        # New bike database
│   │   ├── news/             # Articles & blog
│   │   ├── reviews/          # Bike reviews
│   │   ├── sell/             # Sell bike wizard
│   │   └── used-bikes/       # Used bike marketplace
│   ├── components/           # React components
│   │   ├── ads/              # AdSlot (moderate advertising)
│   │   ├── common/           # Shared components (BikeCard, etc.)
│   │   ├── home/             # Homepage sections
│   │   └── layout/           # Header, Footer, Navigation
│   ├── lib/                  # Utilities, Supabase clients
│   └── types/                # TypeScript type definitions
├── supabase/
│   ├── schema.sql            # Complete database schema
│   └── seed.sql              # Demo/seed data
├── public/
│   ├── robots.txt            # SEO robots file
│   └── sitemap.xml           # XML sitemap
└── package.json
```

## 🗄️ Database Schema

30+ tables including:
- `profiles`, `brands`, `bike_models`, `bike_variants`
- `used_bike_listings`, `used_bike_images`
- `dealers`, `dealer_offers`, `dealer_leads`
- `favourites`, `saved_searches`, `notifications`
- `bike_reviews`, `articles`, `article_categories`
- `reports`, `valuation_rules`, `ad_settings`
- `site_settings`, `subscriptions`, `payments`

All tables have Row Level Security (RLS) enabled.

## 🌟 Features Implemented

### Phase 1 (MVP)
- ✅ Homepage with all sections (hero, brands, new/used bikes, offers, compare, reviews, news)
- ✅ New bike database with 12 brands, 25+ models, 20+ variants
- ✅ Used bike marketplace with filters, search, sort, grid/list views
- ✅ Used bike listing cards with Deal Score
- ✅ Sell bike wizard (11-step flow)
- ✅ User dashboard (listings, favourites, enquiries, notifications, profile)
- ✅ Admin panel (dashboard, users, listings, settings)
- ✅ Bike comparison (up to 4 bikes, specs comparison)
- ✅ Bike price guide (6 categories)
- ✅ Bike valuation calculator
- ✅ Dealer dashboard (listings, leads, offers, profile)
- ✅ Dealer offers marketplace with lead generation
- ✅ Authentication (login/register)
- ✅ Search functionality
- ✅ Mobile-first responsive design
- ✅ SEO optimized (meta tags, sitemap, robots.txt)

### Phase 2 (SEO & Content)
- ✅ Reviews page with expert/user reviews
- ✅ News/Articles page with categories
- ✅ Legal pages (About, Contact, Privacy, Terms, Cookies, Disclaimer)
- ✅ Breadcrumb navigation
- ✅ Clean URL structure
- ✅ Structured content

### Phase 3 (Advanced)
- ✅ Deal Score algorithm
- ✅ Used bike valuation formula
- ✅ Ad placeholder system (moderate, toggleable)
- ✅ Saved searches architecture
- ✅ Notifications system
- ✅ Report listing system

### Phase 4 (Future - Architecture Ready)
- 🔲 Payment integration (Razorpay placeholder)
- 🔲 Featured/Premium listings
- 🔲 Dealer subscriptions
- 🔲 Google AdSense integration
- 🔲 AI features (recommendation, valuation, duplicate detection)
- 🔲 SMS OTP verification
- 🔲 Google Maps integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (free tier)

### Setup

1. **Clone and install**
```bash
cd motobazar
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

3. **Set up database**
- Go to your Supabase project SQL Editor
- Run `supabase/schema.sql`
- Run `supabase/seed.sql` for demo data

4. **Run development server**
```bash
npm run dev
```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main marketplace homepage |
| New Bikes | `/new-bikes` | Browse new motorcycles |
| Used Bikes | `/used-bikes` | Used bike marketplace with filters |
| Sell Bike | `/sell` | Multi-step listing wizard |
| Compare | `/compare` | Compare up to 4 bikes |
| Bike Prices | `/bike-price` | Price guides by budget |
| Bike Value | `/bike-value` | Used bike valuation calculator |
| Dealer Offers | `/dealer-offers` | Dealer discounts and deals |
| Reviews | `/reviews` | Expert and user reviews |
| News | `/news` | Articles, guides, news |
| User Dashboard | `/dashboard` | Manage listings, favourites |
| Admin Panel | `/admin` | Full admin dashboard |
| Dealer Dashboard | `/dealer/dashboard` | Dealer management |
| Auth | `/auth/login` | Login / Register |

## 🔒 Security

- Row Level Security (RLS) on all tables
- Users can only edit their own data
- Role-based access (super_admin, admin, moderator, dealer, user)
- Input sanitization
- No sensitive data exposed publicly
- Listing moderation before publication

## 🎨 Design System

- Primary: `#E85D04` (MotoBazar Orange)
- Dark: `#1a1a2e`
- Accent: `#DC2F02` (Red)
- Clean, modern, mobile-first UI
- Inter + Poppins fonts
- Rounded cards, subtle shadows

## 📋 Demo Data

The seed data includes:
- 20 Indian cities
- 12 motorcycle brands
- 25+ bike models
- 20+ bike variants with specs
- 15 demo used-bike listings
- 5 demo dealer offers
- 5 articles
- 5 bike reviews

All demo data is clearly marked for development purposes.

## 📝 License

This project is built as a demonstration platform.

© MotoBazar — Buy. Sell. Compare. Ride.
