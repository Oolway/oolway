"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getConsent, type Consent } from "@/app/actions/consent"

interface ConsentContextValue {
  consent: Consent | null
  updateConsent: () => Promise<void>
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  updateConsent: async () => {},
})

export function useConsent() {
  return useContext(ConsentContext)
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null)

  async function updateConsent() {
    const current = await getConsent()
    setConsent(current)
  }

  useEffect(() => {
    updateConsent()

    window.addEventListener("consentUpdated", updateConsent)
    return () => window.removeEventListener("consentUpdated", updateConsent)
  }, [])

  return (
    <ConsentContext.Provider value={{ consent, updateConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}
