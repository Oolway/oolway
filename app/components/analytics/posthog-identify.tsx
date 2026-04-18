"use client"

import { useAnalytics } from "@/app/hooks/use-analytics"
import { useEffect } from "react"

interface PostHogIdentifyProps {
  userId: string
  email?: string | null
  name?: string | null
}

export function PostHogIdentify({ userId, email, name }: PostHogIdentifyProps) {
  const { identify } = useAnalytics()

  useEffect(() => {
    identify(userId, { email, name })
  }, [userId])

  return null
}
