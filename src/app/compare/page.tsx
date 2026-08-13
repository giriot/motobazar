'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, GitCompare, Star, Check, X, Bike, ArrowRight } from 'lucide-react'

const COMPARABLE_BIKES = [
  { name: 'Honda Activa 6G', brand: 'honda', price: 76000, engine: '109.5cc', power: '7.8 BHP', torque: '8.9 Nm', mileage: 60, weight: 107, seat: 692, fuel: 5.3, abs: 'None', topSpeed: 85, brakes: 'Drum/Drum' },
  { name: 'TVS Jupiter 125', brand: 'tvs', price: 75000, engine: '124.8cc', power: '8.0 BHP', torque: '10.5 Nm', mileage: 55, weight: 108, seat: 695, fuel: 6.5, abs: 'None', topSpeed: 88, brakes: 'Drum/Drum' },
  { name: 'Suzuki Access 125', brand: 'suzuki', price: 80000, engine: '124cc', power: '8.5 BHP', torque: '10 Nm', mileage: 53, weight: 106, seat: 690, fuel: 5.5, abs: 'None', topSpeed: 90, brakes: 'Drum/Drum' },
  { name: 'Royal Enfield Classic 350', brand: 'royal-enfield', price: 193000, engine: '349cc', power: '20.2 BHP', torque: '27 Nm', mileage: 35, weight: 195, seat: 805, fuel: 13, abs: 'Single Channel', topSpeed: 120, brakes: 'Disc/Drum' },
  { name: 'Royal Enfield Meteor 350', brand: 'royal-enfield', price: 210000, engine: '349cc', power: '20.2 BHP', torque: '27 Nm', mileage: 35, weight: 197, seat: 770, fuel: 15, abs: 'Dual Channel', topSpeed: 120, brakes: 'Disc/Drum' },
  { name: 'Yamaha MT-15 V2', brand: 'yamaha', price: 168000, engine: '155cc', power: '18.2 BHP', torque: '14.7 Nm', mileage: 48, weight: 139, seat: 810, fuel: 10.4, abs: 'Single Channel', topSpeed: 130, brakes: 'Disc/Disc' },
  { name: 'TVS Apache RTR 160 4V', brand: 'tvs', price: 120000, engine: '159cc', power: '16.3 BHP', torque: '14.8 Nm', mileage: 45, weight: 140, seat: 785, fuel: 12, abs: 'Single Channel', topSpeed: 120, brakes: 'Disc/Drum' },
  { name: 'KTM Duke 200', brand: 'ktm', price: 196000, engine: '199.5cc', power: '25 BHP', torque: '19.2 Nm', mileage: 40, weight: 159, seat: 820, fuel: 13.4, abs: 'Dual Channel', topSpeed: 136, brakes: 'Disc/Disc' },
  { name: 'Bajaj Pulsar 150', brand: 'bajaj', price: 105000, engine: '149.5cc', power: '13.8 BHP', torque: '13.4 Nm', mileage: 50, weight: 145, seat: 795, fuel: 14, abs: 'Single Channel', topSpeed: 115, brakes: 'Drum/Disc' },
  { name: 'Hero Splendor Plus', brand: 'hero', price: 74000, engine: '97.2cc', power: '7.9 BHP', torque: '8.1 Nm', mileage: 80, weight: 112, seat: 795, fuel: 9.7, abs: 'None', topSpeed: 85, brakes: 'Drum/Drum' },
]

interface SelectedBike {
  name: string
  brand: string
  price: number
  engine: string
  power: string
  torque: string
  mileage: number
  weight: number
  seat: number
  fuel: number
  abs: string
  topSpeed: number
  brakes: string
}

