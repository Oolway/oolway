import { redirect, unauthorized } from "next/navigation"
import { getServerSession } from "@/lib/auth/get-server-session"
import { ROLES } from "@/lib/auth/roles"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.admin.title,
  description: siteConfig.seo.metaData.admin.description,
}

export default async function AdminPage() {
  const session = await getServerSession()
  const user = session?.user

  if (!session || !user) {
    redirect("/login")
  }
  if (user.role !== ROLES.ADMIN) {
    unauthorized()
  }

  return <h1>Admin Dashboard</h1>
}
