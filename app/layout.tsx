import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.metaData.home.title,
    template: `%s | ${siteConfig.metaData.home.title}`,
  },
  description: siteConfig.metaData.home.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
