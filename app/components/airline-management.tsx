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
import { ArrowLeft, Plus, Edit, Trash2, Plane, TrendingUp, Globe } from "lucide-react"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface Airline {
  id: string
  name: string
  code: string
  country: string
  logo: string
  totalRoutes: number
  activeTickets: number
  totalRevenue: number
  status: "active" | "inactive"
  commission: number
  contactEmail: string
  contactPhone: string
}

interface AirlineManagementProps {
  user: User
  onBack: () => void
}

export default function AirlineManagement({ user, onBack }: AirlineManagementProps) {
  const [airlines, setAirlines] = useState<Airline[]>([
    {
      id: "1",
      name: "Emirates",
      code: "EK",
      country: "UAE",
      logo: "🇦🇪",
      totalRoutes: 12,
      activeTickets: 45,
      totalRevenue: 2250000,
      status: "active",
      commission: 8.5,
      contactEmail: "booking@emirates.com",
      contactPhone: "+971-4-214-4444",
    },
    {
      id: "2",
      name: "Qatar Airways",
      code: "QR",
      country: "Qatar",
      logo: "🇶🇦",
      totalRoutes: 8,
      activeTickets: 32,
      totalRevenue: 1680000,
      status: "active",
      commission: 7.8,
      contactEmail: "reservations@qatarairways.com",
      contactPhone: "+974-4013-0000",
    },
    {
      id: "3",
      name: "Etihad Airways",
      code: "EY",
      country: "UAE",
      logo: "🇦🇪",
      totalRoutes: 6,
      activeTickets: 28,
      totalRevenue: 1400000,
      status: "active",
      commission: 7.2,
      contactEmail: "booking@etihad.com",
      contactPhone: "+971-2-599-0000",
    },
    {
      id: "4",
      name: "Kuwait Airways",
      code: "KU",
      country: "Kuwait",
      logo: "🇰🇼",
      totalRoutes: 4,
      activeTickets: 18,
      totalRevenue: 720000,
      status: "active",
      commission: 6.5,
      contactEmail: "info@kuwaitairways.com",
      contactPhone: "+965-171-7171",
    },
    {
      id: "5",
      name: "Flydubai",
      code: "FZ",
      country: "UAE",
      logo: "🇦🇪",
      totalRoutes: 5,
      activeTickets: 22,
      totalRevenue: 880000,
      status: "active",
      commission: 6.0,
      contactEmail: "contact@flydubai.com",
      contactPhone: "+971-4-245-7777",
    },
    {
      id: "6",
      name: "Oman Air",
      code: "WY",
      country: "Oman",
      logo: "🇴🇲",
      totalRoutes: 3,
      activeTickets: 12,
      totalRevenue: 480000,
      status: "inactive",
      commission: 5.5,
      contactEmail: "booking@omanair.com",
      contactPhone: "+968-2453-3333",
    },
  ])

  const [isAddAirlineOpen, setIsAddAirlineOpen] = useState(false)
  const [editingAirline, setEditingAirline] = useState<Airline | null>(null)
  const [newAirline, setNewAirline] = useState({
    name: "",
    code: "",
    country: "",
    logo: "",
    commission: 5.0,
    contactEmail: "",
    contactPhone: "",
  })

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    )
  }

  const handleAddAirline = () => {
    const airline: Airline = {
      id: Date.now().toString(),
      ...newAirline,
      totalRoutes: 0,
      activeTickets: 0,
      totalRevenue: 0,
      status: "active",
    }
    setAirlines([...airlines, airline])
    setNewAirline({
      name: "",
      code: "",
      country: "",
      logo: "",
      commission: 5.0,
      contactEmail: "",
      contactPhone: "",
    })
    setIsAddAirlineOpen(false)
  }

  const handleToggleStatus = (airlineId: string) => {
    setAirlines(
      airlines.map((a) => (a.id === airlineId ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a)),
    )
  }

  const handleDeleteAirline = (airlineId: string) => {
    setAirlines(airlines.filter((a) => a.id !== airlineId))
  }

  const totalAirlines = airlines.length
  const activeAirlines = airlines.filter((a) => a.status === "active").length
  const totalRevenue = airlines.reduce((sum, a) => sum + a.totalRevenue, 0)
  const totalTickets = airlines.reduce((sum, a) => sum + a.activeTickets, 0)

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
                Airline Management
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage airline partnerships and routes
              </p>
            </div>
          </div>

          <Dialog open={isAddAirlineOpen} onOpenChange={setIsAddAirlineOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#289E8E] hover:bg-[#289E8E]/90">
                <Plus className="w-4 h-4" />
                Add Airline
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "Oswald, sans-serif" }}>Add New Airline</DialogTitle>
                <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Register a new airline partner
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Airline Name
                  </Label>
                  <Input
                    id="name"
                    value={newAirline.name}
                    onChange={(e) => setNewAirline({ ...newAirline, name: e.target.value })}
                    placeholder="Enter airline name"
                  />
                </div>
                <div>
                  <Label htmlFor="code" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Airline Code
                  </Label>
                  <Input
                    id="code"
                    value={newAirline.code}
                    onChange={(e) => setNewAirline({ ...newAirline, code: e.target.value.toUpperCase() })}
                    placeholder="Enter IATA code (e.g., EK)"
                    maxLength={3}
                  />
                </div>
                <div>
                  <Label htmlFor="country" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Country
                  </Label>
                  <Select
                    value={newAirline.country}
                    onValueChange={(value) => setNewAirline({ ...newAirline, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UAE">United Arab Emirates</SelectItem>
                      <SelectItem value="Qatar">Qatar</SelectItem>
                      <SelectItem value="Kuwait">Kuwait</SelectItem>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="Oman">Oman</SelectItem>
                      <SelectItem value="Bahrain">Bahrain</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="logo" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Flag/Logo
                  </Label>
                  <Input
                    id="logo"
                    value={newAirline.logo}
                    onChange={(e) => setNewAirline({ ...newAirline, logo: e.target.value })}
                    placeholder="Enter flag emoji or logo"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Contact Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={newAirline.contactEmail}
                    onChange={(e) => setNewAirline({ ...newAirline, contactEmail: e.target.value })}
                    placeholder="Enter contact email"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    value={newAirline.contactPhone}
                    onChange={(e) => setNewAirline({ ...newAirline, contactPhone: e.target.value })}
                    placeholder="Enter contact phone"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="commission" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Commission Rate (%)
                  </Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    value={newAirline.commission}
                    onChange={(e) =>
                      setNewAirline({ ...newAirline, commission: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Enter commission rate"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddAirlineOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddAirline}
                    disabled={!newAirline.name || !newAirline.code || !newAirline.country}
                    className="bg-[#289E8E] hover:bg-[#289E8E]/90"
                  >
                    Add Airline
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
                    Total Airlines
                  </p>
                  <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {totalAirlines}
                  </p>
                </div>
                <Plane className="w-8 h-8 text-[#289E8E]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Active Airlines
                  </p>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {activeAirlines}
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
                    Active Tickets
                  </p>
                  <p className="text-2xl font-bold text-purple-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {totalTickets}
                  </p>
                </div>
                <Globe className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Airlines Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Airlines</CardTitle>
              <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage airline partnerships and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Airline</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Code</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Country</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Routes</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Active Tickets</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Revenue</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Commission</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Status</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {airlines.map((airline) => (
                      <TableRow key={airline.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{airline.logo}</span>
                            <div>
                              <div className="font-semibold">{airline.name}</div>
                              <div className="text-sm text-gray-600">{airline.contactEmail}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {airline.code}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{airline.country}</TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {airline.totalRoutes}
                        </TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {airline.activeTickets}
                        </TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          ৳{airline.totalRevenue.toLocaleString()}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{airline.commission}%</TableCell>
                        <TableCell>{getStatusBadge(airline.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(airline.id)}
                              className="gap-1"
                            >
                              {airline.status === "active" ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingAirline(airline)}
                              className="gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAirline(airline.id)}
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
