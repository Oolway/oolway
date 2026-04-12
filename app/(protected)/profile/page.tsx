import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.metaData.profile.title,
  description: siteConfig.metaData.profile.description,
}

export default function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
      </CardHeader>
      <CardContent>
        <h2>body</h2>
        {/* <PasskeyManagement passkeys={passkeys} /> */}
      </CardContent>
    </Card>
  )
}
