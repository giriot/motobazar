'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, Bike, Tag, DollarSign, FileText, Flag, Bell,
  BarChart3, TrendingUp, CheckCircle, XCircle, Clock,
  Eye, Edit, Trash2, MoreVertical, Search, Filter,
  Settings, Shield, Home, ChevronRight, Plus,
  MessageCircle, Heart, Star, Image, AlertTriangle,
  Database, Newspaper, ShoppingCart, ChevronDown
} from 'lucide-react'
import { cn, getStatusColor } from '@/lib/utils'

const ADMIN_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users, count: 245 },
  { id: 'listings', label: 'Listings', icon: Bike, count: 89 },
  { id: 'dealers', label: 'Dealers', icon: ShoppingCart, count: 12 },
  { id: 'offers', label: 'Dealer Offers', icon: DollarSign, count: 18 },
  { id: 'brands', label: 'Bike Brands', icon: Database },
  { id: 'models', label: 'Bike Models', icon: Tag },
  { id: 'reviews', label: 'Reviews', icon: Star, count: 34 },
  { id: 'articles', label: 'Articles', icon: Newspaper, count: 15 },
  { id: 'reports', label: 'Reports', icon: Flag, count: 3 },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'ads', label: 'Ads', icon: DollarSign },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-moto-dark text-white transform transition-transform lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-moto-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <span className="font-bold text-white">MotoBazar</span>
              <p className="text-[10px] text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-80px)]">
          {ADMIN_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setSidebarOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                activeSection === section.id
                  ? 'bg-moto-primary text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              )}
            >
              <section.icon size={18} />
              <span className="flex-1 text-left">{section.label}</span>
              {section.count && (
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  activeSection === section.id ? 'bg-white/20' : 'bg-white/10'
                )}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <Filter size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-900 capitalize">
                {activeSection === 'dashboard' ? 'Admin Dashboard' : activeSection}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-moto-primary">
                View Site →
              </Link>
              <div className="w-8 h-8 bg-moto-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          {activeSection === 'dashboard' && <AdminDashboard />}
          {activeSection === 'listings' && <AdminListings />}
          {activeSection === 'users' && <AdminUsers />}
          {activeSection === 'settings' && <AdminSettings />}
          {activeSection !== 'dashboard' && activeSection !== 'listings' && activeSection !== 'users' && activeSection !== 'settings' && (
            <GenericAdminSection section={activeSection} />
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '245', change: '+12 this week', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Listings', value: '89', change: '+5 this week', icon: Bike, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Approval', value: '7', change: 'Needs review', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Dealer Offers', value: '18', change: '+3 this week', icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
    { label: 'Enquiries', value: '156', change: '+24 this week', icon: MessageCircle, color: 'bg-pink-50 text-pink-600' },
    { label: 'Reports', value: '3', change: '2 unresolved', icon: Flag, color: 'bg-red-50 text-red-600' },
    { label: 'Articles', value: '15', change: '5 published', icon: Newspaper, color: 'bg-teal-50 text-teal-600' },
    { label: 'Dealers', value: '12', change: '2 pending', icon: ShoppingCart, color: 'bg-indigo-50 text-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.change}</p>
              </div>
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-4">Recent Listings</h3>
          <div className="space-y-3">
            {[
              { title: 'Honda Activa 4G', seller: 'Rajesh K.', status: 'pending', price: 42000 },
              { title: 'Yamaha R15 V3', seller: 'Arun S.', status: 'approved', price: 115000 },
              { title: 'RE Classic 350', seller: 'Moto Gallery', status: 'approved', price: 155000 },
              { title: 'Pulsar 220F', seller: 'Vikram P.', status: 'rejected', price: 72000 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.seller}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-moto-primary">₹{item.price.toLocaleString()}</span>
                  <span className={`badge text-[10px] ${getStatusColor(item.status)}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Brand', icon: Plus, color: 'text-blue-600 bg-blue-50' },
              { label: 'Add Model', icon: Plus, color: 'text-green-600 bg-green-50' },
              { label: 'Write Article', icon: FileText, color: 'text-purple-600 bg-purple-50' },
              { label: 'Site Settings', icon: Settings, color: 'text-gray-600 bg-gray-100' },
            ].map(action => (
              <button key={action.label} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-moto-primary hover:bg-orange-50 transition-colors text-sm">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', action.color)}>
                  <action.icon size={14} />
                </div>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminListings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search listings..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-moto-primary" />
        </div>
        <select className="select-field text-sm py-2.5 w-auto">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Sold</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left p-3 text-xs font-semibold text-gray-500">ID</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Bike</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Seller</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">City</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Price</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Views</th>
                <th className="text-right p-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '001', title: 'Honda Activa 4G', seller: 'Rajesh K.', city: 'Chennai', price: 42000, status: 'pending', views: 0 },
                { id: '002', title: 'Yamaha R15 V3', seller: 'Arun S.', city: 'Bengaluru', price: 115000, status: 'approved', views: 234 },
                { id: '003', title: 'RE Classic 350', seller: 'Moto Gallery', city: 'Coimbatore', price: 155000, status: 'approved', views: 456 },
                { id: '004', title: 'Pulsar 220F', seller: 'Vikram P.', city: 'Mumbai', price: 72000, status: 'rejected', views: 12 },
                { id: '005', title: 'Apache RTR 160', seller: 'Sanjay M.', city: 'Pune', price: 85000, status: 'pending', views: 0 },
                { id: '006', title: 'Splendor Plus', seller: 'Kumar R.', city: 'Delhi', price: 32000, status: 'sold', views: 678 },
              ].map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3 text-xs text-gray-500 font-mono">#{item.id}</td>
                  <td className="p-3">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{item.seller}</td>
                  <td className="p-3 text-sm text-gray-600">{item.city}</td>
                  <td className="p-3 text-sm font-semibold text-moto-primary">₹{item.price.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`badge text-xs ${getStatusColor(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{item.views}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-1">
                      {item.status === 'pending' && (
                        <button className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100" title="Approve">✓</button>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit size={13} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminUsers() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left p-3 text-xs font-semibold text-gray-500">User</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Email</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Role</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">City</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-semibold text-gray-500">Joined</th>
                <th className="text-right p-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'user', city: 'Chennai', verified: true, joined: '2024-01-15' },
                { name: 'Arun Suresh', email: 'arun@email.com', role: 'user', city: 'Bengaluru', verified: true, joined: '2024-01-20' },
                { name: 'Moto Gallery', email: 'info@motogallery.in', role: 'dealer', city: 'Coimbatore', verified: true, joined: '2023-12-01' },
                { name: 'Vikram Patel', email: 'vikram@email.com', role: 'user', city: 'Mumbai', verified: false, joined: '2024-02-01' },
              ].map(user => (
                <tr key={user.email} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{user.email}</td>
                  <td className="p-3"><span className={`badge text-xs ${user.role === 'dealer' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{user.role}</span></td>
                  <td className="p-3 text-sm text-gray-600">{user.city}</td>
                  <td className="p-3"><span className={`badge text-xs ${user.verified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{user.verified ? '✓ Verified' : 'Unverified'}</span></td>
                  <td className="p-3 text-sm text-gray-500">{user.joined}</td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Site Name</label>
            <input type="text" defaultValue="MotoBazar" className="input-field mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tagline</label>
            <input type="text" defaultValue="Buy. Sell. Compare. Ride." className="input-field mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Support Email</label>
            <input type="email" defaultValue="support@motobazar.com" className="input-field mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Default City</label>
            <input type="text" defaultValue="Chennai" className="input-field mt-1" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Feature Toggles</h3>
        <div className="space-y-3">
          {[
            { label: 'Registration Enabled', enabled: true },
            { label: 'Used Bike Listing Enabled', enabled: true },
            { label: 'Dealer Registration Enabled', enabled: true },
            { label: 'Analytics Enabled', enabled: false },
            { label: 'Ads Enabled', enabled: false },
            { label: 'Maintenance Mode', enabled: false },
          ].map(toggle => (
            <label key={toggle.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="text-sm font-medium text-gray-700">{toggle.label}</span>
              <div className={cn('w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer', toggle.enabled ? 'bg-moto-primary' : 'bg-gray-300')}>
                <div className={cn('w-5 h-5 bg-white rounded-full shadow transition-transform', toggle.enabled ? 'translate-x-4' : '')}></div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">SEO Title</label>
            <input type="text" defaultValue="MotoBazar - Buy & Sell New and Used Bikes in India" className="input-field mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">SEO Description</label>
            <textarea defaultValue="India's trusted motorcycle marketplace" className="input-field mt-1 h-20 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Google Analytics ID</label>
            <input type="text" placeholder="G-XXXXXXXXXX" className="input-field mt-1" />
          </div>
        </div>
      </div>

      <button className="btn-primary">Save All Settings</button>
    </div>
  )
}

function GenericAdminSection({ section }: { section: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
      <Database size={40} className="mx-auto text-gray-300 mb-3" />
      <h3 className="font-bold text-gray-900 capitalize mb-1">{section}</h3>
      <p className="text-sm text-gray-500">Manage {section} data. This section is connected to the Supabase database.</p>
      <button className="btn-outline mt-4 text-sm">
        <Plus size={14} className="mr-1" /> Add New
      </button>
    </div>
  )
}
