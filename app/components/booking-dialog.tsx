"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Plane,
  Phone,
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Mail,
  Printer,
} from "lucide-react"
import EmailInvoice from "./email-invoice"
import PrintConfirmation from "./print-confirmation"

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
}

interface BookingDialogProps {
  ticket: Ticket
  user: User
  country: Country
  onClose: () => void
  onUpdate: (ticketId: string, updates: Partial<Ticket>) => void
}

export default function BookingDialog({ ticket, user, country, onClose, onUpdate }: BookingDialogProps) {
  const [bookingForm, setBookingForm] = useState({
    agentName: "",
    agentAddress: "",
    agentPhone: "",
    passengerName: "",
    passportNo: "",
    mobileNo: "",
    paxCount: 1,
    sellingPrice: ticket.price,
    comments: "",
    paymentStatus: "full" as "full" | "partial",
    partialAmount: 0,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [showEmailInvoice, setShowEmailInvoice] = useState(false)
  const [showPrintConfirmation, setShowPrintConfirmation] = useState(false)

  const canConfirmBooking = user.role === "admin" || user.role === "manager"
  const isViewOnly = ticket.lockStatus === "sold"
  const isBookingConfirmed = ticket.lockStatus === "sold" && ticket.isConfirmed

  const handleInputChange = (field: string, value: any) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBooking = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (canConfirmBooking) {
      // Confirm booking immediately
      onUpdate(ticket.id, {
        isConfirmed: true,
        lockStatus: "sold",
      })
    } else {
      // Lock ticket for 24 hours
      const lockExpiry = new Date()
      lockExpiry.setHours(lockExpiry.getHours() + 24)

      onUpdate(ticket.id, {
        lockStatus: "locked",
        lockedBy: user.name,
        lockExpiry: lockExpiry.toISOString(),
      })
    }

    setIsProcessing(false)
    onClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "locked":
        return "bg-orange-100 text-orange-800"
      case "sold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3" style={{ fontFamily: "Oswald, sans-serif" }}>
            <div className="p-2 bg-[#289E8E] rounded-lg">
              <Plane className="w-5 h-5 text-white" />
            </div>
            Ticket Details & Booking
          </DialogTitle>
          <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
            {isViewOnly ? "View ticket information" : "Complete the booking form below"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="text-2xl">{country.flag}</span>
                Flight Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Serial Number
                  </Label>
                  <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {ticket.serialNo}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Status
                  </Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(ticket.lockStatus)}>{ticket.lockStatus.toUpperCase()}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-[#289E8E]" />
                  <div>
                    <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {ticket.airlineName}
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Airline
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#289E8E]" />
                  <div>
                    <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {ticket.departureDate} ({ticket.day})
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Departure Date
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#289E8E]" />
                  <div>
                    <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {ticket.time}
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Departure Time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#289E8E]" />
                  <div>
                    <p className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {country.name}
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Destination
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Selling Price:
                  </span>
                  <span className="font-bold text-lg" style={{ fontFamily: "Oswald, sans-serif" }}>
                    ৳{ticket.price.toLocaleString()}
                  </span>
                </div>
                {user.role === "admin" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Buying Price:
                    </span>
                    <span className="font-semibold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      ৳{ticket.buyingPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {user.role === "admin" && (
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-green-600 font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Profit Margin:
                    </span>
                    <span className="font-bold text-green-600" style={{ fontFamily: "Oswald, sans-serif" }}>
                      ৳{(ticket.price - ticket.buyingPrice).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {ticket.lockStatus === "locked" && ticket.lockedBy && (
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 text-orange-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Ticket Locked
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 mt-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Locked by: {ticket.lockedBy}
                  </p>
                  {ticket.lockExpiry && (
                    <p className="text-sm text-orange-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Expires: {new Date(ticket.lockExpiry).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Form */}
          {!isViewOnly && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Booking Information</CardTitle>
                <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Fill in the details to complete the booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Agent Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                    <Phone className="w-4 h-4" />
                    Agent Information
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="agentName" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Agent Name
                      </Label>
                      <Input
                        id="agentName"
                        value={bookingForm.agentName}
                        onChange={(e) => handleInputChange("agentName", e.target.value)}
                        placeholder="Enter agent name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="agentAddress" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Agent Address
                      </Label>
                      <Textarea
                        id="agentAddress"
                        value={bookingForm.agentAddress}
                        onChange={(e) => handleInputChange("agentAddress", e.target.value)}
                        placeholder="Enter agent address"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="agentPhone" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Agent Phone
                      </Label>
                      <Input
                        id="agentPhone"
                        value={bookingForm.agentPhone}
                        onChange={(e) => handleInputChange("agentPhone", e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Passenger Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                    <Phone className="w-4 h-4" />
                    Passenger Information
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="passengerName" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Passenger Name
                      </Label>
                      <Input
                        id="passengerName"
                        value={bookingForm.passengerName}
                        onChange={(e) => handleInputChange("passengerName", e.target.value)}
                        placeholder="Enter passenger name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="passportNo" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Passport Number
                        </Label>
                        <Input
                          id="passportNo"
                          value={bookingForm.passportNo}
                          onChange={(e) => handleInputChange("passportNo", e.target.value)}
                          placeholder="Enter passport number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="mobileNo" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Mobile Number
                        </Label>
                        <Input
                          id="mobileNo"
                          value={bookingForm.mobileNo}
                          onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="paxCount" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Passenger Count
                        </Label>
                        <Select
                          value={bookingForm.paxCount.toString()}
                          onValueChange={(value) => handleInputChange("paxCount", Number.parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} Passenger{num > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                    <CreditCard className="w-4 h-4" />
                    Payment Information
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="sellingPrice" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Selling Price (৳)
                      </Label>
                      <Input
                        id="sellingPrice"
                        type="number"
                        value={bookingForm.sellingPrice}
                        onChange={(e) => handleInputChange("sellingPrice", Number.parseInt(e.target.value) || 0)}
                        placeholder="Enter selling price"
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentStatus" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Payment Status
                      </Label>
                      <Select
                        value={bookingForm.paymentStatus}
                        onValueChange={(value: "full" | "partial") => handleInputChange("paymentStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Payment</SelectItem>
                          <SelectItem value="partial">Partial Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {bookingForm.paymentStatus === "partial" && (
                      <div>
                        <Label htmlFor="partialAmount" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          Partial Amount (৳)
                        </Label>
                        <Input
                          id="partialAmount"
                          type="number"
                          value={bookingForm.partialAmount}
                          onChange={(e) => handleInputChange("partialAmount", Number.parseInt(e.target.value) || 0)}
                          placeholder="Enter partial payment amount"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="comments" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Comments
                      </Label>
                      <Textarea
                        id="comments"
                        value={bookingForm.comments}
                        onChange={(e) => handleInputChange("comments", e.target.value)}
                        placeholder="Enter any additional comments"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {!canConfirmBooking && !isViewOnly && (
              <div className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-4 h-4" />
                Booking will be locked for 24 hours pending manager approval
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isBookingConfirmed && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowEmailInvoice(true)} className="gap-2">
                  <Mail className="w-4 h-4" />
                  Email Invoice
                </Button>
                <Button variant="outline" onClick={() => setShowPrintConfirmation(true)} className="gap-2">
                  <Printer className="w-4 h-4" />
                  Print Confirmation
                </Button>
              </div>
            )}

            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              {isViewOnly ? "Close" : "Cancel"}
            </Button>

            {!isViewOnly && ticket.lockStatus === "available" && (
              <Button
                onClick={handleBooking}
                disabled={isProcessing || !bookingForm.agentName || !bookingForm.passengerName}
                className="bg-[#289E8E] hover:bg-[#289E8E]/90 text-white gap-2"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {canConfirmBooking ? "Confirm Booking" : "Lock & Submit"}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>

      {showEmailInvoice && (
        <EmailInvoice
          booking={{
            ticketNo: ticket.serialNo,
            passengerName: bookingForm.passengerName,
            destination: country.name,
            airline: ticket.airlineName,
            departureDate: ticket.departureDate,
            time: ticket.time,
            totalAmount: bookingForm.sellingPrice,
            paidAmount: bookingForm.paymentStatus === "full" ? bookingForm.sellingPrice : bookingForm.partialAmount,
            agentName: bookingForm.agentName,
            agentEmail: bookingForm.agentEmail || "agent@example.com",
            bookingDate: new Date().toISOString().split("T")[0],
          }}
          onClose={() => setShowEmailInvoice(false)}
          onSent={() => {
            // Handle successful email send
            console.log("Invoice sent successfully")
          }}
        />
      )}

      {showPrintConfirmation && (
        <PrintConfirmation
          booking={{
            ticketNo: ticket.serialNo,
            passengerName: bookingForm.passengerName,
            passportNo: bookingForm.passportNo,
            phoneNo: bookingForm.mobileNo,
            destination: country.name,
            airline: ticket.airlineName,
            departureDate: ticket.departureDate,
            time: ticket.time,
            totalAmount: bookingForm.sellingPrice,
            paidAmount: bookingForm.paymentStatus === "full" ? bookingForm.sellingPrice : bookingForm.partialAmount,
            agentName: bookingForm.agentName,
            bookingDate: new Date().toISOString().split("T")[0],
          }}
          onClose={() => setShowPrintConfirmation(false)}
        />
      )}
    </Dialog>
  )
}
