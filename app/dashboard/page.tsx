"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Plane, Users, DollarSign, TrendingUp, MapPin, Star, Bell, Settings, Plus, Download } from "lucide-react"
import CountryTickets from "../components/country-tickets"
import SalesReport from "../components/sales-report"
import UserManagement from "../components/user-management"
import AirlineManagement from "../components/airline-management"
import AdvancedReporting from "../components/advanced-reporting"
import PaymentTracking from "../components/payment-tracking"
import TicketTable from "../components/ticket-table"
import BackupSystem from "../components/backup-system"
import NotificationSystem from "../components/notification-system"
import AgentManagement from "../components/agent-management"
import BookingDialog from "../components/booking-dialog"
import TicketBuying from "../components/ticket-buying"

export const dynamic = "force-dynamic"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user] = useState({
    name: "Admin User",
    role: "Administrator",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  const stats = [
    {
      title: "Total Bookings",
      value: "2,847",
      change: "+12.5%",
      icon: <Plane className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      icon: <Users className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "৳12,45,000",
      change: "+15.3%",
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-primary",
    },
    {
      title: "Growth Rate",
      value: "23.4%",
      change: "+5.1%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
    },
  ]

  const recentBookings = [
    {
      id: "BK001",
      passenger: "Ahmed Rahman",
      destination: "Bangkok, Thailand",
      date: "2024-01-15",
      amount: "৳45,000",
      status: "Confirmed",
      airline: "Thai Airways",
    },
    {
      id: "BK002",
      passenger: "Fatima Khan",
      destination: "Dubai, UAE",
      date: "2024-01-14",
      amount: "৳65,000",
      status: "Pending",
      airline: "Emirates",
    },
    {
      id: "BK003",
      passenger: "Mohammad Ali",
      destination: "Kuala Lumpur, Malaysia",
      date: "2024-01-13",
      amount: "৳38,000",
      status: "Confirmed",
      airline: "Malaysia Airlines",
    },
  ]

  const quickActions = [
    {
      title: "New Booking",
      description: "Create a new flight booking",
      icon: <Plus className="h-5 w-5" />,
      action: () => setActiveTab("booking"),
    },
    {
      title: "Ticket Buying",
      description: "Manage ticket inventory",
      icon: <Crown className="h-5 w-5" />,
      action: () => setActiveTab("ticket-buying"),
    },
    {
      title: "View Reports",
      description: "Access detailed analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => setActiveTab("reports"),
    },
    {
      title: "Manage Users",
      description: "User administration",
      icon: <Users className="h-5 w-5" />,
      action: () => setActiveTab("users"),
    },
  ]

  return (
    <div className="min-h-screen bg-luxury-gradient">
      {/* Header */}
      <header className="nav-luxury sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-luxury-primary">BD TicketPro</h1>
                <p className="text-sm text-luxury-muted">Premium Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{user?.name?.charAt(0) || "A"}</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-luxury-primary">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-luxury-muted">{user?.role || "Administrator"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-luxury-card/80 backdrop-blur-sm rounded-xl p-2 border border-border/50">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-1 bg-transparent h-auto p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Crown className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="destinations"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Destinations
              </TabsTrigger>
              <TabsTrigger
                value="booking"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Booking
              </TabsTrigger>
              <TabsTrigger
                value="ticket-buying"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Crown className="h-4 w-4 mr-2" />
                Buying
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="airlines"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Plane className="h-4 w-4 mr-2" />
                Airlines
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Star className="h-4 w-4 mr-2" />
                Tickets
              </TabsTrigger>
              <TabsTrigger
                value="backup"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Download className="h-4 w-4 mr-2" />
                Backup
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger
                value="agents"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                <Users className="h-4 w-4 mr-2" />
                Agents
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-luxury-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="card-luxury animate-luxury-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-luxury-muted">{stat.title}</p>
                        <p className="text-2xl font-bold text-luxury-primary">{stat.value}</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change}
                        </p>
                      </div>
                      <div className={`${stat.color} bg-primary/10 p-3 rounded-lg`}>{stat.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Admin Summary Section */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury-primary flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Admin Ticket Buying Summary
                </CardTitle>
                <CardDescription className="text-luxury-secondary">
                  Exclusive inventory management and bulk purchasing overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">156</div>
                    <div className="text-sm text-luxury-muted">Active Batches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">৳2.4M</div>
                    <div className="text-sm text-luxury-muted">Total Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">18.5%</div>
                    <div className="text-sm text-luxury-muted">Avg. Profit Margin</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button onClick={() => setActiveTab("ticket-buying")} className="btn-luxury">
                    <Crown className="h-4 w-4 mr-2" />
                    Access Buying Module
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury-primary">Quick Actions</CardTitle>
                <CardDescription className="text-luxury-secondary">
                  Frequently used features for efficient management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 border-border/50 bg-transparent"
                      onClick={action.action}
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">{action.icon}</div>
                      <div className="text-center">
                        <div className="font-medium text-luxury-primary">{action.title}</div>
                        <div className="text-xs text-luxury-muted">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-luxury-primary">Recent Bookings</CardTitle>
                <CardDescription className="text-luxury-secondary">
                  Latest flight reservations and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-luxury-accent/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Plane className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-luxury-primary">{booking.passenger}</p>
                          <p className="text-sm text-luxury-muted">{booking.destination}</p>
                          <p className="text-xs text-luxury-muted">{booking.airline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-luxury-primary">{booking.amount}</p>
                        <p className="text-sm text-luxury-muted">{booking.date}</p>
                        <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"} className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="destinations">
            <CountryTickets />
          </TabsContent>

          <TabsContent value="booking">
            <BookingDialog />
          </TabsContent>

          <TabsContent value="ticket-buying">
            <TicketBuying />
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <SalesReport />
              <AdvancedReporting />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="airlines">
            <AirlineManagement />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentTracking />
          </TabsContent>

          <TabsContent value="tickets">
            <TicketTable />
          </TabsContent>

          <TabsContent value="backup">
            <BackupSystem />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSystem />
          </TabsContent>

          <TabsContent value="agents">
            <AgentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
