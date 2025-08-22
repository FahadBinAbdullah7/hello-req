"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketIcon, CheckCircle, Clock, Users, LogIn, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalTickets: number
  ticketsSolved: number
  workInProgress: number
  pendingReview: number
  activeTeams: number
  avgResolutionTime: string
}

export default function PublicDashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalTickets: 0,
    ticketsSolved: 0,
    workInProgress: 0,
    pendingReview: 0,
    activeTeams: 44,
    avgResolutionTime: "2.3 days",
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard")
        const data = await response.json()

        if (data.success) {
          setDashboardStats(data.stats)
        } else {
          console.error("Failed to fetch dashboard data:", data.message)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <div className="text-center glass-effect p-8 rounded-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <header className="border-b border-border/50 bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Operations Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground">Real-time ticket statistics and team performance</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/create-ticket">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 bg-transparent"
                >
                  Submit Ticket
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <TicketIcon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {dashboardStats.totalTickets}
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span className="text-accent font-semibold">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Solved</CardTitle>
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {dashboardStats.ticketsSolved}
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-accent" />
                <span className="text-accent font-semibold">+8%</span> resolution rate
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Work in Progress</CardTitle>
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Clock className="h-4 w-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {dashboardStats.workInProgress}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Avg. {dashboardStats.avgResolutionTime} to complete</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardStats.pendingReview}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Teams</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{dashboardStats.activeTeams}</div>
              <p className="text-xs text-muted-foreground mt-1">Teams working on tickets</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{dashboardStats.avgResolutionTime}</div>
              <p className="text-xs text-muted-foreground mt-1">Time to completion</p>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card border-primary/10 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Operations Ticket System
            </CardTitle>
            <p className="text-muted-foreground">
              Submit tickets and track the progress of your requests through our operations team
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  How it works:
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                      <span className="text-sm font-bold text-primary-foreground">1</span>
                    </div>
                    <p className="pt-1">Submit your ticket with detailed requirements and timeline</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                      <span className="text-sm font-bold text-accent-foreground">2</span>
                    </div>
                    <p className="pt-1">Our team reviews and assigns the ticket to the appropriate department</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                      <span className="text-sm font-bold text-secondary-foreground">3</span>
                    </div>
                    <p className="pt-1">Track progress and receive updates on your ticket status</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  Our Teams:
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center font-medium border border-primary/20 hover:border-primary/40 transition-colors">
                    SMD
                  </div>
                  <div className="p-3 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg text-center font-medium border border-accent/20 hover:border-accent/40 transition-colors">
                    QAC
                  </div>
                  <div className="p-3 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg text-center font-medium border border-secondary/20 hover:border-secondary/40 transition-colors">
                    CM
                  </div>
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center font-medium border border-primary/20 hover:border-primary/40 transition-colors">
                    Class Ops
                  </div>
                  <div className="p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg text-center font-medium border border-accent/20 hover:border-accent/40 transition-colors col-span-2">
                    Content Operations
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/50">
              <Link href="/create-ticket">
                <Button
                  size="lg"
                  className="gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Submit New Ticket
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
