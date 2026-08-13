'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bike, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-moto-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl font-display">M</span>
            </div>
            <span className="text-2xl font-bold text-moto-dark font-display">
              Moto<span className="text-moto-primary">Bazar</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 mt-2">Buy. Sell. Compare. Ride.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {isLogin ? 'Login to manage your listings' : 'Join MotoBazar to buy, sell and compare bikes'}
          </p>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-moto-primary" />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-moto-primary hover:text-moto-accent">
                  Forgot password?
                </Link>
              </div>
            )}

            {!isLogin && (
              <label className="flex items-start gap-2 text-xs text-gray-500">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-moto-primary" />
                I agree to the <Link href="/legal/terms" className="text-moto-primary underline">Terms of Service</Link> and <Link href="/legal/privacy-policy" className="text-moto-primary underline">Privacy Policy</Link>
              </label>
            )}

            <button className="btn-primary w-full py-3">
              {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={16} className="ml-2" />
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button className="w-full py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Continue with Email OTP
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-moto-primary font-medium hover:text-moto-accent"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-xs text-blue-700">
            <strong>Demo Mode:</strong> Authentication uses Supabase Auth. Set up your Supabase project to enable real authentication.
          </p>
        </div>
      </div>
    </div>
  )
}
