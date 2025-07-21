"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, AlertCircle, CheckCircle, Info } from "lucide-react"

interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired?: boolean
}

interface NotificationSystemProps {
  user: {
    id: string
    name: string
    role: "admin" | "manager" | "staff"
    email: string
  }
}

export default function NotificationSystem({ user }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "warning",
      title: "Payment Overdue",
      message: "Payment for ticket BD003 is overdue by 2 days",
      timestamp: "2024-01-24 10:30",
      read: false,
      actionRequired: true,
    },
    {
      id: "2",
      type: "error",
      title: "Booking Expiry Alert",
      message: "Ticket BD006 will expire in 2 hours if not confirmed",
      timestamp: "2024-01-24 14:30",
      read: false,
      actionRequired: true,
    },
    {
      id: "3",
      type: "warning",
      title: "Booking Expiry Warning",
      message: "Ticket BD007 will expire in 6 hours - confirmation needed",
      timestamp: "2024-01-24 12:00",
      read: false,
      actionRequired: true,
    },
    {
      id: "4",
      type: "success",
      title: "Booking Confirmed",
      message: "Ticket BD005 has been successfully confirmed",
      timestamp: "2024-01-24 09:15",
      read: false,
    },
    {
      id: "5",
      type: "info",
      title: "New Agent Registration",
      message: "Dhaka Express Travel has registered as a new agent",
      timestamp: "2024-01-24 08:45",
      read: true,
    },
    {
      id: "6",
      type: "error",
      title: "System Alert",
      message: "Failed to sync with Emirates booking system",
      timestamp: "2024-01-24 08:00",
      read: false,
      actionRequired: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [showToast, setShowToast] = useState<Notification | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "error":
        return "border-l-red-500 bg-red-50"
      default:
        return "border-l-blue-500 bg-blue-50"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const checkBookingExpiries = () => {
    // This would typically check the database for bookings that are close to expiry
    // For demo purposes, we'll simulate this
    const now = new Date()

    // Simulate checking for bookings that will expire in 24 hours
    const potentialExpiries = [
      { ticketNo: "BD008", hoursLeft: 4 },
      { ticketNo: "BD009", hoursLeft: 12 },
      { ticketNo: "BD010", hoursLeft: 20 },
    ]

    potentialExpiries.forEach((booking) => {
      if (booking.hoursLeft <= 24) {
        const existingNotification = notifications.find((n) => n.message.includes(booking.ticketNo))

        if (!existingNotification) {
          const newNotification: Notification = {
            id: Date.now().toString() + Math.random(),
            type: booking.hoursLeft <= 2 ? "error" : "warning",
            title: booking.hoursLeft <= 2 ? "Booking Expiry Alert" : "Booking Expiry Warning",
            message: `Ticket ${booking.ticketNo} will expire in ${booking.hoursLeft} hours if not confirmed`,
            timestamp: now.toISOString().replace("T", " ").substring(0, 16),
            read: false,
            actionRequired: true,
          }

          setNotifications((prev) => [newNotification, ...prev])
        }
      }
    })
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(
      () => {
        // Check for booking expiries every 30 minutes
        checkBookingExpiries()

        // Randomly show a toast notification
        if (Math.random() > 0.95 && notifications.length > 0) {
          const unreadNotifications = notifications.filter((n) => !n.read)
          if (unreadNotifications.length > 0) {
            const randomNotification = unreadNotifications[Math.floor(Math.random() * unreadNotifications.length)]
            setShowToast(randomNotification)
            setTimeout(() => setShowToast(null), 5000)
          }
        }
      },
      30 * 60 * 1000,
    ) // Check every 30 minutes

    return () => clearInterval(interval)
  }, [notifications])

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="relative gap-2 bg-transparent"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* Notification Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-96 z-50"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg" style={{ fontFamily: "Oswald, sans-serif" }}>
                      Notifications
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                          Mark all read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {unreadCount} unread notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      No notifications
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${getNotificationColor(
                            notification.type,
                          )} ${!notification.read ? "bg-opacity-100" : "bg-opacity-50"}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4
                                  className={`text-sm font-medium ${!notification.read ? "text-black" : "text-gray-600"}`}
                                  style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
                                  {notification.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-red-100"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                              <p
                                className={`text-sm mt-1 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}
                                style={{ fontFamily: "Montserrat, sans-serif" }}
                              >
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span
                                  className="text-xs text-gray-400"
                                  style={{ fontFamily: "Montserrat, sans-serif" }}
                                >
                                  {notification.timestamp}
                                </span>
                                {notification.actionRequired && (
                                  <Badge variant="destructive" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 300 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 300 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className={`w-80 border-l-4 ${getNotificationColor(showToast.type)} shadow-lg`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(showToast.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {showToast.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {showToast.message}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowToast(null)} className="h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
