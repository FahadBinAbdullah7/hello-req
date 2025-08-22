export interface User {
  id: string
  email: string
  name: string
  team: string
  role: "admin" | "team_member"
  isActive: boolean
}

// Team members data from the provided list
export const TEAM_MEMBERS: User[] = [
  {
    id: "1",
    email: "umama@10minuteschool.com",
    password: "password123",
    name: "Umama",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "2",
    email: "shafqat@10minuteschool.com",
    password: "password123",
    name: "Shafqat",
    team: "QAC",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "3",
    email: "fahad@10minuteschool.com",
    password: "password123",
    name: "Fahad",
    team: "CM",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "4",
    email: "refat@10minuteschool.com",
    password: "password123",
    name: "Refat",
    team: "Class Ops",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "5",
    email: "nafish@10minuteschool.com",
    password: "password123",
    name: "Nafish",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "6",
    email: "sakibul@10minuteschool.com",
    password: "password123",
    name: "Sakibul",
    team: "QAC",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "7",
    email: "alamin@10minuteschool.com",
    password: "password123",
    name: "Alamin",
    team: "CM",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "8",
    email: "mahedi.tuhin@10minuteschool.com",
    password: "password123",
    name: "Mahedi Tuhin",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "9",
    email: "sagor@10minuteschool.com",
    password: "password123",
    name: "Sagor",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "10",
    email: "homaira@10minuteschool.com",
    password: "password123",
    name: "Homaira",
    team: "QAC",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "11",
    email: "gm.mehedi@10minuteschool.com",
    password: "password123",
    name: "GM Mehedi",
    team: "CM",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "12",
    email: "asif.khan@10minuteschool.com",
    password: "password123",
    name: "Asif Khan",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "13",
    email: "mehedi.shuvo@10minuteschool.com",
    password: "password123",
    name: "Mehedi Shuvo",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "14",
    email: "mdjunayetalama@gmail.com",
    password: "password123",
    name: "Md Junayet Alama",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "15",
    email: "rasel@10minuteschool.com",
    password: "password123",
    name: "Rasel",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "16",
    email: "mdabdullah@10minuteschool.com",
    password: "password123",
    name: "Md Abdullah",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "17",
    email: "naziha@10minuteschool.com",
    password: "password123",
    name: "Naziha",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "18",
    email: "yeasin@10minuteschool.com",
    password: "password123",
    name: "Yeasin",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "19",
    email: "zafir@10minuteschool.com",
    password: "password123",
    name: "Zafir",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "20",
    email: "nayem.ahmed@10minuteschool.com",
    password: "password123",
    name: "Nayem Ahmed",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "21",
    email: "sojib@10minuteschool.com",
    password: "password123",
    name: "Sojib",
    team: "SMD",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "22",
    email: "hasib@10minuteschool.com",
    password: "password123",
    name: "Hasib",
    team: "CLASS OPS",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  {
    id: "23",
    email: "akram@10minuteschool.com",
    password: "password123",
    name: "Akram",
    team: "Lead Content Operations",
    role: "team_member",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
  // Add admin user
  {
    id: "admin",
    email: "admin@10minuteschool.com",
    password: "admin123",
    name: "System Admin",
    team: "Admin",
    role: "admin",
    createdAt: "2024-01-15T10:00:00.000Z",
    isActive: true,
  },
] as any[]

export function authenticateUser(email: string, password: string): User | null {
  const user = TEAM_MEMBERS.find((u) => u.email === email && u.password === password && u.isActive)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  return null
}

export function getUserFromToken(token: string): User | null {
  try {
    // Simple base64 decode for demo purposes
    const decoded = JSON.parse(atob(token))
    const user = TEAM_MEMBERS.find((u) => u.id === decoded.id && u.isActive)
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword as User
    }
  } catch (error) {
    console.error("Invalid token:", error)
  }
  return null
}

export function createToken(user: User): string {
  // Simple base64 encode for demo purposes
  return btoa(JSON.stringify({ id: user.id, email: user.email }))
}