export default function ComparePage() {
  const [selectedBikes, setSelectedBikes] = useState<SelectedBike[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const addBike = (bike: SelectedBike) => {
    if (selectedBikes.length < 4 && !selectedBikes.find(b => b.name === bike.name)) {
      setSelectedBikes([...selectedBikes, bike])
    }
  }

  const removeBike = (index: number) => {
    setSelectedBikes(selectedBikes.filter((_, i) => i !== index))
  }

  const availableBikes = COMPARABLE_BIKES.filter(b =>
    !selectedBikes.find(sb => sb.name === b.name) &&
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const specs = [
    { label: 'Price (Ex-showroom)', key: 'price', format: (v: any) => `₹${v.toLocaleString('en-IN')}`, best: 'min' },
    { label: 'Engine', key: 'engine', best: null },
    { label: 'Power', key: 'power', best: 'max' },
    { label: 'Torque', key: 'torque', best: 'max' },
    { label: 'Mileage (kmpl)', key: 'mileage', format: (v: any) => `${v} kmpl`, best: 'max' },
    { label: 'Weight (kg)', key: 'weight', format: (v: any) => `${v} kg`, best: 'min' },
    { label: 'Seat Height (mm)', key: 'seat', format: (v: any) => `${v} mm`, best: null },
    { label: 'Fuel Capacity (L)', key: 'fuel', format: (v: any) => `${v} L`, best: 'max' },
    { label: 'ABS', key: 'abs', best: null },
    { label: 'Brakes', key: 'brakes', best: null },
    { label: 'Top Speed (km/h)', key: 'topSpeed', format: (v: any) => `${v} km/h`, best: 'max' },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-moto-primary">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Compare Bikes</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-moto-dark font-display">
            Compare Bikes Side by Side
          </h1>
          <p className="text-gray-600 mt-1">Compare up to 4 bikes on price, specs, mileage and features</p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Bike Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="relative">
              {selectedBikes[i] ? (
                <div className="card p-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Bike size={24} className="text-gray-400" />
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{selectedBikes[i].name}</p>
                  <p className="text-xs text-moto-primary font-medium mt-1">₹{selectedBikes[i].price.toLocaleString('en-IN')}</p>
                  <button onClick={() => removeBike(i)} className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="card p-4 text-center border-dashed">
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl text-gray-300">+</span>
                  </div>
                  <p className="text-sm text-gray-500">Add Bike</p>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={i === 0 ? searchTerm : ''}
                      onChange={(e) => { setSearchTerm(e.target.value) }}
                      onFocus={() => setSearchTerm('')}
                      className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-moto-primary"
                    />
                    {searchTerm && i === 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                        {availableBikes.slice(0, 6).map(bike => (
                          <button
                            key={bike.name}
                            onClick={() => { addBike(bike); setSearchTerm('') }}
                            className="w-full px-3 py-2 text-left text-xs hover:bg-orange-50 hover:text-moto-primary transition-colors"
                          >
                            {bike.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedBikes.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 text-sm font-semibold text-gray-600 border-b">Specification</th>
                  {selectedBikes.map((bike, i) => (
                    <th key={i} className="text-center p-3 text-sm font-semibold text-gray-900 border-b">
                      {bike.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map(spec => {
                  const values = selectedBikes.map(b => (b as any)[spec.key])
                  const numValues = values.map(v => typeof v === 'number' ? v : parseFloat(String(v)))
                  let bestIdx = -1
                  if (spec.best === 'max') bestIdx = numValues.indexOf(Math.max(...numValues.filter(v => !isNaN(v))))
                  if (spec.best === 'min') bestIdx = numValues.indexOf(Math.min(...numValues.filter(v => !isNaN(v))))

                  return (
                    <tr key={spec.key} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-sm font-medium text-gray-700">{spec.label}</td>
                      {selectedBikes.map((bike, i) => {
                        const val = (bike as any)[spec.key]
                        const displayVal = spec.format ? spec.format(val) : val
                        const isBest = i === bestIdx
                        return (
                          <td key={i} className={`p-3 text-center text-sm ${isBest ? 'text-green-600 font-bold' : 'text-gray-700'}`}>
                            {displayVal}
                            {isBest && <span className="ml-1 text-[10px] bg-green-50 px-1.5 py-0.5 rounded">BEST</span>}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {selectedBikes.length < 2 && (
          <div className="text-center py-16">
            <GitCompare size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select at least 2 bikes to compare</h3>
            <p className="text-gray-500">Use the search boxes above to add bikes for comparison</p>
          </div>
        )}
      </div>
    </div>
  )
}
