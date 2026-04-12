import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.metaData.dashboard.title,
  description: siteConfig.metaData.dashboard.description,
}

export default function DashboardPage() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  )
}
