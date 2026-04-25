import { unauthorized } from "next/navigation"
import { getServerSession } from "@/lib/auth/get-server-session"
import { ROLES } from "@/lib/auth/roles"

export default async function NewPostPage() {
  const session = await getServerSession()

  if (session?.user?.role !== ROLES.ADMIN) {
    unauthorized()
  }

  // Tiptap editor here
}
