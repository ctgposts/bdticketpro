"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2, Users, Shield, UserCheck, Eye, EyeOff } from "lucide-react"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface SystemUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
  phone: string
  status: "active" | "inactive"
  createdAt: string
  lastLogin: string
  permissions: string[]
}

interface UserManagementProps {
  user: User
  onBack: () => void
}

export default function UserManagement({ user, onBack }: UserManagementProps) {
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "1",
      name: "Ahmed Rahman",
      email: "admin@bdticketpro.com",
      role: "admin",
      phone: "+880 1711-123456",
      status: "active",
      createdAt: "2024-01-01",
      lastLogin: "2024-01-24 10:30",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Fatima Khan",
      email: "manager@bdticketpro.com",
      role: "manager",
      phone: "+880 1712-234567",
      status: "active",
      createdAt: "2024-01-05",
      lastLogin: "2024-01-24 09:15",
      permissions: ["book", "confirm", "reports"],
    },
    {
      id: "3",
      name: "Rashid Ali",
      email: "staff@bdticketpro.com",
      role: "staff",
      phone: "+880 1713-345678",
      status: "active",
      createdAt: "2024-01-10",
      lastLogin: "2024-01-24 08:45",
      permissions: ["book"],
    },
    {
      id: "4",
      name: "Salma Begum",
      email: "staff2@bdticketpro.com",
      role: "staff",
      phone: "+880 1714-456789",
      status: "inactive",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20 16:20",
      permissions: ["book"],
    },
  ])

  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "staff" as "admin" | "manager" | "staff",
    phone: "",
    password: "",
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "manager":
        return <UserCheck className="w-4 h-4" />
      case "staff":
        return <Users className="w-4 h-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>
      case "manager":
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
      case "staff":
        return <Badge className="bg-green-100 text-green-800">Staff</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    )
  }

  const handleAddUser = () => {
    const user: SystemUser = {
      id: Date.now().toString(),
      ...newUser,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      permissions:
        newUser.role === "admin" ? ["all"] : newUser.role === "manager" ? ["book", "confirm", "reports"] : ["book"],
    }
    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "staff", phone: "", password: "" })
    setIsAddUserOpen(false)
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack} className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                User Management
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage system users and permissions
              </p>
            </div>
          </div>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#289E8E] hover:bg-[#289E8E]/90">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "Oswald, sans-serif" }}>Add New User</DialogTitle>
                <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Create a new user account with appropriate permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="role" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: "admin" | "manager" | "staff") => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Administrator
                        </div>
                      </SelectItem>
                      <SelectItem value="manager">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          Manager
                        </div>
                      </SelectItem>
                      <SelectItem value="staff">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Staff
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddUser}
                    disabled={!newUser.name || !newUser.email || !newUser.password}
                    className="bg-[#289E8E] hover:bg-[#289E8E]/90"
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.header>

      <div className="p-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {users.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-[#289E8E]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Admins
                  </p>
                  <p className="text-2xl font-bold text-red-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Staff Members
                  </p>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {users.filter((u) => u.role === "staff").length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>System Users</CardTitle>
              <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Name</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Email</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Role</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Phone</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Status</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Last Login</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((systemUser) => (
                      <TableRow key={systemUser.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(systemUser.role)}
                            {systemUser.name}
                          </div>
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{systemUser.email}</TableCell>
                        <TableCell>{getRoleBadge(systemUser.role)}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{systemUser.phone}</TableCell>
                        <TableCell>{getStatusBadge(systemUser.status)}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{systemUser.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(systemUser.id)}
                              className="gap-1"
                            >
                              {systemUser.status === "active" ? (
                                <>
                                  <EyeOff className="w-4 h-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4" />
                                  Activate
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingUser(systemUser)}
                              className="gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            {systemUser.id !== user.id && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(systemUser.id)}
                                className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
