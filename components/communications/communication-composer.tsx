"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Mail,
  MessageSquare,
  Phone,
  CalendarIcon,
  X,
  FileText,
  ImageIcon,
  LinkIcon,
  Paperclip,
  Send,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { communicationTemplates } from "@/lib/communications-data"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  address: string
}

interface CommunicationComposerProps {
  type: "email" | "sms" | "call" | "meeting"
  contacts: Contact[]
  selectedContactId?: string | null
  onClose: () => void
}

export function CommunicationComposer({ type, contacts, selectedContactId, onClose }: CommunicationComposerProps) {
  const { toast } = useToast()
  const [selectedContact, setSelectedContact] = useState<string>(selectedContactId || "")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [duration, setDuration] = useState("30")
  const [template, setTemplate] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])

  // Set the icon and title based on communication type
  const getTypeInfo = () => {
    switch (type) {
      case "email":
        return { icon: <Mail className="h-5 w-5" />, title: "New Email" }
      case "sms":
        return { icon: <MessageSquare className="h-5 w-5" />, title: "New SMS" }
      case "call":
        return { icon: <Phone className="h-5 w-5" />, title: "Log Call" }
      case "meeting":
        return { icon: <CalendarIcon className="h-5 w-5" />, title: "Schedule Meeting" }
    }
  }

  const { icon, title } = getTypeInfo()

  // Apply template when selected
  useEffect(() => {
    if (template) {
      const selectedTemplate = communicationTemplates.find((t) => t.id === template)
      if (selectedTemplate) {
        setSubject(selectedTemplate.subject || "")

        // Replace placeholders with actual contact info if a contact is selected
        if (selectedContact) {
          const contact = contacts.find((c) => c.id === selectedContact)
          if (contact) {
            let processedMessage = selectedTemplate.content
            processedMessage = processedMessage.replace(/\{name\}/g, contact.name)
            processedMessage = processedMessage.replace(/\{address\}/g, contact.address)
            setMessage(processedMessage)
          } else {
            setMessage(selectedTemplate.content)
          }
        } else {
          setMessage(selectedTemplate.content)
        }
      }
    }
  }, [template, selectedContact, contacts])

  const handleSend = () => {
    // Validate required fields
    if (!selectedContact) {
      toast({
        title: "Missing recipient",
        description: "Please select a recipient",
        variant: "destructive",
      })
      return
    }

    if (type === "email" && !subject) {
      toast({
        title: "Missing subject",
        description: "Please enter a subject for your email",
        variant: "destructive",
      })
      return
    }

    if (!message) {
      toast({
        title: "Missing message",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    // Show success message
    const contact = contacts.find((c) => c.id === selectedContact)
    toast({
      title: "Communication sent",
      description: `Your ${type} to ${contact?.name} has been ${type === "meeting" ? "scheduled" : "sent"}.`,
    })

    // Close the composer
    onClose()
  }

  const handleAddAttachment = () => {
    // In a real app, this would open a file picker
    // For this prototype, we'll just add a dummy attachment
    setAttachments([...attachments, "design_proposal.pdf"])

    toast({
      title: "Attachment added",
      description: "design_proposal.pdf has been attached",
    })
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recipient */}
          <div className="space-y-2">
            <Label htmlFor="recipient">To</Label>
            <Select value={selectedContact} onValueChange={setSelectedContact}>
              <SelectTrigger>
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name} {type === "email" ? `(${contact.email})` : `(${contact.phone})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Templates */}
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_template">No Template</SelectItem>
                {communicationTemplates
                  .filter((t) => t.type === type || t.type === "all")
                  .map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject - only for email */}
          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}

          {/* Date and Time - for meetings and calls */}
          {(type === "meeting" || type === "call") && (
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

              {type === "meeting" && (
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-32"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Attachments - for email */}
          {type === "email" && (
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{attachment}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={handleAddAttachment}>
                  <Paperclip className="mr-2 h-4 w-4" />
                  Add Attachment
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {type === "email" && (
            <>
              <Button variant="outline" size="sm">
                <ImageIcon className="mr-2 h-4 w-4" />
                Add Image
              </Button>
              <Button variant="outline" size="sm">
                <LinkIcon className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend}>
            {type === "meeting" ? (
              <>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule
              </>
            ) : type === "call" ? (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Log Call
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
