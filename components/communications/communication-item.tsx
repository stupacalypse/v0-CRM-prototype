"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Reply,
  Forward,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import type { Communication } from "@/lib/communications-data"

interface CommunicationItemProps {
  communication: Communication
}

export function CommunicationItem({ communication }: CommunicationItemProps) {
  const [expanded, setExpanded] = useState(false)

  // Get icon based on communication type
  const getTypeIcon = () => {
    switch (communication.type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
    }
  }

  // Get status badge
  const getStatusBadge = () => {
    switch (communication.status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500 text-white border-none">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-500 text-white border-none">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500 text-white border-none">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={communication.contact.avatar || "/placeholder.svg"} alt={communication.contact.name} />
              <AvatarFallback>{communication.contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{communication.contact.name}</p>
                <Badge variant="outline" className="bg-muted text-muted-foreground">
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{communication.type}</span>
                </Badge>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(communication.date), "PPP")} at {communication.time}
              </p>
              {communication.type === "email" && <p className="text-sm font-medium mt-1">{communication.subject}</p>}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Content (expandable) */}
        <div className={cn("px-4 pb-4", !expanded && "hidden")}>
          <div className="border-t pt-3 mt-1">
            <p className="text-sm whitespace-pre-line">{communication.message}</p>

            {/* Attachments */}
            {communication.attachments && communication.attachments.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Attachments</p>
                <div className="flex flex-wrap gap-2">
                  {communication.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                {communication.type === "email" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="mr-2 h-4 w-4" />
                      Forward
                    </Button>
                  </>
                )}
                {communication.type === "sms" && (
                  <Button variant="outline" size="sm">
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem>Add Follow-up</DropdownMenuItem>
                  <DropdownMenuItem>Add to Timeline</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
