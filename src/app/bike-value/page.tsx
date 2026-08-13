'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, BarChart3, Bike, Calculator, AlertTriangle, TrendingDown } from 'lucide-react'
import { cn, formatPrice, calculateEstimatedValue } from '@/lib/utils'

const BRANDS_MODELS: Record<string, string[]> = {
  'Honda': ['Activa 6G', 'SP 125', 'Unicorn', 'Shine', 'CB350'],
  'Yamaha': ['MT-15 V2', 'R15 V4', 'FZ-S V4'],
  'Royal Enfield': ['Classic 350', 'Meteor 350', 'Hunter 350', 'Himalayan 450'],
  'TVS': ['Jupiter 125', 'Apache RTR 160 4V', 'Apache RTR 200 4V'],
  'Bajaj': ['Pulsar 150', 'Pulsar NS200', 'Dominar 400'],
  'Hero': ['Splendor Plus', 'Xtreme 160R', 'Xpulse 200'],
  'Suzuki': ['Gixxer SF 250', 'Access 125'],
  'KTM': ['Duke 200', 'Duke 390', 'RC 200'],
}

const EX_SHOWROOM_PRICES: Record<string, number> = {
  'Activa 6G': 76000, 'SP 125': 85000, 'Unicorn': 110000, 'Shine': 78000, 'CB350': 210000,
  'MT-15 V2': 168000, 'R15 V4': 182000, 'FZ-S V4': 125000,
  'Classic 350': 193000, 'Meteor 350': 210000, 'Hunter 350': 149000, 'Himalayan 450': 285000,
  'Jupiter 125': 75000, 'Apache RTR 160 4V': 120000, 'Apache RTR 200 4V': 145000,
  'Pulsar 150': 105000, 'Pulsar NS200': 156000, 'Dominar 400': 220000,
  'Splendor Plus': 74000, 'Xtreme 160R': 114000, 'Xpulse 200': 136000,
  'Gixxer SF 250': 193000, 'Access 125': 80000,
  'Duke 200': 196000, 'Duke 390': 312000, 'RC 200': 210000,
}

export default function BikeValuePage() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [km, setKm] = useState('')
  const [owners, setOwners] = useState('1')
  const [condition, setCondition] = useState('')
  const [city, setCity] = useState('')
  const [insurance, setInsurance] = useState(false)
  const [serviceHistory, setServiceHistory] = useState(false)
  const [calculated, setCalculated] = useState<{ min: number; max: number } | null>(null)

  const handleCalculate = () => {
    if (!brand || !model || !year || !km || !condition) return
    const exShowroom = EX_SHOWROOM_PRICES[model] || 100000
    const result = calculateEstimatedValue(
      exShowroom, parseInt(year), parseInt(km), parseInt(owners),
      condition.toLowerCase(), insurance, serviceHistory
    )
    setCalculated(result)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Bike Valuation</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Used Bike Value Calculator
          </h1>
          <p className="text-gray-600 mt-1">Get an estimated market value for your bike</p>
        </div>
      </div>

      <div className="container-main py-8 max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="space-y-5">
            {/* Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel('') }} className="select-field">
                  <option value="">Select Brand</option>
                  {Object.keys(BRANDS_MODELS).map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                <select value={model} onChange={(e) => setModel(e.target.value)} className="select-field" disabled={!brand}>
                  <option value="">Select Model</option>
                  {(BRANDS_MODELS[brand] || []).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Year & KM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Year *</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="select-field">
                  <option value="">Select Year</option>
                  {Array.from({ length: 20 }, (_, i) => 2024 - i).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KM Driven *</label>
                <input type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="e.g., 25000" className="input-field" />
              </div>
            </div>

            {/* Owners & Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Owners *</label>
                <select value={owners} onChange={(e) => setOwners(e.target.value)} className="select-field">
                  <option value="1">1st Owner</option>
                  <option value="2">2nd Owner</option>
                  <option value="3">3rd Owner</option>
                  <option value="4">4th Owner+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} className="select-field">
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="select-field">
                <option value="">Select City</option>
                <option value="Chennai">Chennai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Insurance & Service */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                Insurance Valid
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={serviceHistory} onChange={(e) => setServiceHistory(e.target.checked)} className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary" />
                Service History Available
              </label>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!brand || !model || !year || !km || !condition}
              className={cn(
                'w-full py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2',
                brand && model && year && km && condition
                  ? 'bg-moto-primary text-white hover:bg-moto-accent'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              <Calculator size={18} />
              Calculate Estimated Value
            </button>
          </div>

          {/* Result */}
          {calculated && (
            <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-moto-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 size={24} className="text-moto-primary" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Estimated MotoBazar Market Range
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-moto-primary mt-2">
                  {formatPrice(calculated.min)} – {formatPrice(calculated.max)}
                </p>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 flex items-center justify-center gap-1">
                    <AlertTriangle size={12} />
                    This is an estimate. Actual selling price may vary based on condition, location and demand.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
