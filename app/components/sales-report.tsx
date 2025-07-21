"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Users, Plane, Calendar, Download, BarChart3, Crown } from "lucide-react"

interface SalesData {
  period: string
  revenue: number
  bookings: number
  customers: number
  growth: number
}

const salesData: SalesData[] = [
  { period: "January", revenue: 1250000, bookings: 245, customers: 189, growth: 12.5 },
  { period: "February", revenue: 1380000, bookings: 267, customers: 203, growth: 10.4 },
  { period: "March", revenue: 1520000, bookings: 298, customers: 234, growth: 15.2 },
  { period: "April", revenue: 1420000, bookings: 278, customers: 215, growth: -6.6 },
  { period: "May", revenue: 1680000, bookings: 325, customers: 267, growth: 18.3 },
  { period: "June", revenue: 1750000, bookings: 342, customers: 289, growth: 4.2 },
]

const topDestinations = [
  { destination: "Bangkok, Thailand", bookings: 89, revenue: 4005000, growth: 15.2 },
  { destination: "Dubai, UAE", bookings: 67, revenue: 4355000, growth: 22.1 },
  { destination: "Kuala Lumpur, Malaysia", bookings: 78, revenue: 2964000, growth: 8.7 },
  { destination: "Singapore", bookings: 45, revenue: 2340000, growth: 12.3 },
  { destination: "Delhi, India", bookings: 92, revenue: 2300000, growth: 5.8 },
]

export default function SalesReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("BDT", "৳")
  }

  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0)
  const totalBookings = salesData.reduce((sum, data) => sum + data.bookings, 0)
  const totalCustomers = salesData.reduce((sum, data) => sum + data.customers, 0)
  const avgGrowth = salesData.reduce((sum, data) => sum + data.growth, 0) / salesData.length

  return (
    <div className="space-y-6 animate-luxury-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-luxury-primary flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Sales Analytics
          </h2>
          <p className="text-luxury-secondary mt-1">Comprehensive sales performance and revenue insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 input-luxury">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="btn-luxury">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-luxury-muted">Total Revenue</p>
                <p className="text-2xl font-bold text-luxury-primary">{formatCurrency(totalRevenue)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />+{avgGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-luxury-muted">Total Bookings</p>
                <p className="text-2xl font-bold text-luxury-primary">{totalBookings.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2%
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Plane className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-luxury-muted">Active Customers</p>
                <p className="text-2xl font-bold text-luxury-primary">{totalCustomers.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.4%
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-luxury-muted">Avg. Growth</p>
                <p className="text-2xl font-bold text-luxury-primary">{avgGrowth.toFixed(1)}%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Positive Trend
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-luxury-primary flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Monthly Performance
          </CardTitle>
          <CardDescription className="text-luxury-secondary">
            Revenue and booking trends over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={data.period} className="flex items-center justify-between p-4 bg-luxury-accent/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-luxury-primary">{data.period}</p>
                    <p className="text-sm text-luxury-muted">{data.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-luxury-primary">{formatCurrency(data.revenue)}</p>
                  <div className="flex items-center gap-1">
                    {data.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-sm ${data.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {data.growth >= 0 ? "+" : ""}
                      {data.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Destinations */}
      <Card className="card-luxury">
        <CardHeader>
          <CardTitle className="text-luxury-primary flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            Top Performing Destinations
          </CardTitle>
          <CardDescription className="text-luxury-secondary">
            Most popular destinations by revenue and bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDestinations.map((dest, index) => (
              <div
                key={dest.destination}
                className="flex items-center justify-between p-4 bg-luxury-accent/20 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-luxury-primary">{dest.destination}</p>
                    <p className="text-sm text-luxury-muted">{dest.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-luxury-primary">{formatCurrency(dest.revenue)}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-sm text-green-600">+{dest.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="text-luxury-primary">Revenue Breakdown</CardTitle>
            <CardDescription className="text-luxury-secondary">Revenue distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">International Flights</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-luxury-accent rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-luxury-primary font-medium">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Domestic Flights</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-luxury-accent rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-primary/70 rounded-full"></div>
                  </div>
                  <span className="text-luxury-primary font-medium">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Other Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-luxury-accent rounded-full overflow-hidden">
                    <div className="w-1/12 h-full bg-primary/50 rounded-full"></div>
                  </div>
                  <span className="text-luxury-primary font-medium">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="text-luxury-primary">Customer Insights</CardTitle>
            <CardDescription className="text-luxury-secondary">Customer behavior and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Repeat Customers</span>
                <Badge className="badge-luxury">68%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Average Booking Value</span>
                <Badge className="badge-luxury">৳52,000</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Customer Satisfaction</span>
                <Badge className="badge-luxury">4.8/5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-luxury-secondary">Booking Conversion</span>
                <Badge className="badge-luxury">23.4%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
