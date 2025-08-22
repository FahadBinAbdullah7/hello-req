"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Users,
  FileText,
  Plus,
  Trash2,
  Edit,
  Save,
  Database,
  UserPlus,
  Building,
  Eye,
  CheckSquare,
  FolderPlus,
  FolderOpen,
  LayoutGrid,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface FormField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "date" | "url" | "checkbox"
  required: boolean
  options?: string[]
}

interface Team {
  id: string
  name: string
  department: string
  manager: string
  members: number
  status: "Active" | "Inactive"
}

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Member"
  team: string
  status: "Active" | "Inactive"
}

interface Ticket {
  id: string
  productName: string
  type: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Open" | "In Progress" | "Review" | "Completed"
  team: string
  assignee?: string
  createdDate: string
  details: string
  deliveryTimeline: string
  requisitionBreakdown?: string
}

interface Project {
  id: string
  name: string
  description: string
  tickets: string[]
  assignedMembers: string[]
  status: "Planning" | "Active" | "Completed"
  createdDate: string
  priority?: "Low" | "Medium" | "High" | "Urgent"
  dueDate?: string
}

export default function AdminPanel() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [formFields, setFormFields] = useState<FormField[]>([]) // Initialize as empty array
  const [loadingFormFields, setLoadingFormFields] = useState(true)
  const [errorFormFields, setErrorFormFields] = useState<string | null>(null)
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "SMD",
      department: "Content Operations",
      manager: "A.S.M Akram",
      members: 9,
      status: "Active",
    },
    {
      id: "2", 
      name: "QAC",
      department: "Content Operations", 
      manager: "A.S.M Akram",
      members: 3,
      status: "Active"
    },
    {
      id: "3",
      name: "Class Ops",
      department: "Content Operations",
      manager: "A.S.M Akram",
      members: 8,
      status: "Active",
    },
    {
      id: "4",
      name: "CM",
      department: "Content Operations",
      manager: "A.S.M Akram",
      members: 3,
      status: "Active",
    },
  ])
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Umama Tasnuva Aziz",
      email: "umama@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "2",
      name: "Nafish-Ul Alam Bhuiyan",
      email: "nafish@10minuteschool.com",
      role: "Manager",
      team: "SMD",
      status: "Active",
    },
    {
      id: "3",
      name: "Nahid Hasan Sagor",
      email: "sagor@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "4",
      name: "Mehedi Hasan Shuvo",
      email: "mehedi.shuvo@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "5",
      name: "Md. Rasel Miah",
      email: "rasel@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "6",
      name: "Naziha Zabin",
      email: "naziha@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "7",
      name: "Zawad Al Zafir",
      email: "zafir@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "8",
      name: "Sojib Mia",
      email: "sojib@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "9",
      name: "Auritra Halder",
      email: "auritra@10minuteschool.com",
      role: "Member",
      team: "SMD",
      status: "Active",
    },
    {
      id: "10",
      name: "Shafqat Bin Shams",
      email: "shafqat@10minuteschool.com",
      role: "Manager",
      team: "QAC",
      status: "Active",
    },
    {
      id: "11",
      name: "Md. Sakibul Alam",
      email: "sakibul@10minuteschool.com",
      role: "Member",
      team: "QAC",
      status: "Active",
    },
    {
      id: "12",
      name: "Homaira Atika",
      email: "homaira@10minuteschool.com",
      role: "Member",
      team: "QAC",
      status: "Active",
    },
    {
      id: "13",
      name: "S.M. Refat Arefin",
      email: "refat@10minuteschool.com",
      role: "Manager",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "14",
      name: "MD Mahedi Hasan",
      email: "mahedi.tuhin@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "15",
      name: "Md Asif Khan",
      email: "asif.khan@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "16",
      name: "Md Junayet Alam Akash",
      email: "mdjunayetalama@gmail.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "17",
      name: "Md. Abdullah",
      email: "mdabdullah@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "18",
      name: "Yeasin Ahamed Joy",
      email: "yeasin@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "19",
      name: "Nayem Ahmed",
      email: "nayem.ahmed@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "20",
      name: "Hasib Uddin",
      email: "hasib@10minuteschool.com",
      role: "Member",
      team: "Class Ops",
      status: "Active",
    },
    {
      id: "21",
      name: "Fahad Bin Abdullah",
      email: "fahad@10minuteschool.com",
      role: "Manager",
      team: "CM",
      status: "Active",
    },
    {
      id: "22",
      name: "S. M. Al Amin",
      email: "alamin@10minuteschool.com",
      role: "Member",
      team: "CM",
      status: "Active",
    },
    {
      id: "23",
      name: "Gazi Meraz Mehedi",
      email: "gm.mehedi@10minuteschool.com",
      role: "Member",
      team: "CM",
      status: "Active",
    },
    {
      id: "24",
      name: "System Admin",
      email: "admin@10minuteschool.com",
      role: "Admin",
      team: "System",
      status: "Active",
    },
  ])
  const [editingField, setEditingField] = useState<string | null>(null)
  const [newField, setNewField] = useState<Partial<FormField>>({
    label: "",
    type: "text",
    required: false,
  })
  const [showAddField, setShowAddField] = useState(false)
  const [newTeam, setNewTeam] = useState({ name: "", department: "", manager: "" })
  const [showAddTeam, setShowAddTeam] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Member", team: "" })
  const [showAddUser, setShowAddUser] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProject, setNewProject] = useState({ name: "", description: "" })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets")
        if (response.ok) {
          const data = await response.json()
          setTickets(data.tickets || [])
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error)
      }
    }

    fetchTickets()
  }, [])

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await fetch("/api/form-fields")
        const data = await response.json()
        if (response.ok) {
          setFormFields(data.formFields)
        } else {
          setErrorFormFields(data.message || "Failed to fetch form fields")
        }
      } catch (error) {
        console.error("Error fetching form fields:", error)
        setErrorFormFields("Error connecting to server to fetch form fields")
      } finally {
        setLoadingFormFields(false)
      }
    }
    fetchFormFields()
  }, [])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
      return
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  // Form Field Management Functions
  const addFormField = async () => {
    if (newField.label) {
      const field: FormField = {
        id: `field_${Date.now()}`,
        label: newField.label,
        type: newField.type || "text",
        required: newField.required || false,
        options: newField.options,
      }
      const updatedFormFields = [...formFields, field]
      await updateFormFieldsOnServer(updatedFormFields)
      setNewField({ label: "", type: "text", required: false })
      setShowAddField(false)
    }
  }

  const removeFormField = async (fieldId: string) => {
    const updatedFormFields = formFields.filter((field) => field.id !== fieldId)
    await updateFormFieldsOnServer(updatedFormFields)
  }

  const updateFormField = async (fieldId: string, updates: Partial<FormField>) => {
    const updatedFormFields = formFields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field,
    )
    await updateFormFieldsOnServer(updatedFormFields)
    setEditingField(null)
  }

  const updateFormFieldsOnServer = async (updatedFormFields: FormField[]) => {
    try {
      const response = await fetch("/api/form-fields", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formFields: updatedFormFields }),
      })
      const data = await response.json()
      if (response.ok) {
        setFormFields(updatedFormFields)
        alert("Form fields updated successfully!")
      } else {
        alert(`Error: ${data.message || "Failed to update form fields"}`)
      }
    } catch (error) {
      console.error("Error updating form fields:", error)
      alert("Error connecting to server to update form fields.")
    }
  }

  // Team Management Functions
  const addTeam = () => {
    if (newTeam.name && newTeam.department && newTeam.manager) {
      const team: Team = {
        id: `team_${Date.now()}`,
        name: newTeam.name,
        department: newTeam.department,
        manager: newTeam.manager,
        members: 0,
        status: "Active",
      }
      setTeams((prev) => [...prev, team])
      setNewTeam({ name: "", department: "", manager: "" })
      setShowAddTeam(false)
    }
  }

  const removeTeam = (teamId: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== teamId))
  }

  // User Management Functions
  const addUser = () => {
    if (newUser.name && newUser.email && newUser.team) {
      const user: User = {
        id: `user_${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as User["role"],
        team: newUser.team,
        status: "Active",
      }
      setUsers((prev) => [...prev, user])
      setNewUser({ name: "", email: "", role: "Member", team: "" })
      setShowAddUser(false)
    }
  }

  const removeUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
  }

  // Ticket and Project Management Functions
  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((prev) => (prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]))
  }

  const createProject = () => {
    if (newProject.name && selectedTickets.length > 0) {
      const project: Project = {
        id: `project_${Date.now()}`,
        name: newProject.name,
        description: newProject.description,
        tickets: selectedTickets,
        assignedMembers: [],
        status: "Planning",
        createdDate: new Date().toISOString().split("T")[0],
      }
      setProjects((prev) => [...prev, project])
      setSelectedTickets([])
      setNewProject({ name: "", description: "" })
      setShowCreateProject(false)
    }
  }

  const assignMemberToProject = (projectId: string, memberId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, assignedMembers: [...project.assignedMembers, memberId] } : project,
      ),
    )
  }

  const assignTicketToMember = (ticketId: string, memberId: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, assignee: users.find((u) => u.id === memberId)?.name } : ticket,
      ),
    )
  }

  const updateProjectPriority = (projectId: string, priority: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, priority: priority as Project["priority"] } : project,
      ),
    )
  }

  const updateProjectDueDate = (projectId: string, dueDate: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === projectId ? { ...project, dueDate: dueDate } : project)),
    )
  }

  const removeMemberFromProject = (projectId: string, memberId: string) => {
    setProjects((prev) =>
      prev.map((project) => ({
        ...project,
        assignedMembers: project.assignedMembers.filter((id) => id !== memberId),
      })),
    )
  }

  const createKanbanFromProject = (projectId: string) => {
    alert(`Kanban board created for project ${projectId}`)
  }

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId))
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader title="Admin Panel" subtitle="Manage system configuration and users" backUrl="/dashboard" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              All Tasks
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Form Management
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Team Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Tickets & Projects</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage tickets and create projects ({tickets.length} tickets, {projects.length} projects)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowCreateProject(true)}
                      disabled={selectedTickets.length === 0}
                      className="flex items-center gap-2"
                    >
                      <FolderPlus className="h-4 w-4" />
                      Create Project ({selectedTickets.length})
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={() => toggleTicketSelection(ticket.id)}
                          className="rounded border-border"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{ticket.productName}</h3>
                            <Badge variant="outline">{ticket.type}</Badge>
                            <Badge
                              variant={
                                ticket.priority === "Critical"
                                  ? "destructive"
                                  : ticket.priority === "High"
                                    ? "default"
                                    : ticket.priority === "Medium"
                                      ? "secondary"
                                      : "outline"
                              }
                            >
                              {ticket.priority}
                            </Badge>
                            <Badge
                              variant={
                                ticket.status === "Completed"
                                  ? "default"
                                  : ticket.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {ticket.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Team: {ticket.team} • Due: {ticket.deliveryTimeline}
                            {ticket.assignee && ` • Assigned to: ${ticket.assignee}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select onValueChange={(value) => assignTicketToMember(ticket.id, value)}>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Assign to..." />
                            </SelectTrigger>
                            <SelectContent>
                              {users
                                .filter((u) => u.role !== "Admin")
                                .map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setViewingTicket(ticket)}>
                                <Eye className="h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{ticket.productName}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Type</Label>
                                    <p className="text-sm">{ticket.type}</p>
                                  </div>
                                  <div>
                                    <Label>Priority</Label>
                                    <p className="text-sm">{ticket.priority}</p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <p className="text-sm">{ticket.status}</p>
                                  </div>
                                  <div>
                                    <Label>Team</Label>
                                    <p className="text-sm">{ticket.team}</p>
                                  </div>
                                  <div>
                                    <Label>Delivery Timeline</Label>
                                    <p className="text-sm">{ticket.deliveryTimeline}</p>
                                  </div>
                                  <div>
                                    <Label>Created Date</Label>
                                    <p className="text-sm">{ticket.createdDate}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Details</Label>
                                  <p className="text-sm mt-1">{ticket.details}</p>
                                </div>
                                {ticket.requisitionBreakdown && (
                                  <div>
                                    <Label>Requisition Breakdown</Label>
                                    <a
                                      href={ticket.requisitionBreakdown}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:underline block mt-1"
                                    >
                                      View Document
                                    </a>
                                  </div>
                                )}
                                {ticket.assignee && (
                                  <div>
                                    <Label>Assigned To</Label>
                                    <p className="text-sm">{ticket.assignee}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={newProject.name}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter project description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Selected Tickets ({selectedTickets.length})</Label>
                      <div className="text-sm text-muted-foreground">
                        {selectedTickets
                          .map((ticketId) => {
                            const ticket = tickets.find((t) => t.id === ticketId)
                            return ticket ? ticket.productName : ""
                          })
                          .join(", ")}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowCreateProject(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createProject}>Create Project</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Project Management</h2>
                <p className="text-muted-foreground">Manage projects, assign teams, and create Kanban boards</p>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5" />
                          {project.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Assign Team Members</Label>
                        <Select onValueChange={(value) => assignMemberToProject(project.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member..." />
                          </SelectTrigger>
                          <SelectContent>
                            {users
                              .filter((u) => u.role !== "Admin" && !project.assignedMembers.includes(u.id))
                              .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name} ({user.team})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Priority</Label>
                        <Select onValueChange={(value) => updateProjectPriority(project.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Set priority..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Due Date</Label>
                        <Input
                          type="date"
                          onChange={(e) => updateProjectDueDate(project.id, e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="text-sm text-muted-foreground">
                        <strong>Assigned Members:</strong>
                      </div>
                      {project.assignedMembers.map((memberId) => {
                        const member = users.find((u) => u.id === memberId)
                        return member ? (
                          <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                            {member.name}
                            <button
                              onClick={() => removeMemberFromProject(project.id, memberId)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ) : null
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        {project.tickets.length} tickets • Created {project.createdDate}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => createKanbanFromProject(project.id)}
                          className="flex items-center gap-2"
                        >
                          <LayoutGrid className="h-4 w-4" />
                          Create Kanban Board
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                          Delete Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {projects.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                    <p className="text-muted-foreground mb-4">Create projects from tickets in the "All Tasks" tab</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="forms">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Dynamic Form Fields</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage the fields that appear in the ticket creation form
                  </p>
                </div>
                <Button onClick={() => setShowAddField(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </CardHeader>
              <CardContent>
                {loadingFormFields && <p>Loading form fields...</p>}
                {errorFormFields && <p className="text-destructive">Error: {errorFormFields}</p>}
                {!loadingFormFields && !errorFormFields && formFields.length === 0 && (
                  <p className="text-muted-foreground">No form fields defined. Click "Add Field" to create one.</p>
                )}
                {!loadingFormFields && !errorFormFields && (
                  <div className="space-y-4">
                    {formFields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        {editingField === field.id ? (
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Field Label</Label>
                                <Input
                                  defaultValue={field.label}
                                  onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                                  placeholder="Enter field label"
                                />
                              </div>
                              <div>
                                <Label>Field Type</Label>
                                <Select
                                  defaultValue={field.type}
                                  onValueChange={(value) =>
                                    updateFormField(field.id, { type: value as FormField["type"] })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="textarea">Textarea</SelectItem>
                                    <SelectItem value="select">Select</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="url">URL</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {(field.type === "select" || field.type === "checkbox") && (
                              <div>
                                <Label>Options (comma-separated)</Label>
                                <Input
                                  defaultValue={field.options?.join(", ") || ""}
                                  onChange={(e) =>
                                    updateFormField(field.id, {
                                      options: e.target.value.split(",").map((opt) => opt.trim()),
                                    })
                                  }
                                  placeholder="Option 1, Option 2, Option 3"
                                />
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  defaultChecked={field.required}
                                  onChange={(e) => updateFormField(field.id, { required: e.target.checked })}
                                  className="rounded border-border"
                                />
                                <span className="text-sm">Required field</span>
                              </label>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setEditingField(null)}>
                                  Cancel
                                </Button>
                                <Button size="sm" onClick={() => setEditingField(null)}>
                                  <Save className="h-4 w-4 mr-2" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-medium">{field.label}</h3>
                                <Badge variant="outline">{field.type}</Badge>
                                {field.required && <Badge variant="secondary">Required</Badge>}
                              </div>
                              {field.options && (
                                <p className="text-sm text-muted-foreground mt-1">Options: {field.options.join(", ")}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setEditingField(field.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFormField(field.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {showAddField && (
                      <Card className="border-dashed">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Field Label</Label>
                                <Input
                                  value={newField.label || ""}
                                  onChange={(e) => setNewField((prev) => ({ ...prev, label: e.target.value }))}
                                  placeholder="Enter field label"
                                />
                              </div>
                              <div>
                                <Label>Field Type</Label>
                                <Select
                                  value={newField.type || "text"}
                                  onValueChange={(value) =>
                                    setNewField((prev) => ({ ...prev, type: value as FormField["type"] }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="textarea">Textarea</SelectItem>
                                    <SelectItem value="select">Select</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="url">URL</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {(newField.type === "select" || newField.type === "checkbox") && (
                              <div>
                                <Label>Options (comma-separated)</Label>
                                <Input
                                  value={newField.options?.join(", ") || ""}
                                  onChange={(e) =>
                                    setNewField((prev) => ({
                                      ...prev,
                                      options: e.target.value.split(",").map((opt) => opt.trim()),
                                    }))
                                  }
                                  placeholder="Option 1, Option 2, Option 3"
                                />
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={newField.required || false}
                                  onChange={(e) => setNewField((prev) => ({ ...prev, required: e.target.checked }))}
                                  className="rounded border-border"
                                />
                                <span className="text-sm">Required field</span>
                              </label>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setShowAddField(false)}>
                                  Cancel
                                </Button>
                                <Button size="sm" onClick={addFormField}>
                                  Add Field
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage teams and their assignments ({teams.length} teams)
                  </p>
                </div>
                <Button onClick={() => setShowAddTeam(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Team
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{team.name}</h3>
                          <Badge variant="outline">{team.department}</Badge>
                          <Badge variant={team.status === "Active" ? "default" : "secondary"}>{team.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Manager: {team.manager} • {team.members} members
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeam(team.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {showAddTeam && (
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Team Name</Label>
                              <Input
                                value={newTeam.name}
                                onChange={(e) => setNewTeam((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter team name"
                              />
                            </div>
                            <div>
                              <Label>Department</Label>
                              <Input
                                value={newTeam.department}
                                onChange={(e) => setNewTeam((prev) => ({ ...prev, department: e.target.value }))}
                                placeholder="Enter department"
                              />
                            </div>
                            <div>
                              <Label>Manager</Label>
                              <Input
                                value={newTeam.manager}
                                onChange={(e) => setNewTeam((prev) => ({ ...prev, manager: e.target.value }))}
                                placeholder="Enter manager name"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowAddTeam(false)}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={addTeam}>
                              Add Team
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage user accounts and permissions ({users.length} users)
                  </p>
                </div>
                <Button onClick={() => setShowAddUser(true)} className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{user.name}</h3>
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email} • Team: {user.team}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => toggleUserStatus(user.id)}>
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUser(user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {showAddUser && (
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Full Name</Label>
                              <Input
                                value={newUser.name}
                                onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter email address"
                              />
                            </div>
                            <div>
                              <Label>Role</Label>
                              <Select
                                value={newUser.role}
                                onChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Member">Member</SelectItem>
                                  <SelectItem value="Manager">Manager</SelectItem>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Team</Label>
                              <Select
                                value={newUser.team}
                                onChange={(value) => setNewUser((prev) => ({ ...prev, team: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select team" />
                                </SelectTrigger>
                                <SelectContent>
                                  {teams.map((team) => (
                                    <SelectItem key={team.id} value={team.name}>
                                      {team.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowAddUser(false)}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={addUser}>
                              Add User
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Google Sheets Integration</CardTitle>
                  <p className="text-sm text-muted-foreground">Configure Google Sheets API for form submissions</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Spreadsheet ID</Label>
                    <Input placeholder="Enter Google Sheets ID" />
                  </div>
                  <div>
                    <Label>Service Account Key</Label>
                    <Textarea placeholder="Paste service account JSON key" rows={4} />
                  </div>
                  <Button className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Test Connection
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <p className="text-sm text-muted-foreground">General system settings and preferences</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Default Priority Level</Label>
                    <Select defaultValue="Medium">
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
                  <div>
                    <Label>Auto-assign Tickets</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Assignment</SelectItem>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="workload">Based on Workload</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
