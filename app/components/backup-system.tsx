"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Database,
  FileText,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"

interface BackupSystemProps {
  user: {
    id: string
    name: string
    role: "admin" | "manager" | "staff"
    email: string
  }
}

interface BackupHistory {
  id: string
  type: "auto" | "manual"
  status: "success" | "failed" | "in-progress"
  date: string
  size: string
  duration: string
}

export default function BackupSystem({ user }: BackupSystemProps) {
  const [isAutoBackupEnabled, setIsAutoBackupEnabled] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [backupProgress, setBackupProgress] = useState(0)
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [lastBackup, setLastBackup] = useState("2024-01-24 10:30")
  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([
    {
      id: "1",
      type: "auto",
      status: "success",
      date: "2024-01-24 10:30",
      size: "12.5 MB",
      duration: "2m 15s",
    },
    {
      id: "2",
      type: "manual",
      status: "success",
      date: "2024-01-23 15:45",
      size: "11.8 MB",
      duration: "1m 58s",
    },
    {
      id: "3",
      type: "auto",
      status: "failed",
      date: "2024-01-23 10:30",
      size: "0 MB",
      duration: "0m 45s",
    },
  ])

  const startManualBackup = async () => {
    setIsBackingUp(true)
    setBackupProgress(0)

    // Simulate backup progress
    const intervals = [10, 25, 45, 70, 85, 100]
    for (const progress of intervals) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setBackupProgress(progress)
    }

    // Add to history
    const newBackup: BackupHistory = {
      id: Date.now().toString(),
      type: "manual",
      status: "success",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      size: "13.2 MB",
      duration: "2m 30s",
    }

    setBackupHistory([newBackup, ...backupHistory])
    setLastBackup(newBackup.date)
    setIsBackingUp(false)
    setBackupProgress(0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Auto-backup simulation
  useEffect(() => {
    if (isAutoBackupEnabled) {
      const interval = setInterval(() => {
        // Simulate auto backup every 24 hours
        const now = new Date()
        const lastBackupTime = new Date(lastBackup)
        const hoursDiff = (now.getTime() - lastBackupTime.getTime()) / (1000 * 60 * 60)

        if (hoursDiff >= 24) {
          // Trigger auto backup
          console.log("Auto backup triggered")
        }
      }, 60000) // Check every minute

      return () => clearInterval(interval)
    }
  }, [isAutoBackupEnabled, lastBackup])

  return (
    <div className="space-y-6">
      {/* Backup Status */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Cloud className="w-5 h-5" />
            Google Drive Backup
          </CardTitle>
          <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>
            Automatic backup to Google Drive every {backupFrequency}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-3">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                Connected
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Google Drive synced
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-blue-50 rounded-lg mb-3">
                <Clock className="w-8 h-8 text-blue-500 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                Last Backup
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {lastBackup}
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-purple-50 rounded-lg mb-3">
                <Database className="w-8 h-8 text-purple-500 mx-auto" />
              </div>
              <h4 className="font-semibold mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                Data Size
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                13.2 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup Controls */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <Settings className="w-5 h-5" />
            Backup Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto Backup Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Automatic Backup
              </Label>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Enable automatic backups to Google Drive
              </p>
            </div>
            <Switch checked={isAutoBackupEnabled} onCheckedChange={setIsAutoBackupEnabled} />
          </div>

          {/* Backup Frequency */}
          <div className="space-y-2">
            <Label className="text-base font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Backup Frequency
            </Label>
            <Select value={backupFrequency} onValueChange={setBackupFrequency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Every Hour</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manual Backup */}
          <div className="space-y-3">
            <Label className="text-base font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Manual Backup
            </Label>

            {isBackingUp && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Backing up data...
                  </span>
                  <span className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {backupProgress}%
                  </span>
                </div>
                <Progress value={backupProgress} className="h-2" />
              </div>
            )}

            <Button
              onClick={startManualBackup}
              disabled={isBackingUp}
              className="w-full bg-[#289E8E] hover:bg-[#289E8E]/90 gap-2"
            >
              {isBackingUp ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Backing Up...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Start Manual Backup
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            <FileText className="w-5 h-5" />
            Backup History
          </CardTitle>
          <CardDescription style={{ fontFamily: "Montserrat, sans-serif" }}>Recent backup activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(backup.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {backup.type === "auto" ? "Automatic" : "Manual"} Backup
                      </span>
                      {getStatusBadge(backup.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {backup.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        {backup.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {backup.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
