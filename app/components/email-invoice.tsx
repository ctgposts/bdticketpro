"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Mail, Send, Copy, Eye } from "lucide-react"

interface Booking {
  ticketNo: string
  passengerName: string
  destination: string
  airline: string
  departureDate: string
  time: string
  totalAmount: number
  paidAmount: number
  agentName: string
  agentEmail: string
  bookingDate: string
}

interface EmailInvoiceProps {
  booking: Booking
  onClose: () => void
  onSent: () => void
}

export default function EmailInvoice({ booking, onClose, onSent }: EmailInvoiceProps) {
  const [emailForm, setEmailForm] = useState({
    to: booking.agentEmail,
    cc: "",
    subject: `Invoice for Ticket ${booking.ticketNo} - ${booking.passengerName}`,
    message: `Dear ${booking.agentName},

Please find attached the invoice for the flight booking.

Booking Details:
- Ticket Number: ${booking.ticketNo}
- Passenger: ${booking.passengerName}
- Destination: ${booking.destination}
- Flight Date: ${booking.departureDate}
- Total Amount: ৳${booking.totalAmount.toLocaleString()}

Thank you for your business.

Best regards,
BD TicketPro Team`,
  })

  const [isSending, setIsSending] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSendEmail = async () => {
    setIsSending(true)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    onSent()
    onClose()
  }

  const generateInvoiceHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice - ${booking.ticketNo}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .invoice-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: #289E8E; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .invoice-details div h3 { margin: 0 0 10px 0; color: #333; }
        .invoice-details div p { margin: 5px 0; color: #666; }
        .booking-info { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .booking-info h3 { margin: 0 0 15px 0; color: #289E8E; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { }
        .info-item label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
        .info-item span { color: #666; }
        .amount-summary { background: #289E8E; color: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .amount-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .total-row { border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px; margin-top: 15px; font-size: 18px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h1>BD TicketPro</h1>
            <p>Professional Travel Solutions</p>
        </div>
        
        <div class="content">
            <div class="invoice-details">
                <div>
                    <h3>Invoice To:</h3>
                    <p><strong>${booking.agentName}</strong></p>
                    <p>${booking.agentEmail}</p>
                </div>
                <div style="text-align: right;">
                    <h3>Invoice Details:</h3>
                    <p><strong>Invoice #:</strong> INV-${booking.ticketNo}</p>
                    <p><strong>Date:</strong> ${booking.bookingDate}</p>
                    <p><strong>Status:</strong> <span style="color: #28a745;">Confirmed</span></p>
                </div>
            </div>
            
            <div class="booking-info">
                <h3>Flight Booking Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Ticket Number:</label>
                        <span>${booking.ticketNo}</span>
                    </div>
                    <div class="info-item">
                        <label>Passenger Name:</label>
                        <span>${booking.passengerName}</span>
                    </div>
                    <div class="info-item">
                        <label>Airline:</label>
                        <span>${booking.airline}</span>
                    </div>
                    <div class="info-item">
                        <label>Destination:</label>
                        <span>${booking.destination}</span>
                    </div>
                    <div class="info-item">
                        <label>Departure Date:</label>
                        <span>${booking.departureDate}</span>
                    </div>
                    <div class="info-item">
                        <label>Departure Time:</label>
                        <span>${booking.time}</span>
                    </div>
                </div>
            </div>
            
            <div class="amount-summary">
                <div class="amount-row">
                    <span>Ticket Price:</span>
                    <span>৳${booking.totalAmount.toLocaleString()}</span>
                </div>
                <div class="amount-row">
                    <span>Paid Amount:</span>
                    <span>৳${booking.paidAmount.toLocaleString()}</span>
                </div>
                ${
                  booking.totalAmount > booking.paidAmount
                    ? `
                <div class="amount-row">
                    <span>Remaining:</span>
                    <span>৳${(booking.totalAmount - booking.paidAmount).toLocaleString()}</span>
                </div>
                `
                    : ""
                }
                <div class="amount-row total-row">
                    <span>Total Amount:</span>
                    <span>৳${booking.totalAmount.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing BD TicketPro!</p>
            <p>For any queries, please contact us at support@bdticketpro.com</p>
        </div>
    </div>
</body>
</html>
    `
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Mail className="w-5 h-5" />
            Send Invoice Email
          </DialogTitle>
          <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
            Send invoice email for ticket {booking.ticketNo}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="to" style={{ fontFamily: "Montserrat, sans-serif" }}>
                To Email
              </Label>
              <Input
                id="to"
                type="email"
                value={emailForm.to}
                onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                placeholder="Enter recipient email"
              />
            </div>
            <div>
              <Label htmlFor="cc" style={{ fontFamily: "Montserrat, sans-serif" }}>
                CC (Optional)
              </Label>
              <Input
                id="cc"
                type="email"
                value={emailForm.cc}
                onChange={(e) => setEmailForm({ ...emailForm, cc: e.target.value })}
                placeholder="Enter CC email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Subject
            </Label>
            <Input
              id="subject"
              value={emailForm.subject}
              onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <Label htmlFor="message" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Message
            </Label>
            <Textarea
              id="message"
              value={emailForm.message}
              onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
              placeholder="Enter email message"
              rows={8}
            />
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
              Invoice Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Ticket:</span>
                <span className="font-medium ml-2">{booking.ticketNo}</span>
              </div>
              <div>
                <span className="text-gray-600">Passenger:</span>
                <span className="font-medium ml-2">{booking.passengerName}</span>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium ml-2">৳{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="font-medium ml-2 text-green-600">Confirmed</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="gap-2">
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide Preview" : "Preview Invoice"}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(generateInvoiceHTML())}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy HTML
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSending}>
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={isSending || !emailForm.to}
                className="bg-[#289E8E] hover:bg-[#289E8E]/90 gap-2"
              >
                {isSending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Invoice
                  </>
                )}
              </Button>
            </div>
          </div>

          {showPreview && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Invoice Preview</Label>
              <div
                className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-white"
                dangerouslySetInnerHTML={{ __html: generateInvoiceHTML() }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
