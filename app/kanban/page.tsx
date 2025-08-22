"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Users, Calendar, Trash2, FolderPlus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface Ticket {
  id: string
  title: string
  description: string
  type: string
  priority: "Low" | "Medium" | "High" | "Critical"
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  team: string
  dueDate: string
  createdDate: string
  status: "todo" | "in-progress" | "review" | "done"
  tags: string[]
}

interface KanbanColumn {
  id: string
  title: string
  status: "todo" | "in-progress" | "review" | "done"
  color: string
  tickets: Ticket[]
}

export default function KanbanBoard() {
  const { user } = useAuth()
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null)
  const [showTicketSelector, setShowTicketSelector] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [projectName, setProjectName] = useState("")
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "Technical",
    priority: "Medium" as Ticket["priority"],
    assignee: "",
    team: "",
    dueDate: "",
  })

  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([])

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: "todo",
      title: "To Do",
      status: "todo",
      color: "bg-gray-100 border-gray-200",
      tickets: [],
    },
    {
      id: "in-progress",
      title: "In Progress",
      status: "in-progress",
      color: "bg-blue-50 border-blue-200",
      tickets: [],
    },
    {
      id: "review",
      title: "Review",
      status: "review",
      color: "bg-yellow-50 border-yellow-200",
      tickets: [],
    },
    {
      id: "done",
      title: "Done",
      status: "done",
      color: "bg-green-50 border-green-200",
      tickets: [],
    },
  ])

  const teams = ["Digital Marketing", "DevOps", "Customer Success", "Product Management", "UX/UI Design"]
  const teamMembers = [
    { id: "1", name: "Sarah Johnson", team: "Digital Marketing", initials: "SJ" },
    { id: "2", name: "Mike Chen", team: "DevOps", initials: "MC" },
    { id: "3", name: "Emily Davis", team: "Customer Success", initials: "ED" },
    { id: "4", name: "Alex Rodriguez", team: "Product Management", initials: "AR" },
    { id: "5", name: "Jessica Kim", team: "UX/UI Design", initials: "JK" },
  ]

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await fetch("/api/tickets")
        if (response.ok) {
          const tickets = await response.json()
          const kanbanTickets = tickets.map((ticket: any) => ({
            id: ticket.id,
            title: ticket.productName,
            description: ticket.details,
            type: ticket.type,
            priority: ticket.priority || "Medium",
            assignee: {
              name: ticket.assignee || "Unassigned",
              avatar: "",
              initials: ticket.assignee
                ? ticket.assignee
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                : "UN",
            },
            team: ticket.team,
            dueDate: ticket.deliveryTimeline,
            createdDate: ticket.createdDate,
            status:
              ticket.status === "Open"
                ? "todo"
                : ticket.status === "In Progress"
                  ? "in-progress"
                  : ticket.status === "Review"
                    ? "review"
                    : "done",
            tags: [ticket.type, ticket.priority],
          }))

          setColumns((prevColumns) =>
            prevColumns.map((column) => ({
              ...column,
              tickets: kanbanTickets.filter((ticket: Ticket) => ticket.status === column.status),
            })),
          )
        }
      } catch (error) {
        console.log("[v0] Failed to load tickets:", error)
      }
    }

    loadTickets()
  }, [])

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

  const handleDragStart = (e: React.DragEvent, ticket: Ticket) => {
    setDraggedTicket(ticket)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()

    if (!draggedTicket) return

    const targetStatus = targetColumnId as Ticket["status"]

    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tickets:
          column.id === targetColumnId
            ? [...column.tickets.filter((t) => t.id !== draggedTicket.id), { ...draggedTicket, status: targetStatus }]
            : column.tickets.filter((t) => t.id !== draggedTicket.id),
      })),
    )

    setDraggedTicket(null)
  }

  const handleDeleteTicket = (ticketId: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tickets: column.tickets.filter((ticket) => ticket.id !== ticketId),
        })),
      )

      setAvailableTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId))
    }
  }

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.assignee) {
      alert("Please fill in all required fields")
      return
    }

    const assignedMember = teamMembers.find((member) => member.id === newTask.assignee)
    if (!assignedMember) return

    const task: Ticket = {
      id: `TKT-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type,
      priority: newTask.priority,
      assignee: {
        name: assignedMember.name,
        avatar: "",
        initials: assignedMember.initials,
      },
      team: assignedMember.team,
      dueDate: newTask.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      status: "todo",
      tags: [newTask.type, newTask.priority],
    }

    setColumns((prevColumns) =>
      prevColumns.map((column) => (column.id === "todo" ? { ...column, tickets: [...column.tickets, task] } : column)),
    )

    setNewTask({
      title: "",
      description: "",
      type: "Technical",
      priority: "Medium",
      assignee: "",
      team: "",
      dueDate: "",
    })
    setShowAddTask(false)
  }

  const handleCreateProject = () => {
    if (!projectName.trim() || selectedTickets.length === 0) {
      alert("Please enter a project name and select at least one ticket")
      return
    }

    const projectTickets = availableTickets.filter((ticket) => selectedTickets.includes(ticket.id))

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === "todo" ? { ...column, tickets: [...column.tickets, ...projectTickets] } : column,
      ),
    )

    setProjectName("")
    setSelectedTickets([])
    setShowTicketSelector(false)
    alert(`Project "${projectName}" created with ${selectedTickets.length} tickets!`)
  }

  const filteredColumns = columns.map((column) => ({
    ...column,
    tickets: column.tickets.filter((ticket) => {
      const matchesTeam = selectedTeam === "all" || ticket.team === selectedTeam
      const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority
      const matchesSearch =
        searchQuery === "" ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesTeam && matchesPriority && matchesSearch
    }),
  }))

  const totalTickets = columns.reduce((sum, column) => sum + column.tickets.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader title="Kanban Board" subtitle="Manage and track team tasks visually" backUrl="/dashboard" />

      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {totalTickets} tickets
            </Badge>
            {user?.role === "admin" && (
              <>
                <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Task Title</label>
                        <Input
                          value={newTask.title}
                          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Input
                          value={newTask.description}
                          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter task description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <Select
                            value={newTask.type}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Research">Research</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value) =>
                              setNewTask((prev) => ({ ...prev, priority: value as Ticket["priority"] }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Assign To</label>
                          <Select
                            value={newTask.assignee}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, assignee: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name} ({member.team})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Due Date</label>
                          <Input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddTask(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddTask}>Add Task</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={showTicketSelector} onOpenChange={setShowTicketSelector}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <FolderPlus className="h-4 w-4" />
                      Create Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Project from Tickets</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Project Name</label>
                        <Input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="Enter project name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Select Tickets</label>
                        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                          {availableTickets.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No available tickets to create projects from
                            </p>
                          ) : (
                            availableTickets.map((ticket) => (
                              <div key={ticket.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Checkbox
                                  checked={selectedTickets.includes(ticket.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedTickets((prev) => [...prev, ticket.id])
                                    } else {
                                      setSelectedTickets((prev) => prev.filter((id) => id !== ticket.id))
                                    }
                                  }}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                                    <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                      {ticket.priority}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium text-sm">{ticket.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{ticket.description}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowTicketSelector(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateProject} disabled={selectedTickets.length === 0}>
                          Create Project ({selectedTickets.length} tickets)
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            <Link href="/create-ticket">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColumns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className={`rounded-t-lg border-2 ${column.color} p-4`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">{column.title}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {column.tickets.length}
                  </Badge>
                </div>
              </div>

              <div
                className={`flex-1 border-l-2 border-r-2 border-b-2 ${column.color.replace("bg-", "border-").split(" ")[1]} rounded-b-lg p-4 space-y-4 min-h-96`}
              >
                {column.tickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, ticket)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-medium leading-tight">{ticket.title}</CardTitle>
                        </div>
                        {user?.role === "admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{ticket.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {ticket.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                        {ticket.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            +{ticket.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={ticket.assignee.avatar || "/placeholder.svg"}
                              alt={ticket.assignee.name}
                            />
                            <AvatarFallback className="text-xs">{ticket.assignee.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{ticket.assignee.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {ticket.dueDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {user?.role === "admin" && (
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-muted-foreground/25 h-12 text-muted-foreground hover:border-muted-foreground/50"
                    onClick={() => setShowAddTask(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add ticket
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
