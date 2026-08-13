'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search, Menu, X, User, ChevronDown, Heart, MapPin,
  Home, Bike, DollarSign, Tag, GitCompare, IndianRupee,
  Star, Newspaper, Phone, LogIn, UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/new-bikes', label: 'New Bikes', icon: Bike },
  { href: '/used-bikes', label: 'Used Bikes', icon: Tag },
  { href: '/dealer-offers', label: 'Dealer Offers', icon: DollarSign },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/bike-price', label: 'Bike Prices', icon: IndianRupee },
  { href: '/reviews', label: 'Reviews', icon: Star },
  { href: '/news', label: 'News', icon: Newspaper },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  return (
    <>
      {/* Top Bar */}
      <div className="bg-moto-dark text-white text-xs">
        <div className="container-main flex items-center justify-between h-8">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> support@motobazar.com</span>
            <span>India&apos;s Trusted Motorcycle Marketplace</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/sell" className="hover:text-moto-secondary transition-colors font-semibold">
              Sell Your Bike FREE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-nav">
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <div className="w-9 h-9 bg-moto-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-display">M</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-moto-accent rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-moto-dark leading-tight">
                  Moto<span className="text-moto-primary">Bazar</span>
                </span>
                <span className="text-[10px] text-gray-500 leading-none hidden sm:block">
                  Buy. Sell. Compare. Ride.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href || pathname?.startsWith(item.href + '/')
                      ? 'text-moto-primary bg-orange-50'
                      : 'text-gray-700 hover:text-moto-primary hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-moto-primary rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Auth */}
              <Link
                href="/auth/login"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-moto-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User size={16} />
                Login
              </Link>

              {/* Sell CTA */}
              <Link
                href="/sell"
                className="btn-sell text-sm py-2 px-4 hidden sm:inline-flex"
              >
                <DollarSign size={16} className="mr-1" />
                Sell Bike
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-moto-primary rounded-lg"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-slide-down">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bike, brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-moto-primary focus:border-moto-primary outline-none text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl animate-slide-down overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-moto-dark">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg">
                <Home size={18} /> Home
              </Link>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg"
                >
                  <item.icon size={18} /> {item.label}
                </Link>
              ))}

              <hr className="my-3" />

              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg">
                <LogIn size={18} /> Login
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg">
                <UserPlus size={18} /> Register
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg">
                <User size={18} /> My Dashboard
              </Link>
              <Link href="/favourites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-gray-800 hover:text-moto-primary hover:bg-orange-50 rounded-lg">
                <Heart size={18} /> Favourites
              </Link>

              <hr className="my-3" />

              <Link
                href="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center mt-2"
              >
                Sell Your Bike FREE
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-14">
          <Link href="/" className={cn("flex flex-col items-center gap-0.5 text-xs", pathname === '/' ? 'text-moto-primary' : 'text-gray-500')}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link href="/used-bikes" className={cn("flex flex-col items-center gap-0.5 text-xs", pathname?.startsWith('/used-bikes') ? 'text-moto-primary' : 'text-gray-500')}>
            <Tag size={20} />
            <span>Used</span>
          </Link>
          <Link href="/sell" className="flex flex-col items-center gap-0.5 -mt-4">
            <div className="w-12 h-12 bg-moto-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <span className="text-[10px] text-moto-primary font-semibold">Sell</span>
          </Link>
          <Link href="/dealer-offers" className={cn("flex flex-col items-center gap-0.5 text-xs", pathname?.startsWith('/dealer-offers') ? 'text-moto-primary' : 'text-gray-500')}>
            <DollarSign size={20} />
            <span>Offers</span>
          </Link>
          <Link href="/dashboard" className={cn("flex flex-col items-center gap-0.5 text-xs", pathname?.startsWith('/dashboard') ? 'text-moto-primary' : 'text-gray-500')}>
            <User size={20} />
            <span>Account</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
