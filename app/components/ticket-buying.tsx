"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  Calendar,
  Plane,
  Package,
  TrendingUp,
  Crown,
  Star,
} from "lucide-react"

interface TicketBatch {
  id: string
  batchRef: string
  country: string
  airline: string
  flightDate: string
  flightTime: string
  buyingPrice: number
  quantity: number
  totalCost: number
  agentName: string
  agentContact?: string
  agentAddress?: string
  remarks?: string
  documentUrl?: string
  createdAt: string
  soldCount: number
  availableCount: number
  lockedCount: number
  totalProfit: number
}

export default function TicketBuying() {
  const [activeTab, setActiveTab] = useState("add-batch")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCountry, setFilterCountry] = useState("")
  const [filterAirline, setFilterAirline] = useState("")

  // Sample data
  const [batches] = useState<TicketBatch[]>([
    {
      id: "1",
      batchRef: "BTH-2024-001",
      country: "Saudi Arabia",
      airline: "Air Arabia",
      flightDate: "2024-02-15",
      flightTime: "14:30",
      buyingPrice: 18000,
      quantity: 10,
      totalCost: 180000,
      agentName: "Ahmed Travel Agency",
      agentContact: "+880171234567",
      agentAddress: "Dhaka, Bangladesh",
      remarks: "Premium economy class tickets",
      createdAt: "2024-01-15",
      soldCount: 7,
      availableCount: 3,
      lockedCount: 0,
      totalProfit: 21000,
    },
    {
      id: "2",
      batchRef: "BTH-2024-002",
      country: "UAE",
      airline: "Emirates",
      flightDate: "2024-02-20",
      flightTime: "09:15",
      buyingPrice: 25000,
      quantity: 15,
      totalCost: 375000,
      agentName: "Dubai Express",
      agentContact: "+880181234567",
      remarks: "Business class upgrade available",
      createdAt: "2024-01-18",
      soldCount: 12,
      availableCount: 3,
      lockedCount: 0,
      totalProfit: 36000,
    },
  ])

  const [formData, setFormData] = useState({
    country: "",
    airline: "",
    flightDate: "",
    flightTime: "",
    buyingPrice: "",
    quantity: "",
    agentName: "",
    agentContact: "",
    agentAddress: "",
    remarks: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    setIsAddDialogOpen(false)
    // Reset form
    setFormData({
      country: "",
      airline: "",
      flightDate: "",
      flightTime: "",
      buyingPrice: "",
      quantity: "",
      agentName: "",
      agentContact: "",
      agentAddress: "",
      remarks: "",
    })
  }

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.batchRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.airline.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = !filterCountry || batch.country === filterCountry
    const matchesAirline = !filterAirline || batch.airline === filterAirline
    return matchesSearch && matchesCountry && matchesAirline
  })

  const totalStats = {
    todayBought: 25,
    totalInventory: 450,
    unsoldTickets: 180,
    estimatedProfit: 125000,
  }

  return (
    <div className="space-y-8 p-6 bg-luxury-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-luxury-accent rounded-xl shadow-lg">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-luxury-primary">Ticket Buying Management</h1>
            <p className="text-luxury-secondary">Premium inventory management system</p>
          </div>
        </div>
        <Badge className="badge-luxury">
          <Crown className="h-4 w-4 mr-1" />
          Admin Only
        </Badge>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luxury-secondary font-medium">Today's Tickets Bought</p>
                <p className="text-3xl font-bold text-luxury-primary">{totalStats.todayBought}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luxury-secondary font-medium">Total Inventory</p>
                <p className="text-3xl font-bold text-luxury-primary">{totalStats.totalInventory}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luxury-secondary font-medium">Unsold Tickets</p>
                <p className="text-3xl font-bold text-luxury-primary">{totalStats.unsoldTickets}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Plane className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luxury-secondary font-medium">Estimated Profit</p>
                <p className="text-3xl font-bold text-primary">৳{totalStats.estimatedProfit.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="card-luxury">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-luxury-primary flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Premium Ticket Management
              </CardTitle>
              <CardDescription className="text-luxury-secondary">
                Manage your ticket inventory with luxury and precision
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-luxury">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Batch
                </Button>
              </DialogTrigger>
              <DialogContent className="modal-luxury max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-luxury-primary">Add New Ticket Batch</DialogTitle>
                  <DialogDescription className="text-luxury-secondary">
                    Create a new batch of tickets for your inventory
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger className="input-luxury">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="modal-luxury">
                          <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                          <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                          <SelectItem value="Qatar">🇶🇦 Qatar</SelectItem>
                          <SelectItem value="Kuwait">🇰🇼 Kuwait</SelectItem>
                          <SelectItem value="Oman">🇴🇲 Oman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Airline</Label>
                      <Input
                        placeholder="e.g., Air Arabia"
                        value={formData.airline}
                        onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Flight Date</Label>
                      <Input
                        type="date"
                        value={formData.flightDate}
                        onChange={(e) => setFormData({ ...formData, flightDate: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Flight Time</Label>
                      <Input
                        type="time"
                        value={formData.flightTime}
                        onChange={(e) => setFormData({ ...formData, flightTime: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Buying Price (Per Ticket)</Label>
                      <Input
                        type="number"
                        placeholder="18000"
                        value={formData.buyingPrice}
                        onChange={(e) => setFormData({ ...formData, buyingPrice: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Quantity</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-luxury-primary">Agent/Seller Name</Label>
                    <Input
                      placeholder="Ahmed Travel Agency"
                      value={formData.agentName}
                      onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                      className="input-luxury focus-ring-luxury"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Agent Contact (Optional)</Label>
                      <Input
                        placeholder="+880171234567"
                        value={formData.agentContact}
                        onChange={(e) => setFormData({ ...formData, agentContact: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-luxury-primary">Agent Address (Optional)</Label>
                      <Input
                        placeholder="Dhaka, Bangladesh"
                        value={formData.agentAddress}
                        onChange={(e) => setFormData({ ...formData, agentAddress: e.target.value })}
                        className="input-luxury focus-ring-luxury"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-luxury-primary">Remarks (Optional)</Label>
                    <Textarea
                      placeholder="Additional notes about this batch..."
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      className="input-luxury focus-ring-luxury"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-luxury-primary">Upload Document (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-luxury-secondary">
                        Click to upload invoice or document (PDF, JPG, PNG)
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-luxury">
                      <Package className="h-4 w-4 mr-2" />
                      Add to Inventory
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by batch ref, agent, or airline..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-luxury focus-ring-luxury pl-10"
                />
              </div>
            </div>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="input-luxury w-[180px]">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent className="modal-luxury">
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                <SelectItem value="Qatar">🇶🇦 Qatar</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAirline} onValueChange={setFilterAirline}>
              <SelectTrigger className="input-luxury w-[180px]">
                <SelectValue placeholder="Filter by airline" />
              </SelectTrigger>
              <SelectContent className="modal-luxury">
                <SelectItem value="all">All Airlines</SelectItem>
                <SelectItem value="Air Arabia">Air Arabia</SelectItem>
                <SelectItem value="Emirates">Emirates</SelectItem>
                <SelectItem value="Qatar Airways">Qatar Airways</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="table-luxury rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-luxury-accent/30">
                  <TableHead className="text-luxury-primary font-semibold">Batch Ref</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Country</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Airline</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Flight Date</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Qty</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Buying Price</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Total Cost</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Agent</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Status</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Profit</TableHead>
                  <TableHead className="text-luxury-primary font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id} className="table-row-luxury">
                    <TableCell className="font-medium text-luxury-primary">{batch.batchRef}</TableCell>
                    <TableCell className="text-luxury-secondary">{batch.country}</TableCell>
                    <TableCell className="text-luxury-secondary">{batch.airline}</TableCell>
                    <TableCell className="text-luxury-secondary">{batch.flightDate}</TableCell>
                    <TableCell className="text-luxury-secondary">{batch.quantity}</TableCell>
                    <TableCell className="text-luxury-secondary">৳{batch.buyingPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-luxury-secondary">৳{batch.totalCost.toLocaleString()}</TableCell>
                    <TableCell className="text-luxury-secondary">{batch.agentName}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Badge className="badge-luxury text-xs">{batch.soldCount} Sold</Badge>
                        <Badge variant="outline" className="text-xs">
                          {batch.availableCount} Available
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-primary font-semibold">৳{batch.totalProfit.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive bg-transparent">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
