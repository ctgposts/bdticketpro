"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { ArrowLeft, Plus, Edit, Trash2, Phone, MapPin, Building, TrendingUp, Clock } from "lucide-react"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface Agent {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  totalBookings: number
  totalRevenue: number
  status: "active" | "inactive"
  joinedDate: string
  lastBooking: string
  commission: number
  commissionEarned: number
  commissionPaid: number
  commissionPending: number
}

interface AgentManagementProps {
  user: User
  onBack: () => void
}

export default function AgentManagement({ user, onBack }: AgentManagementProps) {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Karim Travel Agency",
      company: "Karim Tours & Travels",
      email: "info@karimtravel.com",
      phone: "+880 1711-555001",
      address: "123 Dhanmondi Road",
      city: "Dhaka",
      country: "Bangladesh",
      totalBookings: 145,
      totalRevenue: 2850000,
      status: "active",
      joinedDate: "2023-06-15",
      lastBooking: "2024-01-24",
      commission: 5.5,
      commissionEarned: 156750,
      commissionPaid: 120000,
      commissionPending: 36750,
    },
    {
      id: "2",
      name: "Sundarban Tours",
      company: "Sundarban Travel Solutions",
      email: "booking@sundarbantours.com",
      phone: "+880 1712-555002",
      address: "456 Gulshan Avenue",
      city: "Dhaka",
      country: "Bangladesh",
      totalBookings: 89,
      totalRevenue: 1750000,
      status: "active",
      joinedDate: "2023-08-20",
      lastBooking: "2024-01-23",
      commission: 4.8,
      commissionEarned: 84000,
      commissionPaid: 84000,
      commissionPending: 0,
    },
    {
      id: "3",
      name: "Cox's Bazar Express",
      company: "CBX Travel Ltd",
      email: "info@cbxtravel.com",
      phone: "+880 1713-555003",
      address: "789 Chittagong Road",
      city: "Cox's Bazar",
      country: "Bangladesh",
      totalBookings: 67,
      totalRevenue: 1320000,
      status: "active",
      joinedDate: "2023-09-10",
      lastBooking: "2024-01-22",
      commission: 4.2,
      commissionEarned: 55440,
      commissionPaid: 55440,
      commissionPending: 0,
    },
    {
      id: "4",
      name: "Sylhet Sky Tours",
      company: "Sky High Travels",
      email: "contact@sylhetsky.com",
      phone: "+880 1714-555004",
      address: "321 Zindabazar",
      city: "Sylhet",
      country: "Bangladesh",
      totalBookings: 34,
      totalRevenue: 680000,
      status: "inactive",
      joinedDate: "2023-11-05",
      lastBooking: "2024-01-15",
      commission: 3.5,
      commissionEarned: 23800,
      commissionPaid: 0,
      commissionPending: 23800,
    },
  ])

  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [newAgent, setNewAgent] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Bangladesh",
    commission: 5.0,
  })

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    )
  }

  const handleAddAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      ...newAgent,
      totalBookings: 0,
      totalRevenue: 0,
      status: "active",
      joinedDate: new Date().toISOString().split("T")[0],
      lastBooking: "Never",
      commissionEarned: 0,
      commissionPaid: 0,
      commissionPending: 0,
    }
    setAgents([...agents, agent])
    setNewAgent({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "Bangladesh",
      commission: 5.0,
    })
    setIsAddAgentOpen(false)
  }

  const handleToggleStatus = (agentId: string) => {
    setAgents(
      agents.map((a) => (a.id === agentId ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a)),
    )
  }

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter((a) => a.id !== agentId))
  }

  const totalAgents = agents.length
  const activeAgents = agents.filter((a) => a.status === "active").length
  const totalRevenue = agents.reduce((sum, a) => sum + a.totalRevenue, 0)
  const totalBookings = agents.reduce((sum, a) => sum + a.totalBookings, 0)

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
                Agent Management
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage travel agents and partnerships
              </p>
            </div>
          </div>

          <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#289E8E] hover:bg-[#289E8E]/90">
                <Plus className="w-4 h-4" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "Oswald, sans-serif" }}>Add New Agent</DialogTitle>
                <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Register a new travel agent partner
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Agent Name
                  </Label>
                  <Input
                    id="name"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <Label htmlFor="company" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    value={newAgent.company}
                    onChange={(e) => setNewAgent({ ...newAgent, company: e.target.value })}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newAgent.phone}
                    onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={newAgent.address}
                    onChange={(e) => setNewAgent({ ...newAgent, address: e.target.value })}
                    placeholder="Enter full address"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="city" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    City
                  </Label>
                  <Input
                    id="city"
                    value={newAgent.city}
                    onChange={(e) => setNewAgent({ ...newAgent, city: e.target.value })}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="commission" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Commission (%)
                  </Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    value={newAgent.commission}
                    onChange={(e) => setNewAgent({ ...newAgent, commission: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="Enter commission rate"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddAgent}
                    disabled={!newAgent.name || !newAgent.email || !newAgent.phone}
                    className="bg-[#289E8E] hover:bg-[#289E8E]/90"
                  >
                    Add Agent
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
                    Total Agents
                  </p>
                  <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {totalAgents}
                  </p>
                </div>
                <Building className="w-8 h-8 text-[#289E8E]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Active Agents
                  </p>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {activeAgents}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{totalRevenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-purple-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {totalBookings}
                  </p>
                </div>
                <Phone className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total Commissions
                  </p>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{agents.reduce((sum, a) => sum + a.commissionEarned, 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Pending Commissions
                  </p>
                  <p className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{agents.reduce((sum, a) => sum + a.commissionPending, 0).toLocaleString()}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agents Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Travel Agents</CardTitle>
              <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage agent partnerships and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Agent Name</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Company</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Contact</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Location</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Bookings</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Revenue</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Commission</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Commission Earned</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Commission Paid</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Pending</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Status</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agents.map((agent) => (
                      <TableRow key={agent.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {agent.name}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{agent.company}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3" />
                              {agent.phone}
                            </div>
                            <div className="text-sm text-gray-600">{agent.email}</div>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {agent.city}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {agent.totalBookings}
                        </TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          ৳{agent.totalRevenue.toLocaleString()}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{agent.commission}%</TableCell>
                        <TableCell
                          className="font-semibold text-green-600"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          ৳{agent.commissionEarned.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className="font-semibold text-blue-600"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          ৳{agent.commissionPaid.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className="font-semibold text-orange-600"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          ৳{agent.commissionPending.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(agent.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(agent.id)}
                              className="gap-1"
                            >
                              {agent.status === "active" ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingAgent(agent)}
                              className="gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAgent(agent.id)}
                              className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
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
