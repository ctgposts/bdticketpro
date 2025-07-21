"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Printer, Download, X } from "lucide-react"

interface Booking {
  ticketNo: string
  passengerName: string
  passportNo?: string
  phoneNo?: string
  destination: string
  airline: string
  departureDate: string
  time: string
  totalAmount: number
  paidAmount: number
  agentName: string
  bookingDate: string
}

interface PrintConfirmationProps {
  booking: Booking
  onClose: () => void
}

export default function PrintConfirmation({ booking, onClose }: PrintConfirmationProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 1000)
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    const printContent = document.getElementById("print-confirmation")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Booking Confirmation - ${booking.ticketNo}</title>
              <style>
                ${getConfirmationStyles()}
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const getConfirmationStyles = () => {
    return `
      @media print {
        body { margin: 0; padding: 20px; font-family: 'Arial', sans-serif; }
        .no-print { display: none !important; }
        .print-container { max-width: 100%; }
      }
      
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
      .print-container { max-width: 800px; margin: 0 auto; background: white; }
      .header { background: #289E8E; color: white; padding: 30px; text-align: center; margin-bottom: 30px; }
      .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
      .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
      .confirmation-title { text-align: center; margin: 30px 0; }
      .confirmation-title h2 { color: #289E8E; font-size: 28px; margin: 0; }
      .confirmation-title p { color: #666; margin: 10px 0 0 0; }
      .booking-details { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
      .detail-section h3 { color: #289E8E; border-bottom: 2px solid #289E8E; padding-bottom: 10px; margin-bottom: 20px; }
      .detail-item { margin: 15px 0; }
      .detail-item label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
      .detail-item span { color: #666; font-size: 16px; }
      .amount-section { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 5px solid #289E8E; }
      .amount-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px; }
      .amount-row.total { border-top: 2px solid #289E8E; padding-top: 15px; margin-top: 20px; font-weight: bold; font-size: 20px; color: #289E8E; }
      .footer { text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid #eee; color: #666; }
      .qr-section { text-align: center; margin: 30px 0; }
      .qr-placeholder { width: 120px; height: 120px; border: 2px dashed #ccc; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #999; }
      .important-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 30px 0; }
      .important-note h4 { color: #856404; margin: 0 0 10px 0; }
      .important-note p { color: #856404; margin: 5px 0; }
    `
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="no-print">
          <DialogTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Printer className="w-5 h-5" />
            Print Booking Confirmation
          </DialogTitle>
          <DialogDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
            Print or download booking confirmation for {booking.ticketNo}
          </DialogDescription>
        </DialogHeader>

        <div className="no-print flex items-center justify-end gap-3 mb-4">
          <Button variant="outline" onClick={handleDownloadPDF} className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button onClick={handlePrint} disabled={isPrinting} className="gap-2 bg-[#289E8E] hover:bg-[#289E8E]/90">
            <Printer className="w-4 h-4" />
            {isPrinting ? "Printing..." : "Print"}
          </Button>
          <Button variant="outline" onClick={onClose} className="gap-2 bg-transparent">
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>

        <div id="print-confirmation" className="print-container">
          <style dangerouslySetInnerHTML={{ __html: getConfirmationStyles() }} />

          {/* Header */}
          <div className="header">
            <h1>BD TicketPro</h1>
            <p>Professional Travel Solutions</p>
            <p>📧 info@bdticketpro.com | 📞 +880 1711-123456</p>
          </div>

          {/* Confirmation Title */}
          <div className="confirmation-title">
            <h2>✈️ BOOKING CONFIRMATION</h2>
            <p>Your flight has been successfully booked</p>
          </div>

          {/* Booking Details */}
          <div className="booking-details">
            {/* Flight Information */}
            <div className="detail-section">
              <h3>🛫 Flight Information</h3>
              <div className="detail-item">
                <label>Ticket Number:</label>
                <span>{booking.ticketNo}</span>
              </div>
              <div className="detail-item">
                <label>Airline:</label>
                <span>{booking.airline}</span>
              </div>
              <div className="detail-item">
                <label>Destination:</label>
                <span>{booking.destination}</span>
              </div>
              <div className="detail-item">
                <label>Departure Date:</label>
                <span>{booking.departureDate}</span>
              </div>
              <div className="detail-item">
                <label>Departure Time:</label>
                <span>{booking.time}</span>
              </div>
              <div className="detail-item">
                <label>Booking Date:</label>
                <span>{booking.bookingDate}</span>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="detail-section">
              <h3>👤 Passenger Information</h3>
              <div className="detail-item">
                <label>Passenger Name:</label>
                <span>{booking.passengerName}</span>
              </div>
              {booking.passportNo && (
                <div className="detail-item">
                  <label>Passport Number:</label>
                  <span>{booking.passportNo}</span>
                </div>
              )}
              {booking.phoneNo && (
                <div className="detail-item">
                  <label>Phone Number:</label>
                  <span>{booking.phoneNo}</span>
                </div>
              )}
              <div className="detail-item">
                <label>Booked By:</label>
                <span>{booking.agentName}</span>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="amount-section">
            <h3 style={{ color: "#289E8E", margin: "0 0 20px 0" }}>💰 Payment Information</h3>
            <div className="amount-row">
              <span>Total Amount:</span>
              <span>৳{booking.totalAmount.toLocaleString()}</span>
            </div>
            <div className="amount-row">
              <span>Paid Amount:</span>
              <span>৳{booking.paidAmount.toLocaleString()}</span>
            </div>
            {booking.totalAmount > booking.paidAmount && (
              <div className="amount-row">
                <span>Remaining Balance:</span>
                <span style={{ color: "#e74c3c" }}>৳{(booking.totalAmount - booking.paidAmount).toLocaleString()}</span>
              </div>
            )}
            <div className="amount-row total">
              <span>Payment Status:</span>
              <span>{booking.totalAmount === booking.paidAmount ? "✅ PAID IN FULL" : "⚠️ PARTIAL PAYMENT"}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="qr-section">
            <h3 style={{ color: "#289E8E" }}>📱 QR Code</h3>
            <div className="qr-placeholder">QR Code</div>
            <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
              Scan this QR code for quick access to booking details
            </p>
          </div>

          {/* Important Notes */}
          <div className="important-note">
            <h4>⚠️ Important Information</h4>
            <p>• Please arrive at the airport at least 3 hours before international flights</p>
            <p>• Carry a valid passport and visa (if required) for international travel</p>
            <p>• Check-in online 24 hours before departure to save time</p>
            <p>• Contact us immediately if you need to make any changes to your booking</p>
            <p>• Keep this confirmation with you during travel</p>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>
              <strong>Thank you for choosing BD TicketPro!</strong>
            </p>
            <p>For support: 📧 support@bdticketpro.com | 📞 +880 1711-123456</p>
            <p>Visit us: www.bdticketpro.com</p>
            <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />
            <p style={{ fontSize: "12px", color: "#999" }}>
              This is a computer-generated confirmation. No signature required.
              <br />
              Printed on: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
