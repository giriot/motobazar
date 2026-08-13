'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bike, Heart, MessageCircle, User, Bell, Search as SearchIcon,
  Plus, Edit, Trash2, Eye, Tag, CheckCircle, XCircle, Clock,
  Settings, LogOut, BarChart3, TrendingUp
} from 'lucide-react'
import { cn, getStatusColor } from '@/lib/utils'

// Demo data for dashboard
const DEMO_LISTINGS = [
  { id: '1', title: 'Honda Activa 4G', price: 42000, status: 'approved', views: 234, enquiries: 8, date: '2024-01-15' },
  { id: '2', title: 'Yamaha FZ-S V3', price: 68000, status: 'pending', views: 0, enquiries: 0, date: '2024-02-01' },
  { id: '3', title: 'Bajaj Pulsar 150', price: 55000, status: 'sold', views: 456, enquiries: 15, date: '2023-12-10' },
]

const DEMO_NOTIFICATIONS = [
  { id: '1', type: 'listing_approved', title: 'Listing Approved', message: 'Your Honda Activa 4G listing is now live.', read: false, date: '2 hours ago' },
  { id: '2', type: 'new_enquiry', title: 'New Enquiry', message: 'Someone is interested in your Yamaha FZ-S V3.', read: false, date: '1 day ago' },
  { id: '3', type: 'listing_rejected', title: 'Listing Rejected', message: 'Please update photos for your listing.', read: true, date: '3 days ago' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('listings')

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: Bike, count: 3 },
    { id: 'favourites', label: 'Favourites', icon: Heart, count: 5 },
    { id: 'enquiries', label: 'Enquiries', icon: MessageCircle, count: 15 },
    { id: 'saved', label: 'Saved Searches', icon: SearchIcon, count: 2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 2 },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-moto-dark">My Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your listings and account</p>
            </div>
            <Link href="/sell" className="btn-primary text-sm">
              <Plus size={16} className="mr-1" /> Add Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bike size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">Total Listings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Eye size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">690</p>
                <p className="text-xs text-gray-500">Total Views</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <MessageCircle size={20} className="text-moto-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-xs text-gray-500">Enquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mb-6 bg-white rounded-xl border border-gray-100 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                activeTab === tab.id ? 'bg-moto-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count ? (
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600')}>
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-gray-100">
          {/* My Listings */}
          {activeTab === 'listings' && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Bike</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="text-center p-3 text-xs font-semibold text-gray-500 uppercase">Views</th>
                      <th className="text-center p-3 text-xs font-semibold text-gray-500 uppercase">Enquiries</th>
                      <th className="text-right p-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_LISTINGS.map(listing => (
                      <tr key={listing.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Bike size={16} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                              <p className="text-xs text-gray-500">{listing.date}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm font-semibold text-moto-primary">₹{listing.price.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className={`badge text-xs ${getStatusColor(listing.status)}`}>
                            {listing.status === 'approved' && '✓ '}{listing.status === 'rejected' && '✗ '}{listing.status === 'pending' && '⏳ '}{listing.status}
                          </span>
                        </td>
                        <td className="p-3 text-center text-sm text-gray-600">{listing.views}</td>
                        <td className="p-3 text-center text-sm text-gray-600">{listing.enquiries}</td>
                        <td className="p-3">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                              <Edit size={14} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark Sold">
                              <Tag size={14} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Favourites */}
          {activeTab === 'favourites' && (
            <div className="p-6 text-center">
              <Heart size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Your Favourites</h3>
              <p className="text-sm text-gray-500 mb-4">Bikes you&apos;ve saved will appear here</p>
              <Link href="/used-bikes" className="btn-outline text-sm">Browse Bikes</Link>
            </div>
          )}

          {/* Enquiries */}
          {activeTab === 'enquiries' && (
            <div className="p-6 text-center">
              <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Enquiries</h3>
              <p className="text-sm text-gray-500 mb-4">Messages from interested buyers will appear here</p>
            </div>
          )}

          {/* Saved Searches */}
          {activeTab === 'saved' && (
            <div className="p-6 text-center">
              <SearchIcon size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Saved Searches</h3>
              <p className="text-sm text-gray-500 mb-4">Save searches to get notified when new bikes match your criteria</p>
              <Link href="/used-bikes" className="btn-outline text-sm">Search Bikes</Link>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="divide-y divide-gray-50">
              {DEMO_NOTIFICATIONS.map(notif => (
                <div key={notif.id} className={cn('p-4 flex items-start gap-3', !notif.read && 'bg-orange-50/50')}>
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    notif.type === 'listing_approved' ? 'bg-green-100' :
                    notif.type === 'listing_rejected' ? 'bg-red-100' : 'bg-blue-100'
                  )}>
                    {notif.type === 'listing_approved' && <CheckCircle size={14} className="text-green-600" />}
                    {notif.type === 'listing_rejected' && <XCircle size={14} className="text-red-600" />}
                    {notif.type === 'new_enquiry' && <MessageCircle size={14} className="text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-moto-primary rounded-full shrink-0 mt-2"></div>}
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Demo User</h3>
                  <p className="text-sm text-gray-500">demo@motobazar.com</p>
                  <span className="badge-verified text-xs mt-1">✓ Verified</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Full Name</label>
                  <input type="text" defaultValue="Demo User" className="input-field mt-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Phone</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="input-field mt-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">City</label>
                  <input type="text" defaultValue="Chennai" className="input-field mt-1" />
                </div>
                <button className="btn-primary mt-4">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
