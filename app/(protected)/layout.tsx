import { Navbar } from "@/components/layout/navbar"
import { LoginModalProvider } from "@/components/auth/login-modal-provider"
import { Footer } from "@/components/layout/footer"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoginModalProvider>
      <Navbar />
      <main className="flex-1 text-foreground py-10 space-y-16 w-full max-w-6xl mx-auto">
        {children}
      </main>
      <Footer />
    </LoginModalProvider>
  )
}
