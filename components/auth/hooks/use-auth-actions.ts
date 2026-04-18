"use client"

import { authClient } from "@/lib/auth/auth-client"
import { usePathname, useRouter } from "next/navigation"
import { publicRoutes } from "@/routes"
import { useAnalytics } from "@/app/hooks/use-analytics"

export function useAuthActions() {
  const pathname = usePathname()
  const router = useRouter()
  const { reset } = useAnalytics()

  async function handleSignOut() {
    reset()
    await authClient.signOut()

    if (publicRoutes.has(pathname)) {
      router.refresh()
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return { handleSignOut }
}
