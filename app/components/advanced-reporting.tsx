"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, TrendingUp, TrendingDown, Filter, FileText, PieChart } from "lucide-react"

interface User {
  id: string
  name: string
  role: "admin" | "manager" | "staff"
  email: string
}

interface AdvancedReportingProps {
  user: User
  onBack: () => void
}

interface ReportData {
  period: string
  totalSales: number
  totalRevenue: number
  totalProfit: number
  avgTicketPrice: number
  topDestination: string
  topAirline: string
  conversionRate: number
}

export default function AdvancedReporting({ user, onBack }: AdvancedReportingProps) {
  const [reportType, setReportType] = useState("overview")
  const [timePeriod, setTimePeriod] = useState("monthly")
  const [selectedYear, setSelectedYear] = useState("2024")

  // Mock advanced report data
  const reportData: ReportData[] = [
    {
      period: "January 2024",
      totalSales: 156,
      totalRevenue: 7800000,
      totalProfit: 780000,
      avgTicketPrice: 50000,
      topDestination: "Dubai, UAE",
      topAirline: "Emirates",
      conversionRate: 68.5,
    },
    {
      period: "February 2024",
      totalSales: 142,
      totalRevenue: 7100000,
      totalProfit: 710000,
      avgTicketPrice: 50000,
      topDestination: "Doha, Qatar",
      topAirline: "Qatar Airways",
      conversionRate: 71.2,
    },
    {
      period: "March 2024",
      totalSales: 189,
      totalRevenue: 9450000,
      totalProfit: 945000,
      avgTicketPrice: 50000,
      topDestination: "Dubai, UAE",
      topAirline: "Emirates",
      conversionRate: 73.8,
    },
  ]

  const destinationData = [
    { destination: "Dubai, UAE", bookings: 89, revenue: 4450000, percentage: 28.5 },
    { destination: "Doha, Qatar", bookings: 67, revenue: 3350000, percentage: 21.4 },
    { destination: "Riyadh, KSA", bookings: 54, revenue: 2700000, percentage: 17.3 },
    { destination: "Kuwait City", bookings: 43, revenue: 2150000, percentage: 13.8 },
    { destination: "Abu Dhabi, UAE", bookings: 35, revenue: 1750000, percentage: 11.2 },
    { destination: "Muscat, Oman", bookings: 25, revenue: 1250000, percentage: 8.0 },
  ]

  const airlineData = [
    { airline: "Emirates", bookings: 98, revenue: 4900000, commission: 8.5, profit: 416500 },
    { airline: "Qatar Airways", bookings: 76, revenue: 3800000, commission: 7.8, profit: 296400 },
    { airline: "Etihad Airways", bookings: 58, revenue: 2900000, commission: 7.2, profit: 208800 },
    { airline: "Kuwait Airways", bookings: 45, revenue: 2250000, commission: 6.5, profit: 146250 },
    { airline: "Flydubai", bookings: 36, revenue: 1800000, commission: 6.0, profit: 108000 },
  ]

  const monthlyTrends = [
    { month: "Jan", sales: 156, revenue: 7800000, growth: 12.5 },
    { month: "Feb", sales: 142, revenue: 7100000, growth: -8.9 },
    { month: "Mar", sales: 189, revenue: 9450000, growth: 33.1 },
    { month: "Apr", sales: 167, revenue: 8350000, growth: -11.6 },
    { month: "May", sales: 198, revenue: 9900000, growth: 18.6 },
    { month: "Jun", sales: 203, revenue: 10150000, growth: 2.5 },
  ]

  const exportReport = (type: string) => {
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `${type}-report-${timestamp}.csv`

    let csvContent = ""

    if (type === "destinations") {
      csvContent = [
        "Destination,Bookings,Revenue,Percentage",
        ...destinationData.map((d) => `${d.destination},${d.bookings},${d.revenue},${d.percentage}%`),
      ].join("\n")
    } else if (type === "airlines") {
      csvContent = [
        "Airline,Bookings,Revenue,Commission,Profit",
        ...airlineData.map((a) => `${a.airline},${a.bookings},${a.revenue},${a.commission}%,${a.profit}`),
      ].join("\n")
    } else {
      csvContent = [
        "Month,Sales,Revenue,Growth",
        ...monthlyTrends.map((m) => `${m.month},${m.sales},${m.revenue},${m.growth}%`),
      ].join("\n")
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

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
                Advanced Analytics
              </h1>
              <p className="text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Comprehensive business intelligence and insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Business Overview</SelectItem>
                <SelectItem value="destinations">Destination Analysis</SelectItem>
                <SelectItem value="airlines">Airline Performance</SelectItem>
                <SelectItem value="trends">Monthly Trends</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => exportReport(reportType)} className="gap-2 bg-[#289E8E] hover:bg-[#289E8E]/90">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <Filter className="w-5 h-5" />
                Report Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 mb-2 block"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Time Period
                  </label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-gray-700 mb-2 block"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Year
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <FileText className="w-4 h-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Content */}
        {reportType === "overview" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Total Sales (YTD)
                      </p>
                      <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                        1,245
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          +15.3%
                        </span>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-[#289E8E]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Revenue (YTD)
                      </p>
                      <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                        ৳62.25M
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          +18.7%
                        </span>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Avg. Ticket Price
                      </p>
                      <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                        ৳50,000
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          -2.1%
                        </span>
                      </div>
                    </div>
                    <PieChart className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold text-black" style={{ fontFamily: "Oswald, sans-serif" }}>
                        71.2%
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          +4.8%
                        </span>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Monthly Performance</CardTitle>
                <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Sales and revenue trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Month</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Sales</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Revenue</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Growth</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Top Destination</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Top Airline</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.map((data, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {data.period}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{data.totalSales}</TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{data.totalRevenue.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {index > 0 && data.totalSales > reportData[index - 1].totalSales ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              )}
                              <span
                                className={`text-sm ${index > 0 && data.totalSales > reportData[index - 1].totalSales ? "text-green-600" : "text-red-600"}`}
                              >
                                {index > 0
                                  ? `${(((data.totalSales - reportData[index - 1].totalSales) / reportData[index - 1].totalSales) * 100).toFixed(1)}%`
                                  : "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{data.topDestination}</TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{data.topAirline}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {reportType === "destinations" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Destination Performance</CardTitle>
                <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Analysis of bookings and revenue by destination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Destination</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Bookings</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Revenue</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Market Share</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Avg. Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {destinationData.map((dest, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {dest.destination}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{dest.bookings}</TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{dest.revenue.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#289E8E] h-2 rounded-full"
                                  style={{ width: `${dest.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                {dest.percentage}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{Math.round(dest.revenue / dest.bookings).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {reportType === "airlines" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle style={{ fontFamily: "Oswald, sans-serif" }}>Airline Performance</CardTitle>
                <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Revenue and profitability analysis by airline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Airline</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Bookings</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Revenue</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Commission Rate</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Our Profit</TableHead>
                        <TableHead style={{ fontFamily: "Montserrat, sans-serif" }}>Avg. Ticket</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {airlineData.map((airline, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {airline.airline}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>{airline.bookings}</TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{airline.revenue.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" style={{ fontFamily: "Montserrat, sans-serif" }}>
                              {airline.commission}%
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="font-semibold text-green-600"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            ৳{airline.profit.toLocaleString()}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Montserrat, sans-serif" }}>
                            ৳{Math.round(airline.revenue / airline.bookings).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
