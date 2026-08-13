'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, ChevronLeft, Check, Bike, Camera, MapPin,
  DollarSign, Calendar, Gauge, Upload, AlertCircle, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, title: 'Brand', icon: Bike },
  { id: 2, title: 'Model', icon: Bike },
  { id: 3, title: 'Year', icon: Calendar },
  { id: 4, title: 'KM Driven', icon: Gauge },
  { id: 5, title: 'Owners', icon: CheckCircle },
  { id: 6, title: 'Condition', icon: CheckCircle },
  { id: 7, title: 'Price', icon: DollarSign },
  { id: 8, title: 'Location', icon: MapPin },
  { id: 9, title: 'Photos', icon: Camera },
  { id: 10, title: 'Details', icon: CheckCircle },
  { id: 11, title: 'Review', icon: Check },
]

const BRANDS = ['Honda', 'Yamaha', 'Royal Enfield', 'TVS', 'Bajaj', 'Hero', 'Suzuki', 'KTM', 'Jawa', 'BMW', 'Triumph', 'Kawasaki']
const MODELS: Record<string, string[]> = {
  'Honda': ['Activa 6G', 'SP 125', 'Unicorn', 'Shine', 'CB350'],
  'Yamaha': ['MT-15 V2', 'R15 V4', 'FZ-S V4'],
  'Royal Enfield': ['Classic 350', 'Meteor 350', 'Hunter 350', 'Himalayan 450'],
  'TVS': ['Jupiter 125', 'Apache RTR 160 4V', 'Apache RTR 200 4V'],
  'Bajaj': ['Pulsar 150', 'Pulsar NS200', 'Dominar 400'],
  'Hero': ['Splendor Plus', 'Xtreme 160R', 'Xpulse 200'],
  'Suzuki': ['Gixxer SF 250', 'Access 125'],
  'KTM': ['Duke 200', 'Duke 390', 'RC 200'],
  'Jawa': ['Jawa 42', 'Jawa Standard'],
  'BMW': ['G 310 R', 'G 310 GS'],
  'Triumph': ['Street Triple', 'Speed 400'],
  'Kawasaki': ['Ninja 300', 'Z900'],
}
const YEARS = Array.from({ length: 20 }, (_, i) => 2024 - i)
const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Needs Repair']

