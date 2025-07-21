import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BD TicketPro - Premium Travel Management",
  description: "Luxury travel agency management system with premium features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-luxury-gradient min-h-screen antialiased">
        <div className="min-h-screen bg-luxury-gradient">{children}</div>
      </body>
    </html>
  )
}
