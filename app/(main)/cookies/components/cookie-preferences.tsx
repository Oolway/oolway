"use client"

import { useEffect, useState } from "react"
import { getConsent, setConsent } from "@/app/actions/consent"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const consent = await getConsent()
      if (consent) {
        setAnalytics(consent.analytics)
        setMarketing(consent.marketing)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave() {
    await setConsent({ analytics, marketing })
    window.dispatchEvent(new Event("consentUpdated"))
    toast.success("Cookie preferences saved.")
  }

  if (loading) return null

  return (
    <div className="rounded-2xl border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Manage Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your cookie preferences at any time. Changes take effect
          immediately.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="essential-pref" className="font-medium">
              Essential
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Required for the site to function. Cannot be disabled.
            </p>
          </div>
          <Checkbox id="essential-pref" checked disabled />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="analytics-pref" className="font-medium">
              Analytics
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Helps us understand how you use the site. We use PostHog for
              analytics.
            </p>
          </div>
          <Checkbox
            id="analytics-pref"
            checked={analytics}
            onCheckedChange={(checked) => setAnalytics(checked === true)}
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="marketing-pref" className="font-medium">
              Marketing
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Used to show relevant advertisements and track their performance.
            </p>
          </div>
          <Checkbox
            id="marketing-pref"
            checked={marketing}
            onCheckedChange={(checked) => setMarketing(checked === true)}
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save preferences
      </Button>
    </div>
  )
}