export default function SellBikePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    km: '',
    owners: '1',
    condition: '',
    price: '',
    city: '',
    description: '',
    insurance: false,
    serviceHistory: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.brand
      case 2: return !!formData.model
      case 3: return !!formData.year
      case 4: return !!formData.km
      case 5: return !!formData.owners
      case 6: return !!formData.condition
      case 7: return !!formData.price
      case 8: return !!formData.city
      case 9: return true // photos optional at this stage
      case 10: return true
      default: return true
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your listing has been submitted for admin approval. You will be notified once it&apos;s reviewed.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800 font-medium">Status: Pending Review</p>
            <p className="text-xs text-yellow-600 mt-1">Our team will review your listing within 24-48 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="btn-primary flex-1">View Dashboard</Link>
            <Link href="/" className="btn-secondary flex-1">Go Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-moto-dark">Sell Your Bike FREE</h1>
            <p className="text-sm text-gray-500 hidden sm:block">Step {currentStep} of {STEPS.length}</p>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-1 mt-3">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i + 1 <= currentStep ? 'bg-moto-primary' : 'bg-gray-200'
                )}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">{STEPS[currentStep - 1]?.title}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="container-main py-8 max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          {/* Step 1: Brand */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Select Brand</h2>
              <p className="text-sm text-gray-500 mb-6">Choose the brand of your bike</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => updateField('brand', brand)}
                    className={cn(
                      'p-4 border rounded-xl text-sm font-medium transition-all text-center',
                      formData.brand === brand
                        ? 'border-moto-primary bg-orange-50 text-moto-primary ring-2 ring-moto-primary/20'
                        : 'border-gray-200 hover:border-moto-primary/50 text-gray-700'
                    )}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Model */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Select Model</h2>
              <p className="text-sm text-gray-500 mb-6">Choose the model of your {formData.brand}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(MODELS[formData.brand] || []).map(model => (
                  <button
                    key={model}
                    onClick={() => updateField('model', model)}
                    className={cn(
                      'p-4 border rounded-xl text-sm font-medium transition-all text-left',
                      formData.model === model
                        ? 'border-moto-primary bg-orange-50 text-moto-primary ring-2 ring-moto-primary/20'
                        : 'border-gray-200 hover:border-moto-primary/50 text-gray-700'
                    )}
                  >
                    {model}
                  </button>
                ))}
              </div>
              {!(MODELS[formData.brand] || []).length && (
                <p className="text-sm text-gray-500 italic">Please go back and select a brand first.</p>
              )}
            </div>
          )}

          {/* Step 3: Year */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Registration Year</h2>
              <p className="text-sm text-gray-500 mb-6">When was your bike first registered?</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {YEARS.map(year => (
                  <button
                    key={year}
                    onClick={() => updateField('year', year.toString())}
                    className={cn(
                      'p-3 border rounded-xl text-sm font-medium transition-all',
                      formData.year === year.toString()
                        ? 'border-moto-primary bg-orange-50 text-moto-primary ring-2 ring-moto-primary/20'
                        : 'border-gray-200 hover:border-moto-primary/50 text-gray-700'
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: KM Driven */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">KM Driven</h2>
              <p className="text-sm text-gray-500 mb-6">How many kilometers has your bike been driven?</p>
              <input
                type="number"
                placeholder="e.g., 25000"
                value={formData.km}
                onChange={(e) => updateField('km', e.target.value)}
                className="input-field text-lg"
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {['Under 5,000', '5K - 15K', '15K - 30K', '30K - 50K', '50K+'].map(km => (
                  <button key={km} className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-moto-primary hover:text-moto-primary">
                    {km}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Owners */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Number of Owners</h2>
              <p className="text-sm text-gray-500 mb-6">How many owners has this bike had (including you)?</p>
              <div className="grid grid-cols-4 gap-3">
                {['1', '2', '3', '4+'].map(owners => (
                  <button
                    key={owners}
                    onClick={() => updateField('owners', owners)}
                    className={cn(
                      'p-4 border rounded-xl text-sm font-medium transition-all text-center',
                      formData.owners === owners
                        ? 'border-moto-primary bg-orange-50 text-moto-primary ring-2 ring-moto-primary/20'
                        : 'border-gray-200 hover:border-moto-primary/50 text-gray-700'
                    )}
                  >
                    {owners}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Condition */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Bike Condition</h2>
              <p className="text-sm text-gray-500 mb-6">How would you rate the overall condition?</p>
              <div className="space-y-3">
                {CONDITIONS.map(condition => (
                  <button
                    key={condition}
                    onClick={() => updateField('condition', condition)}
                    className={cn(
                      'w-full p-4 border rounded-xl text-left transition-all',
                      formData.condition === condition
                        ? 'border-moto-primary bg-orange-50 ring-2 ring-moto-primary/20'
                        : 'border-gray-200 hover:border-moto-primary/50'
                    )}
                  >
                    <p className="font-medium text-gray-900">{condition}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {condition === 'Excellent' && 'Like new, no scratches or dents, well maintained'}
                      {condition === 'Good' && 'Minor wear, mechanically sound, regular maintenance'}
                      {condition === 'Fair' && 'Visible wear, may need minor repairs'}
                      {condition === 'Needs Repair' && 'Major mechanical or cosmetic issues'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Price */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Expected Price</h2>
              <p className="text-sm text-gray-500 mb-6">What price are you expecting for your bike?</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                <input
                  type="number"
                  placeholder="e.g., 65000"
                  value={formData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  className="input-field text-lg pl-8"
                />
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">💡 Tip: Price it competitively</p>
                <p className="text-xs text-blue-600 mt-1">Bikes priced within the market range sell 3x faster. Use our <Link href="/bike-value" className="underline">valuation tool</Link> for guidance.</p>
              </div>
            </div>
          )}

          {/* Step 8: Location */}
          {currentStep === 8 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Location</h2>
              <p className="text-sm text-gray-500 mb-6">Where is your bike located?</p>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="input-field pl-11"
                >
                  <option value="">Select City</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Locality (optional)"
                className="input-field mt-3"
              />
            </div>
          )}

          {/* Step 9: Photos */}
          {currentStep === 9 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Upload Photos</h2>
              <p className="text-sm text-gray-500 mb-6">Upload 5-15 clear photos of your bike. Good photos sell faster!</p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-moto-primary transition-colors">
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-700">Click or drag photos here</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP • Max 5MB each • 5-15 photos recommended</p>
                <button className="btn-outline mt-4 text-sm">
                  <Camera size={16} className="mr-2" />
                  Choose Photos
                </button>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Photos will be reviewed before your listing goes live.
                </p>
              </div>
            </div>
          )}

          {/* Step 10: Details */}
          {currentStep === 10 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Additional Details</h2>
              <p className="text-sm text-gray-500 mb-6">Tell buyers more about your bike</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Describe your bike's condition, modifications, maintenance history..."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="input-field h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.insurance}
                      onChange={(e) => updateField('insurance', e.target.checked)}
                      className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary"
                    />
                    Insurance Valid
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.serviceHistory}
                      onChange={(e) => updateField('serviceHistory', e.target.checked)}
                      className="rounded border-gray-300 text-moto-primary focus:ring-moto-primary"
                    />
                    Service History Available
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 11: Review */}
          {currentStep === 11 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Review Your Listing</h2>
              <p className="text-sm text-gray-500 mb-6">Check all details before submitting</p>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bike</span>
                  <span className="font-medium text-gray-900">{formData.brand} {formData.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Year</span>
                  <span className="font-medium text-gray-900">{formData.year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">KM Driven</span>
                  <span className="font-medium text-gray-900">{formData.km} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Owners</span>
                  <span className="font-medium text-gray-900">{formData.owners}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Condition</span>
                  <span className="font-medium text-gray-900">{formData.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="font-bold text-moto-primary">₹{formData.price ? parseInt(formData.price).toLocaleString('en-IN') : '0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">City</span>
                  <span className="font-medium text-gray-900">{formData.city || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-medium text-gray-900">{formData.insurance ? 'Valid' : 'Not specified'}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  By submitting, you agree to our <Link href="/legal/seller-terms" className="underline">seller terms</Link>. Your listing will be reviewed by our team before going live.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                currentStep === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={cn(
                  'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                  canProceed()
                    ? 'bg-moto-primary text-white hover:bg-moto-accent'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                )}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                Submit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
