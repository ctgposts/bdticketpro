"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Eye, ShoppingCart, Lock, Unlock, CheckCircle, XCircle, Plane, Search } from "lucide-react"
import BookingDialog from "./booking-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface Country {
  id: string
  name: string
  code: string
  flag: string
  totalTickets: number
  availableTickets: number
  popularDestinations: string[]
}

interface Ticket {
  id: string
  serialNo: string
  airlineName: string
  departureDate: string
  day: string
  time: string
  price: number
  buyingPrice: number
  isConfirmed: boolean
  lockStatus: "available" | "locked" | "sold"
  lockedBy?: string
  lockExpiry?: string
  passengerName?: string
  passportNo?: string
  phoneNo?: string
}

interface TicketTableProps {
  user: User
  country: Country
  onBack: () => void
}

export default function TicketTable({ user, country, onBack }: TicketTableProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState<"all" | "passport" | "phone">("all")
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      serialNo: "BD001",
      airlineName: "Emirates",
      departureDate: "2024-01-25",
      day: "Thursday",
      time: "14:30",
      price: 45000,
      buyingPrice: 42000,
      isConfirmed: false,
      lockStatus: "available",
      passengerName: "Ahmed Hassan",
      passportNo: "BD1234567",
      phoneNo: "+880 1711-123456",
    },
    {
      id: "2",
      serialNo: "BD002",
      airlineName: "Qatar Airways",
      departureDate: "2024-01-26",
      day: "Friday",
      time: "09:15",
      price: 48000,
      buyingPrice: 44500,
      isConfirmed: true,
      lockStatus: "sold",
      passengerName: "Rashida Begum",
      passportNo: "BD2345678",
      phoneNo: "+880 1712-234567",
    },
    {
      id: "3",
      serialNo: "BD003",
      airlineName: "Etihad Airways",
      departureDate: "2024-01-27",
      day: "Saturday",
      time: "16:45",
      price: 46500,
      buyingPrice: 43000,
      isConfirmed: false,
      lockStatus: "locked",
      lockedBy: "Staff User",
      lockExpiry: "2024-01-24 18:30",
      passengerName: "Kamal Hossain",
      passportNo: "BD3456789",
      phoneNo: "+880 1713-345678",
    },
    {
      id: "4",
      serialNo: "BD004",
      airlineName: "Flydubai",
      departureDate: "2024-01-28",
      day: "Sunday",
      time: "11:20",
      price: 38000,
      buyingPrice: 35500,
      isConfirmed: false,
      lockStatus: "available",
      passengerName: "Farida Akter",
      passportNo: "BD4567890",
      phoneNo: "+880 1714-456789",
    },
    {
      id: "5",
      serialNo: "BD005",
      airlineName: "Kuwait Airways",
      departureDate: "2024-01-29",
      day: "Monday",
      time: "20:10",
      price: 41000,
      buyingPrice: 38000,
      isConfirmed: false,
      lockStatus: "available",
      passengerName: "Jasim Uddin",
      passportNo: "BD5678901",
      phoneNo: "+880 1715-567890",
    },
  ])

  const canViewBuyingPrice = user.role === "admin"
  const canUnlockTickets = user.role === "admin"
  const canBook = user.role !== "staff" || tickets.find((t) => t.id === selectedTicket?.id)?.lockStatus === "available"

  const handleTicketUpdate = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, ...updates } : ticket)))
  }

  const handleUnlock = (ticketId: string) => {
    if (canUnlockTickets) {
      handleTicketUpdate(ticketId, {
        lockStatus: "available",
        lockedBy: undefined,
        lockExpiry: undefined,
      })
    }
  }

  const getLockStatusBadge = (ticket: Ticket) => {
    switch (ticket.lockStatus) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "locked":
        return <Badge className="bg-orange-100 text-orange-800">Locked</Badge>
      case "sold":
        return <Badge className="bg-red-100 text-red-800">Sold Out</Badge>
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    if (searchType === "passport") {
      return ticket.passportNo?.toLowerCase().includes(searchLower)
    } else if (searchType === "phone") {
      return ticket.phoneNo?.toLowerCase().includes(searchLower)
    } else {
      return (
        ticket.passengerName?.toLowerCase().includes(searchLower) ||
        ticket.passportNo?.toLowerCase().includes(searchLower) ||
        ticket.phoneNo?.toLowerCase().includes(searchLower) ||
        ticket.serialNo?.toLowerCase().includes(searchLower)
      )
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Countries
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{country.flag}</div>
            <div>
              <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                {country.name} Tickets
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Available flight tickets to {country.name}
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by passport number, phone, or passenger name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={searchType} onValueChange={(value: "all" | "passport" | "phone") => setSearchType(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="passport">Passport Only</SelectItem>
                  <SelectItem value="phone">Phone Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="p-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total
                  </p>
                  <p className="text-xl font-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {tickets.length}
                  </p>
                </div>
                <Plane className="w-8 h-8 text-[#289E8E]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Available
                  </p>
                  <p className="text-xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {tickets.filter((t) => t.lockStatus === "available").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Locked
                  </p>
                  <p className="text-xl font-bold text-orange-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {tickets.filter((t) => t.lockStatus === "locked").length}
                  </p>
                </div>
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Sold
                  </p>
                  <p className="text-xl font-bold text-red-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {tickets.filter((t) => t.lockStatus === "sold").length}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tickets Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Flight Tickets</CardTitle>
              <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                Manage and book flight tickets for {country.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Serial No.</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Airline</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Date</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Day</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Time</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Price</TableHead>
                      {canViewBuyingPrice && (
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Buying Price</TableHead>
                      )}
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Confirmed</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Status</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {ticket.serialNo}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{ticket.airlineName}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{ticket.departureDate}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{ticket.day}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{ticket.time}</TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          ৳{ticket.price.toLocaleString()}
                        </TableCell>
                        {canViewBuyingPrice && (
                          <TableCell className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{ticket.buyingPrice.toLocaleString()}
                          </TableCell>
                        )}
                        <TableCell>
                          {ticket.isConfirmed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell>{getLockStatusBadge(ticket)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                              className="gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>

                            {ticket.lockStatus === "available" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => setSelectedTicket(ticket)}
                                className="gap-1 bg-[#289E8E] hover:bg-[#289E8E]/90"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Book
                              </Button>
                            )}

                            {ticket.lockStatus === "locked" && canUnlockTickets && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnlock(ticket.id)}
                                className="gap-1 text-orange-600 border-orange-200 hover:bg-orange-50"
                              >
                                <Unlock className="w-4 h-4" />
                                Unlock
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

      {/* Booking Dialog */}
      {selectedTicket && (
        <BookingDialog
          ticket={selectedTicket}
          user={user}
          country={country}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleTicketUpdate}
        />
      )}
    </div>
  )
}
