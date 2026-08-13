#!/bin/bash
# ============================================================
# MotoBazar — Automated Setup Script
# Run this to set up everything from scratch
# ============================================================

echo "🏍️  MotoBazar — Setting up..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --production=false

# Check for .env.local
if [ ! -f .env.local ]; then
    echo ""
    echo "⚙️  Creating .env.local from template..."
    cp .env.example .env.local
    echo ""
    echo "📝 IMPORTANT: Edit .env.local with your Supabase credentials:"
    echo "   1. Go to https://supabase.com and create a free project"
    echo "   2. Copy your Project URL and Anon Key"
    echo "   3. Update .env.local with those values"
    echo ""
    echo "   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
fi

# Check for Supabase connection
echo ""
echo "🗄️  Database Setup:"
echo "   1. Go to your Supabase project → SQL Editor"
echo "   2. Run the file: supabase/schema.sql"
echo "   3. Then run: supabase/seed.sql"
echo "   (This creates all tables and adds demo data)"
echo ""

# Build check
echo "🔨 Running build check..."
npx next build
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi

echo ""
echo "🚀 Starting development server..."
echo ""
echo "   Open: http://localhost:3000"
echo ""
echo "   Pages to try:"
echo "   • Homepage:       http://localhost:3000"
echo "   • Used Bikes:     http://localhost:3000/used-bikes"
echo "   • New Bikes:      http://localhost:3000/new-bikes"
echo "   • Sell Bike:      http://localhost:3000/sell"
echo "   • Compare:        http://localhost:3000/compare"
echo "   • Admin Panel:    http://localhost:3000/admin"
echo "   • Dashboard:      http://localhost:3000/dashboard"
echo "   • Dealer:         http://localhost:3000/dealer/dashboard"
echo ""
echo "🏍️  MotoBazar is ready! Buy. Sell. Compare. Ride."
echo ""

npm run dev
