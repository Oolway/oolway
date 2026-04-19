"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getConsent, setConsent } from "@/app/actions/consent"
import { CookieIcon, SettingsIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CookieBanner() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    async function check() {
      if (pathname === "/cookies") return
      const consent = await getConsent()
      if (!consent) {
        setShow(true)
        // Small delay so the element mounts before animating in
        setTimeout(() => setVisible(true), 50)
      }
    }
    check()
  }, [])

  async function save(acceptAll?: boolean) {
    await setConsent({
      analytics:
        acceptAll === true ? true : acceptAll === false ? false : analytics,
      marketing:
        acceptAll === true ? true : acceptAll === false ? false : marketing,
    })
    // Animate out first, then unmount
    setVisible(false)
    setTimeout(() => setShow(false), 300)
    window.dispatchEvent(new Event("consentUpdated"))
  }

  if (!show) return null

  return (
    <aside
      className={`
  fixed inset-x-4 bottom-4 z-50 rounded-2xl border bg-background p-4 shadow-lg
  sm:inset-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-sm
  transition-all duration-300 ease-in-out
  ${visible ? "opacity-100 translate-x-0" : "opacity-100 translate-x-[calc(100%+24px)]"}
`}
    >
      <div className="flex items-start gap-3">
        <CookieIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
        <div className="flex-1 text-sm">
          <p className="font-semibold">We value your privacy</p>
          <p className="mt-1 text-muted-foreground">
            We use cookies to enhance your experience and analyze traffic. Read
            our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full"
          onClick={() => save(false)}
          aria-label="Dismiss and reject all cookies"
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      {expanded && (
        <fieldset className="mt-4 space-y-3 rounded-xl border p-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Label htmlFor="essential" className="font-medium">
                Essential
              </Label>
              <p className="text-xs text-muted-foreground">
                Required for the site to function
              </p>
            </div>
            <Checkbox id="essential" checked disabled />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <Label htmlFor="analytics" className="font-medium">
                Analytics
              </Label>
              <p className="text-xs text-muted-foreground">
                Helps us understand how you use the site
              </p>
            </div>
            <Checkbox
              id="analytics"
              checked={analytics}
              onCheckedChange={(checked) => setAnalytics(checked === true)}
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <Label htmlFor="marketing" className="font-medium">
                Marketing
              </Label>
              <p className="text-xs text-muted-foreground">
                Used to show relevant advertisements
              </p>
            </div>
            <Checkbox
              id="marketing"
              checked={marketing}
              onCheckedChange={(checked) => setMarketing(checked === true)}
            />
          </div>
        </fieldset>
      )}

      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => save(false)}
        >
          Reject all
        </Button>

        <Button
          size="sm"
          className="flex-1"
          onClick={() => (expanded ? save() : save(true))}
        >
          {expanded ? "Save preferences" : "Accept all"}
        </Button>

        {!expanded && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpanded(true)}
            aria-label="Manage cookie preferences"
          >
            <SettingsIcon className="size-4" />
          </Button>
        )}
      </div>
    </aside>
  )
}
