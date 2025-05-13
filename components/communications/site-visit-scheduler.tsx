"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, MapPin, Clock, Users, CheckCircle2 } from "lucide-react"
import { jobData } from "@/lib/sample-data"

export function SiteVisitScheduler() {
  const { toast } = useToast()
  const [selectedJob, setSelectedJob] = useState("")
  const [visitType, setVisitType] = useState("initial-scan")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [duration, setDuration] = useState("60")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [sendReminder, setSendReminder] = useState(true)
  const [notifyTeam, setNotifyTeam] = useState(true)

  const handleScheduleVisit = () => {
    // Validate required fields
    if (!selectedJob) {
      toast({
        title: "Missing job",
        description: "Please select a job for this site visit",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "Missing date",
        description: "Please select a date for the site visit",
        variant: "destructive",
      })
      return
    }

    // Get job details
    const job = jobData.find((j) => j.id === selectedJob)
    if (!job) return

    // Show success message
    toast({
      title: "Site visit scheduled",
      description: `Site visit scheduled for ${job.homeowner} on ${format(date, "PPP")} at ${time}`,
    })

    // Reset form
    setSelectedJob("")
    setVisitType("initial-scan")
    setDate(new Date())
    setTime("09:00")
    setDuration("60")
    setLocation("")
    setNotes("")
    setSendReminder(true)
    setNotifyTeam(true)
  }

  const getVisitTypeLabel = (type: string) => {
    switch (type) {
      case "initial-scan":
        return "Initial Scan"
      case "follow-up":
        return "Follow-up Visit"
      case "measurement":
        return "Detailed Measurement"
      case "presentation":
        return "Design Presentation"
      case "final-inspection":
        return "Final Inspection"
      default:
        return type
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Schedule Site Visit</h1>
          <p className="text-muted-foreground">Plan and schedule on-site meetings with homeowners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Visit Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job">Select Job</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobData.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.homeowner} - {job.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-type">Visit Type</Label>
                <Select value={visitType} onValueChange={setVisitType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initial-scan">Initial Scan</SelectItem>
                    <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                    <SelectItem value="measurement">Detailed Measurement</SelectItem>
                    <SelectItem value="presentation">Design Presentation</SelectItem>
                    <SelectItem value="final-inspection">Final Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <>
                          <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, "0")}:00`}>
                            {hour.toString().padStart(2, "0")}:00
                          </SelectItem>
                          <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                            {hour.toString().padStart(2, "0")}:30
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="180">3 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Meeting Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Front of the house"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions or equipment needed..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-reminder"
                    checked={sendReminder}
                    onCheckedChange={(checked) => setSendReminder(!!checked)}
                  />
                  <Label htmlFor="send-reminder" className="text-sm font-normal">
                    Send reminder to homeowner 24 hours before visit
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notify-team"
                    checked={notifyTeam}
                    onCheckedChange={(checked) => setNotifyTeam(!!checked)}
                  />
                  <Label htmlFor="notify-team" className="text-sm font-normal">
                    Notify team members about this visit
                  </Label>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleScheduleVisit} className="w-full">
                  Schedule Site Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Visit Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedJob ? (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Job</p>
                    <p className="font-medium">{jobData.find((job) => job.id === selectedJob)?.homeowner || ""}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{jobData.find((job) => job.id === selectedJob)?.address || ""}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Visit Type</p>
                    <p className="font-medium">{getVisitTypeLabel(visitType)}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {date ? format(date, "PPP") : ""} at {time}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {Number.parseInt(duration) < 60
                        ? `${duration} minutes`
                        : `${Number.parseInt(duration) / 60} hour${Number.parseInt(duration) > 60 ? "s" : ""}`}
                    </p>
                  </div>

                  {location && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Meeting Location</p>
                      <p className="font-medium">{location}</p>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {Number.parseInt(duration) < 60
                          ? `${duration} minute visit`
                          : `${Number.parseInt(duration) / 60} hour visit`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{jobData.find((job) => job.id === selectedJob)?.address || ""}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{jobData.find((job) => job.id === selectedJob)?.assignedTo?.name || "Unassigned"}</span>
                    </div>

                    {sendReminder && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Reminder will be sent to homeowner</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-2">
                    <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Job Selected</h3>
                  <p className="text-sm text-muted-foreground mt-1">Select a job to schedule a site visit</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
