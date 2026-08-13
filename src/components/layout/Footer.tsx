import Link from 'next/link'
import {
  Bike, Tag, DollarSign, GitCompare, Newspaper, Star,
  Shield, FileText, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Youtube, ChevronRight
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-moto-dark text-gray-300 pb-20 lg:pb-0">
      {/* Main Footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-moto-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white font-display">
                Moto<span className="text-moto-primary">Bazar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              India&apos;s trusted motorcycle marketplace. Buy new bikes, sell used bikes, compare models and find the best dealer offers.
            </p>
            <p className="text-xs text-gray-500">Buy. Sell. Compare. Ride.</p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-moto-primary rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-moto-primary rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-moto-primary rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-moto-primary rounded-full flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Buy Bikes */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Buy Bikes</h3>
            <ul className="space-y-2.5">
              <li><Link href="/new-bikes" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">New Bikes</Link></li>
              <li><Link href="/used-bikes" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Used Bikes</Link></li>
              <li><Link href="/used-bikes?city=chennai" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bikes in Chennai</Link></li>
              <li><Link href="/used-bikes?city=bengaluru" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bikes in Bengaluru</Link></li>
              <li><Link href="/used-bikes?city=mumbai" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bikes in Mumbai</Link></li>
              <li><Link href="/bike-price" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bike Prices</Link></li>
              <li><Link href="/compare" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Compare Bikes</Link></li>
            </ul>
          </div>

          {/* Sell & Dealer */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Sell & Dealer</h3>
            <ul className="space-y-2.5">
              <li><Link href="/sell" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors font-medium">Sell Your Bike FREE</Link></li>
              <li><Link href="/dealer-offers" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Dealer Offers</Link></li>
              <li><Link href="/bike-value" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bike Valuation</Link></li>
              <li><Link href="/dealer/register" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Register as Dealer</Link></li>
              <li><Link href="/seller-terms" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Seller Terms</Link></li>
              <li><Link href="/dealer-terms" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Dealer Terms</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link href="/reviews" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bike Reviews</Link></li>
              <li><Link href="/news" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Bike News</Link></li>
              <li><Link href="/news/best-bikes-under-1-lakh" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Best Under ₹1 Lakh</Link></li>
              <li><Link href="/news/best-scooters-daily-commuting" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Best Scooters</Link></li>
              <li><Link href="/news/used-bike-buying-guide" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Buying Guide</Link></li>
              <li><Link href="/news/how-to-transfer-bike-ownership" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Ownership Transfer</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/legal/about" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">About Us</Link></li>
              <li><Link href="/legal/contact" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Contact</Link></li>
              <li><Link href="/legal/privacy-policy" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/cookie-policy" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/legal/disclaimer" className="text-sm text-gray-400 hover:text-moto-secondary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="container-main py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MotoBazar. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            India&apos;s Motorcycle Marketplace
          </p>
        </div>
      </div>
    </footer>
  )
}
