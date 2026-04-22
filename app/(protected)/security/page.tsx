import { ProtectedPageTitle } from "@/app/(protected)/components/protected-page-title"
import { PasskeyManagement } from "@/app/(protected)/security/components/passkey-management"
import { LogOutEverywhereButton } from "@/app/(protected)/settings/components/log-out-everywhere-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { auth } from "@/lib/auth/auth"
import { getServerSession } from "@/lib/auth/get-server-session"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.security.title,
  description: siteConfig.seo.metaData.security.description,
}

export default async function SecurityPage() {
  const session = await getServerSession()
  const user = session?.user

  if (!session || !user) {
    redirect("/login")
  }

  const passkeys = await auth.api.listPasskeys({ headers: await headers() })

  return (
    <div className="container space-y-5">
      <ProtectedPageTitle title="Security" />
      <PasskeyManagement passkeys={passkeys} />
      <LogOutEverywhereButton />
    </div>
  )
}
