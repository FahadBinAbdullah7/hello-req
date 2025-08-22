"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  TicketIcon,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Settings,
  LogOut,
  Kanban,
  FileText,
  UserCheck,
  Calendar,
  Target,
  User,
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalTickets: number
  ticketsSolved: number
  workInProgress: number
  pendingReview: number
  activeTeams: number
  avgResolutionTime: string
}

interface RecentTicket {
  id: string
  title: string
  type: string
  priority: string
  assignedTeam: string
  status: string
  dueDate: string
  submittedBy: string
  assignedTo?: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: string
  currentTasks: number
}

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalTickets: 0,
    ticketsSolved: 0,
    workInProgress: 0,
    pendingReview: 0,
    activeTeams: 44,
    avgResolutionTime: "2.3 days",
  })
  const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard")
        const data = await response.json()

        if (data.success) {
          setDashboardStats(data.stats)
          setRecentTickets(data.recentTickets)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    const fetchTeamData = async () => {
      if (user && user.role === "team_member") {
        // Mock team member data - in real app, this would come from API
        setTeamMembers([
          {
            id: "1",
            name: "Umama",
            email: "umama@10minuteschool.com",
            role: "Content Creator",
            status: "Active",
            currentTasks: 3,
          },
          {
            id: "2",
            name: "Nafish",
            email: "nafish@10minuteschool.com",
            role: "Designer",
            status: "Active",
            currentTasks: 2,
          },
          {
            id: "3",
            name: "Sagor",
            email: "sagor@10minuteschool.com",
            role: "Developer",
            status: "Active",
            currentTasks: 4,
          },
        ])
      }
    }

    if (user) {
      fetchDashboardData()
      fetchTeamData()
    }
  }, [user])

  const handleCreateKanban = (ticketId: string) => {
    router.push(`/kanban?ticket=${ticketId}`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending Review":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.role === "admin" ? "Admin Dashboard" : "Team Dashboard"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.name} ({user.team})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline">Public View</Button>
              </Link>
              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Settings className="h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link href="/kanban">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Kanban className="h-4 w-4" />
                  Kanban Board
                </Button>
              </Link>
              <Button variant="outline" onClick={logout} className="flex items-center gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className={`grid w-full ${user.role === "admin" ? "grid-cols-3" : "grid-cols-4"}`}>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {user.role === "admin" ? "All Tickets" : "My Tasks"}
            </TabsTrigger>
            {user.role === "team_member" && (
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                My Team
              </TabsTrigger>
            )}
            {user.role === "team_member" && (
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </TabsTrigger>
            )}
            {user.role === "admin" && (
              <TabsTrigger value="management" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Management
              </TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card className="col-span-1 xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {user.role === "admin" ? "Total Tickets" : "Team Tickets"}
                  </CardTitle>
                  <TicketIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.totalTickets}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-accent font-medium">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1 xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {user.role === "admin" ? "Tickets Solved" : "Completed Tasks"}
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.ticketsSolved}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-accent font-medium">+8%</span> completion rate
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1 xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {user.role === "admin" ? "Work in Progress" : "Active Tasks"}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.workInProgress}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg. {dashboardStats.avgResolutionTime} to complete
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.pendingReview}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {user.role === "admin" ? "Active Teams" : "Team Members"}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {user.role === "admin" ? dashboardStats.activeTeams : teamMembers.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Resolution</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{dashboardStats.avgResolutionTime}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {user.role === "admin" ? "All Tickets" : "My Assigned Tasks"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {user.role === "admin"
                      ? "Manage all tickets and create Kanban boards"
                      : `Tasks assigned to you and your team (${user.team})`}
                  </p>
                </div>
                <Link href="/create-ticket">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Ticket
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          {user.role === "team_member" && ticket.assignedTo && (
                            <Badge variant="secondary">Assigned to: {ticket.assignedTo}</Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-foreground mb-1">{ticket.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Type: {ticket.type}</span>
                          <span>Team: {ticket.assignedTeam}</span>
                          <span>Due: {ticket.dueDate}</span>
                          {user.role === "admin" && <span>By: {ticket.submittedBy}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.role === "admin" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCreateKanban(ticket.id)}
                            className="flex items-center gap-2"
                          >
                            <Kanban className="h-4 w-4" />
                            Create Board
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user.role === "team_member" && (
            <TabsContent value="team">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {user.team} Team Members
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Your team members and their current workload</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{member.name}</h3>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{member.currentTasks} active tasks</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Team Performance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{user.team} team metrics and achievements</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">92%</div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">1.8 days</div>
                        <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">15</div>
                        <p className="text-sm text-muted-foreground">Tasks This Week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {user.role === "team_member" && (
            <TabsContent value="schedule">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      My Schedule
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Upcoming deadlines and task schedule</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium text-foreground">Content Review - Course Materials</h3>
                          <p className="text-sm text-muted-foreground">Due: Tomorrow, 2:00 PM</p>
                        </div>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                          High Priority
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium text-foreground">Design Assets - Marketing Campaign</h3>
                          <p className="text-sm text-muted-foreground">Due: Friday, 5:00 PM</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Medium Priority
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-medium text-foreground">Team Meeting - Weekly Sync</h3>
                          <p className="text-sm text-muted-foreground">Today, 3:00 PM</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Meeting
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">Your task distribution for this week</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="p-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">{day}</div>
                          <div
                            className={`h-16 rounded ${index < 5 ? "bg-primary/20" : "bg-muted"} flex items-center justify-center`}
                          >
                            <span className="text-xs">{index < 5 ? `${2 + (index % 3)}` : "0"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Management Tab (Admin Only) */}
          {user.role === "admin" && (
            <TabsContent value="management">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <p className="text-sm text-muted-foreground">Administrative tools and shortcuts</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link href="/admin">
                        <Button
                          variant="outline"
                          className="w-full h-20 flex flex-col items-center gap-2 bg-transparent"
                        >
                          <Settings className="h-6 w-6" />
                          <span>Admin Panel</span>
                        </Button>
                      </Link>
                      <Link href="/kanban">
                        <Button
                          variant="outline"
                          className="w-full h-20 flex flex-col items-center gap-2 bg-transparent"
                        >
                          <Kanban className="h-6 w-6" />
                          <span>Kanban Boards</span>
                        </Button>
                      </Link>
                      <Link href="/create-ticket">
                        <Button
                          variant="outline"
                          className="w-full h-20 flex flex-col items-center gap-2 bg-transparent"
                        >
                          <Plus className="h-6 w-6" />
                          <span>Create Ticket</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">Current system status and metrics</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Team Distribution</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>SMD Team</span>
                            <span className="font-medium">8 members</span>
                          </div>
                          <div className="flex justify-between">
                            <span>QAC Team</span>
                            <span className="font-medium">3 members</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CM Team</span>
                            <span className="font-medium">3 members</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Class Ops</span>
                            <span className="font-medium">9 members</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Recent Activity</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• 3 new tickets submitted today</p>
                          <p>• 5 tickets completed this week</p>
                          <p>• 2 teams updated their status</p>
                          <p>• 1 new team member added</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
