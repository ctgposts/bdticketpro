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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, CreditCard, AlertCircle, CheckCircle, Clock, DollarSign, Plus, Eye } from "lucide-react"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface Payment {
  id: string
  ticketNo: string
  passengerName: string
  destination: string
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  paymentStatus: "full" | "partial" | "pending"
  paymentMethod: string
  dueDate: string
  lastPayment: string
  agentName: string
  notes: string
}

interface PaymentTrackingProps {
  user: User
  onBack: () => void
}

export default function PaymentTracking({ user, onBack }: PaymentTrackingProps) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      ticketNo: "BD001",
      passengerName: "Ahmed Hassan",
      destination: "Dubai, UAE",
      totalAmount: 45000,
      paidAmount: 45000,
      remainingAmount: 0,
      paymentStatus: "full",
      paymentMethod: "Bank Transfer",
      dueDate: "2024-01-20",
      lastPayment: "2024-01-18",
      agentName: "Karim Travel",
      notes: "Payment completed on time",
    },
    {
      id: "2",
      ticketNo: "BD002",
      passengerName: "Rashida Begum",
      destination: "Doha, Qatar",
      totalAmount: 48000,
      paidAmount: 25000,
      remainingAmount: 23000,
      paymentStatus: "partial",
      paymentMethod: "Cash",
      dueDate: "2024-01-25",
      lastPayment: "2024-01-20",
      agentName: "Sundarban Tours",
      notes: "Partial payment received, balance due",
    },
    {
      id: "3",
      ticketNo: "BD003",
      passengerName: "Mohammad Rahman",
      destination: "Abu Dhabi, UAE",
      totalAmount: 46500,
      paidAmount: 0,
      remainingAmount: 46500,
      paymentStatus: "pending",
      paymentMethod: "Not specified",
      dueDate: "2024-01-22",
      lastPayment: "Never",
      agentName: "Cox's Bazar Express",
      notes: "Payment overdue - follow up required",
    },
    {
      id: "4",
      ticketNo: "BD004",
      passengerName: "Salma Khatun",
      destination: "Kuwait City",
      totalAmount: 41000,
      paidAmount: 30000,
      remainingAmount: 11000,
      paymentStatus: "partial",
      paymentMethod: "Mobile Banking",
      dueDate: "2024-01-28",
      lastPayment: "2024-01-22",
      agentName: "Sylhet Sky Tours",
      notes: "Second installment pending",
    },
  ])

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [newPaymentAmount, setNewPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentNotes, setPaymentNotes] = useState("")

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "full":
        return <Badge className="bg-green-100 text-green-800">Paid Full</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "full":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "partial":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const handleAddPayment = () => {
    if (selectedPayment && newPaymentAmount) {
      const amount = Number.parseFloat(newPaymentAmount)
      const updatedPayment = {
        ...selectedPayment,
        paidAmount: selectedPayment.paidAmount + amount,
        remainingAmount: selectedPayment.remainingAmount - amount,
        lastPayment: new Date().toISOString().split("T")[0],
        paymentMethod: paymentMethod || selectedPayment.paymentMethod,
        notes: paymentNotes || selectedPayment.notes,
      }

      // Update payment status
      if (updatedPayment.remainingAmount <= 0) {
        updatedPayment.paymentStatus = "full"
        updatedPayment.remainingAmount = 0
      } else {
        updatedPayment.paymentStatus = "partial"
      }

      setPayments(payments.map((p) => (p.id === selectedPayment.id ? updatedPayment : p)))
      setSelectedPayment(null)
      setIsAddPaymentOpen(false)
      setNewPaymentAmount("")
      setPaymentMethod("")
      setPaymentNotes("")
    }
  }

  const totalPending = payments.reduce((sum, p) => sum + p.remainingAmount, 0)
  const totalReceived = payments.reduce((sum, p) => sum + p.paidAmount, 0)
  const pendingCount = payments.filter((p) => p.paymentStatus === "pending").length
  const partialCount = payments.filter((p) => p.paymentStatus === "partial").length

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
                Payment Tracking
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Monitor and manage payment collections
              </p>
            </div>
          </div>
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
                    Total Received
                  </p>
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{totalReceived.toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Total Pending
                  </p>
                  <p className="text-2xl font-bold text-red-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{totalPending.toLocaleString()}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Pending Payments
                  </p>
                  <p className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {pendingCount}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Partial Payments
                  </p>
                  <p className="text-2xl font-bold text-yellow-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                    {partialCount}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payments Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Payment Records</CardTitle>
              <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                Track all payment transactions and outstanding amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Ticket</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Passenger</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Destination</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Total Amount</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Paid</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Remaining</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Status</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Due Date</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Agent</TableHead>
                      <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {payment.ticketNo}
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{payment.passengerName}</TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{payment.destination}</TableCell>
                        <TableCell className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          ৳{payment.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className="text-green-600 font-semibold"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          ৳{payment.paidAmount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className="text-red-600 font-semibold"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          ৳{payment.remainingAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.paymentStatus)}
                            {getPaymentStatusBadge(payment.paymentStatus)}
                          </div>
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                          <span
                            className={
                              payment.paymentStatus === "pending" && new Date(payment.dueDate) < new Date()
                                ? "text-red-600 font-semibold"
                                : ""
                            }
                          >
                            {payment.dueDate}
                          </span>
                        </TableCell>
                        <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{payment.agentName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPayment(payment)}
                              className="gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                            {payment.remainingAmount > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPayment(payment)
                                  setIsAddPaymentOpen(true)
                                }}
                                className="gap-1 text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <Plus className="w-4 h-4" />
                                Add Payment
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

      {/* Add Payment Dialog */}
      <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "Oswald, sans-serif" }}>Add Payment</DialogTitle>
            <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
              Record a new payment for {selectedPayment?.ticketNo}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Passenger:</span>
                    <div className="font-semibold">{selectedPayment.passengerName}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Destination:</span>
                    <div className="font-semibold">{selectedPayment.destination}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <div className="font-semibold">৳{selectedPayment.totalAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Remaining:</span>
                    <div className="font-semibold text-red-600">
                      ৳{selectedPayment.remainingAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="amount" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Payment Amount (৳)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPaymentAmount}
                  onChange={(e) => setNewPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                  max={selectedPayment.remainingAmount}
                />
              </div>

              <div>
                <Label htmlFor="method" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Payment Method
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile_banking">Mobile Banking</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Enter payment notes"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddPaymentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPayment}
                  disabled={!newPaymentAmount || Number.parseFloat(newPaymentAmount) <= 0}
                  className="bg-[#289E8E] hover:bg-[#289E8E]/90 gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Record Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
