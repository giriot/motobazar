'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Newspaper, Clock, User, Tag, ArrowRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Bike News', 'Buying Guides', 'Price Guide', 'Tips & Guides', 'Comparison']

const ARTICLES = [
  { id: '1', title: 'Best Bikes Under ₹1 Lakh in 2024', category: 'Price Guide', author: 'MotoBazar Editorial', date: '2 days ago', featured: true,
    excerpt: 'Top motorcycles you can buy with a budget of ₹1 lakh. Including Honda SP 125, TVS Apache RTR 160 4V and more.',
    slug: 'best-bikes-under-1-lakh' },
  { id: '2', title: 'Used Bike Buying Guide: What to Check Before You Buy', category: 'Buying Guides', author: 'MotoBazar Editorial', date: '5 days ago', featured: true,
    excerpt: 'Complete checklist for buying a used motorcycle. Check engine, RC, documents, body condition and more.',
    slug: 'used-bike-buying-guide' },
  { id: '3', title: 'Classic 350 vs Meteor 350: Which Should You Buy?', category: 'Comparison', author: 'MotoBazar Editorial', date: '1 week ago', featured: false,
    excerpt: 'Both share the same J-platform 349cc engine but serve very different purposes. Which one is right for you?',
    slug: 'classic-350-vs-meteor-350' },
  { id: '4', title: 'How to Transfer Bike Ownership in India', category: 'Tips & Guides', author: 'MotoBazar Editorial', date: '1 week ago', featured: false,
    excerpt: 'Step-by-step guide to transferring motorcycle ownership. Documents required, RTO process and fees.',
    slug: 'how-to-transfer-bike-ownership' },
  { id: '5', title: 'Top 5 Scooters for Daily Commuting in 2024', category: 'Buying Guides', author: 'MotoBazar Editorial', date: '2 weeks ago', featured: true,
    excerpt: 'Best scooters for Indian city riding. Honda Activa, TVS Jupiter and Suzuki Access lead the pack.',
    slug: 'best-scooters-daily-commuting' },
]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory)

  const featuredArticles = ARTICLES.filter(a => a.featured)

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Bike News & Articles</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Bike News & Articles
          </h1>
          <p className="text-gray-600 mt-1">Latest motorcycle news, reviews, buying guides and tips</p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors',
                activeCategory === cat ? 'bg-moto-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {activeCategory === 'All' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {featuredArticles.map(article => (
              <Link key={article.id} href={`/news/${article.slug}`} className="card group">
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <Newspaper size={36} className="text-gray-300" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-moto-primary font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 group-hover:text-moto-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs text-moto-primary font-medium flex items-center gap-1">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* All Articles */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {activeCategory === 'All' ? 'All Articles' : activeCategory}
        </h2>
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <Link key={article.id} href={`/news/${article.slug}`} className="card flex flex-col sm:flex-row group">
              <div className="w-full sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shrink-0">
                <Newspaper size={28} className="text-gray-300" />
              </div>
              <div className="p-4 flex-1">
                <span className="text-xs text-moto-primary font-medium">{article.category}</span>
                <h3 className="font-bold text-gray-900 mt-1 group-hover:text-moto-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><User size={11} />{article.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
