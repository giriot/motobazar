'use client'

interface AdSlotProps {
  placement: string
  className?: string
}

/**
 * AdSlot Component
 * 
 * Placeholder for Google AdSense integration.
 * Currently ads are DISABLED by default.
 * 
 * To enable:
 * 1. Admin enables ads in site settings
 * 2. Add AdSense publisher ID
 * 3. Configure placement settings
 * 
 * ADVERTISING POLICY:
 * - Ads should NEVER dominate the content
 * - Ads should NEVER be placed inside buttons or navigation
 * - Ads should NEVER be placed over seller contact areas
 * - Ads should NEVER look like listings
 * - Maximum: moderate frequency only
 */
export default function AdSlot({ placement, className = '' }: AdSlotProps) {
  // Ads are disabled by default - controlled by admin settings
  const adsEnabled = false // TODO: Read from site_settings table

  if (!adsEnabled) {
    return null
  }

  // When enabled, show a clearly marked advertisement placeholder
  return (
    <div className={`my-6 ${className}`}>
      <div className="container-main">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Advertisement</p>
          <div className="h-20 md:h-24 flex items-center justify-center">
            <p className="text-sm text-gray-400">
              {/* This space will show Google AdSense when enabled */}
              Ad Slot: {placement}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
