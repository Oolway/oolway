"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { publicRoutes } from "@/routes"

export function SessionWatcher() {
  const router = useRouter()
  const pathname = usePathname()
  const isPublicRoute = publicRoutes.has(pathname)

  // Keep track of the last time the user touched the mouse or keyboard
  const lastActivityRef = useRef<number>(0)

  useEffect(() => {
    if (isPublicRoute) return

    // Initialize activity timestamp when effect runs
    lastActivityRef.current = Date.now()

    // 1. Idle Tracking
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    // Attach lightweight listeners to track if the user is actually there
    window.addEventListener("mousemove", updateActivity, { passive: true })
    window.addEventListener("keydown", updateActivity, { passive: true })
    window.addEventListener("click", updateActivity, { passive: true })

    // 2. The Smart Poller
    const checkSession = async () => {
      // RULE A: If the tab is hidden (minimized or behind another tab), stop polling.
      if (document.visibilityState === "hidden") return

      // RULE B: If the user hasn't moved the mouse in 5 minutes, they are idle/asleep. Stop polling.
      if (Date.now() - lastActivityRef.current > 5 * 60 * 1000) return

      // If we pass the rules, the user is active. Verify the session.
      const { data: session, error } = await authClient.getSession()

      if (error || !session) {
        router.push("/login?session_expired=true")
      }
    }

    // TRIGGER 1: Check every 5 minutes ONLY IF active
    const intervalId = setInterval(checkSession, 5 * 60 * 1000)

    // TRIGGER 2: Instant check the millisecond they switch back to the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateActivity() // They are back, mark them active
        checkSession()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("mousemove", updateActivity)
      window.removeEventListener("keydown", updateActivity)
      window.removeEventListener("click", updateActivity)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [pathname, isPublicRoute, router])

  return null
}
