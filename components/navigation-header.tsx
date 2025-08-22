"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, LogOut, Home, Settings, Kanban } from "lucide-react"
import Link from "next/link"

interface NavigationHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backUrl?: string
}

export function NavigationHeader({ title, subtitle, showBackButton = true, backUrl }: NavigationHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl)
    } else {
      router.back()
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Home className="h-4 w-4" />
                Public View
              </Button>
            </Link>

            {user && (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Settings className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}

            {user && (
              <Link href="/kanban">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Kanban className="h-4 w-4" />
                  Kanban
                </Button>
              </Link>
            )}

            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
