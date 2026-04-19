import type { Metadata } from "next"
import "./globals.css"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "react-hot-toast"
import { SessionWatcher } from "@/lib/auth/session-watcher"
import { PostHogProvider } from "@/components/providers/posthog-provider"
import { ConsentProvider } from "@/components/providers/consent-provider"
import { CookieBanner } from "@/components/cookies/cookie-banner"

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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ConsentProvider>
          <PostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                {siteConfig.enableSessionWatcher && <SessionWatcher />}
                {children}
                <Toaster position="top-right" />
                <CookieBanner />
              </TooltipProvider>
            </ThemeProvider>
          </PostHogProvider>
        </ConsentProvider>
      </body>
    </html>
  )
}
