'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bike, Plus, Edit, Eye, MessageCircle, BarChart3,
  DollarSign, Settings, Upload, Tag, Users, TrendingUp,
  Calendar, MapPin, Phone, Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DealerDashboard() {
  const [tab, setTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-main py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-moto-dark">Dealer Dashboard</h1>
            <p className="text-sm text-gray-500">Demo Motors — Chennai</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dealer/offers/new" className="btn-primary text-sm">
              <Plus size={16} className="mr-1" /> New Offer
            </Link>
            <Link href="/sell" className="btn-secondary text-sm">
              <Bike size={16} className="mr-1" /> Add Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active Listings', value: '12', icon: Bike, color: 'text-blue-600 bg-blue-50' },
            { label: 'Total Leads', value: '34', icon: MessageCircle, color: 'text-green-600 bg-green-50' },
            { label: 'Active Offers', value: '5', icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
            { label: 'Profile Views', value: '890', icon: Eye, color: 'text-orange-600 bg-orange-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white rounded-xl border border-gray-100 p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'listings', label: 'My Listings', icon: Bike },
            { id: 'leads', label: 'Leads', icon: MessageCircle },
            { id: 'offers', label: 'Offers', icon: DollarSign },
            { id: 'profile', label: 'Profile', icon: Settings },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              tab === t.id ? 'bg-moto-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            )}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          {tab === 'overview' && (
            <div className="space-y-6">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New lead received', detail: 'Interested in Honda Activa 6G', time: '2 hours ago', icon: MessageCircle, color: 'text-blue-600 bg-blue-50' },
                  { action: 'Listing approved', detail: 'RE Classic 350 listing is now live', time: '1 day ago', icon: Check, color: 'text-green-600 bg-green-50' },
                  { action: 'Offer created', detail: 'Discount on TVS Jupiter 125', time: '3 days ago', icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', item.color)}>
                      <item.icon size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">💡 Upgrade Coming Soon</p>
                <p className="text-xs text-blue-600 mt-1">Dealer subscription plans with premium features will be available soon. Stay tuned!</p>
              </div>
            </div>
          )}
          {tab === 'listings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">My Listings</h3>
                <Link href="/sell" className="btn-outline text-sm"><Plus size={14} className="mr-1" /> Add New</Link>
              </div>
              {[
                { title: 'Honda Activa 6G (2022)', status: 'approved', views: 234, leads: 8 },
                { title: 'RE Classic 350 (2021)', status: 'approved', views: 456, leads: 12 },
                { title: 'TVS Apache RTR (2023)', status: 'pending', views: 0, leads: 0 },
              ].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Bike size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{l.title}</p>
                      <p className="text-xs text-gray-500">{l.views} views • {l.leads} leads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge text-xs ${l.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{l.status}</span>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'leads' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Lead Management</h3>
              {[
                { name: 'Rajesh K.', phone: '+91 98XXX XX123', bike: 'Honda Activa 6G', message: 'Is this available?', status: 'new', date: '2 hours ago' },
                { name: 'Priya S.', phone: '+91 87XXX XX456', bike: 'RE Classic 350', message: 'Can I get a test ride?', status: 'contacted', date: '1 day ago' },
              ].map((lead, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Interested in: {lead.bike}</p>
                      <p className="text-sm text-gray-600 mt-1">{lead.message}</p>
                    </div>
                    <span className={`badge text-xs ${lead.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>{lead.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{lead.date}</span>
                    <button className="btn-outline text-xs py-1.5 px-3">Contact</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'offers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Dealer Offers</h3>
                <Link href="/dealer/offers/new" className="btn-primary text-sm"><Plus size={14} className="mr-1" /> New Offer</Link>
              </div>
              {[
                { bike: 'Honda Activa 6G', offer: '₹74,000', discount: '5.7%', valid: '31 Mar 2024', leads: 8 },
                { bike: 'TVS Jupiter 125', offer: '₹78,500', discount: '4.2%', valid: '30 Apr 2024', leads: 3 },
              ].map((offer, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{offer.bike}</p>
                      <p className="text-sm text-moto-primary font-bold">{offer.offer} <span className="text-xs text-green-600 ml-1">{offer.discount} OFF</span></p>
                      <p className="text-xs text-gray-500 mt-0.5">Valid till {offer.valid} • {offer.leads} leads</p>
                    </div>
                    <button className="btn-outline text-xs py-1.5 px-3">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Dealer Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-gray-500">Dealer Name</label><input defaultValue="Demo Motors" className="input-field mt-1" /></div>
                <div><label className="text-xs text-gray-500">City</label><input defaultValue="Chennai" className="input-field mt-1" /></div>
                <div><label className="text-xs text-gray-500">Phone</label><input defaultValue="+91 98765 43210" className="input-field mt-1" /></div>
                <div><label className="text-xs text-gray-500">Email</label><input defaultValue="demo@demomotors.in" className="input-field mt-1" /></div>
                <div className="md:col-span-2"><label className="text-xs text-gray-500">Description</label><textarea defaultValue="Leading motorcycle dealer in Chennai" className="input-field mt-1 h-20 resize-none" /></div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">✓ Verified Dealer</p>
                <p className="text-xs text-green-600">Your dealer account has been verified by our team.</p>
              </div>
              <button className="btn-primary">Save Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Check({ size = 14 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> }
