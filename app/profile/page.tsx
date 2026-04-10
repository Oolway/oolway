import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your profile information.",
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
