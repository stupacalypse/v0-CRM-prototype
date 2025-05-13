"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Filter,
  ChevronDown,
  Plus,
  Search,
  FileText,
  Settings,
  MapPin,
} from "lucide-react"
import { jobData } from "@/lib/sample-data"
import { CommunicationComposer } from "./communication-composer"
import { CommunicationItem } from "./communication-item"
import { communicationsData } from "@/lib/communications-data"

// Sample data for communication templates
const communicationTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    type: "email",
    subject: "Welcome to Our Company!",
    content: "Dear Customer, welcome aboard! We're excited to have you.",
  },
  {
    id: "2",
    name: "Appointment Reminder",
    type: "sms",
    content: "Hi [Customer Name], your appointment is tomorrow at [Time].",
  },
  {
    id: "3",
    name: "Follow-up Call Script",
    type: "call",
    content: "Hello [Customer Name], I'm calling to follow up on...",
  },
  {
    id: "4",
    name: "Meeting Confirmation",
    type: "meeting",
    subject: "Meeting Confirmed",
    content: "Dear [Customer Name], this email confirms our meeting on [Date] at [Time].",
  },
  {
    id: "5",
    name: "Project Update",
    type: "email",
    subject: "Project Update",
    content: "Dear [Customer Name], here's an update on your project...",
  },
  {
    id: "6",
    name: "Payment Reminder",
    type: "sms",
    content: "Hi [Customer Name], this is a reminder about your upcoming payment.",
  },
]

export function CommunicationsCenter() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showComposer, setShowComposer] = useState(false)
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [communicationType, setCommunicationType] = useState<"email" | "sms" | "call" | "meeting">("email")
  const [statusFilter, setStatusFilter] = useState<"all" | "scheduled" | "completed" | "pending">("all")
  const [activeTab, setActiveTab] = useState("inbox")

  // Create a list of all contacts from job data
  const contacts = jobData.map((job) => ({
    id: job.id,
    name: job.homeowner,
    address: job.address,
    avatar: "/placeholder.svg?height=40&width=40",
    email: `${job.homeowner.toLowerCase().replace(/\s/g, ".")}@example.com`,
    phone: "555-123-4567",
  }))

  // Filter communications based on search and filters
  const filteredCommunications = communicationsData.filter((comm) => {
    const matchesSearch =
      searchQuery === "" ||
      comm.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || comm.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleNewCommunication = (type: "email" | "sms" | "call" | "meeting", contactId?: string) => {
    setCommunicationType(type)
    if (contactId) {
      setSelectedContact(contactId)
    }
    setShowComposer(true)
  }

  const handleCloseComposer = () => {
    setShowComposer(false)
    setSelectedContact(null)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">Manage all your customer communications</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Communication
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleNewCommunication("email")}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNewCommunication("sms")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                SMS
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNewCommunication("call")}>
                <Phone className="mr-2 h-4 w-4" />
                Log Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNewCommunication("meeting")}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="site-visits">Site Visits</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {activeTab === "inbox" && (
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search communications..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <TabsContent value="inbox">
          {showComposer && (
            <CommunicationComposer
              type={communicationType}
              contacts={contacts}
              selectedContactId={selectedContact}
              onClose={handleCloseComposer}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Contacts Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contacts</CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search contacts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => router.push(`/job/${contact.id}`)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{contact.address}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNewCommunication("email", contact.id)
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNewCommunication("sms", contact.id)
                            }}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            SMS
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNewCommunication("call", contact.id)
                            }}
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Log Call
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNewCommunication("meeting", contact.id)
                            }}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Meeting
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Communications List */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Communications</CardTitle>
                    <div className="flex items-center gap-2">
                      <Tabs
                        defaultValue="all"
                        className="w-[400px]"
                        onValueChange={(value) => {
                          setStatusFilter(value as any)
                        }}
                      >
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                          <TabsTrigger value="completed">Completed</TabsTrigger>
                          <TabsTrigger value="pending">Pending</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="ml-2">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Emails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            SMS
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Calls
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Meetings
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCommunications.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No communications found</p>
                      </div>
                    ) : (
                      filteredCommunications.map((communication) => (
                        <CommunicationItem key={communication.id} communication={communication} />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="site-visits">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Site Visits</CardTitle>
                    <Button onClick={() => handleNavigate("/communications/site-visits")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Visit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Initial Scan</p>
                            <p className="text-sm text-muted-foreground">Today at 2:00 PM</p>
                          </div>
                        </div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground mb-3">123 Maple St, Denver CO</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Confirmed</span>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Design Presentation</p>
                            <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                          </div>
                        </div>
                        <p className="font-medium">Carlos Ramos</p>
                        <p className="text-sm text-muted-foreground mb-3">45 Ocean View Dr, San Diego CA</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">Pending</span>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-purple-100 p-2">
                            <MapPin className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Final Inspection</p>
                            <p className="text-sm text-muted-foreground">May 15, 2025 at 3:30 PM</p>
                          </div>
                        </div>
                        <p className="font-medium">Emily Johnson</p>
                        <p className="text-sm text-muted-foreground mb-3">567 Oak Ln, Portland OR</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Confirmed</span>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button variant="outline" onClick={() => handleNavigate("/communications/site-visits")}>
                      View All Site Visits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Communication Templates</CardTitle>
                    <Button onClick={() => handleNavigate("/communications/templates")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Templates
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {communicationTemplates.slice(0, 6).map((template) => (
                      <Card key={template.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="rounded-full bg-muted p-2">
                              {template.type === "email" ? (
                                <Mail className="h-4 w-4" />
                              ) : template.type === "sms" ? (
                                <MessageSquare className="h-4 w-4" />
                              ) : template.type === "call" ? (
                                <Phone className="h-4 w-4" />
                              ) : (
                                <Calendar className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{template.type}</p>
                            </div>
                          </div>
                          {template.subject && (
                            <p className="text-sm text-muted-foreground mb-2">Subject: {template.subject}</p>
                          )}
                          <p className="text-sm line-clamp-2">{template.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button variant="outline" onClick={() => handleNavigate("/communications/templates")}>
                      View All Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Shared Documents</CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">design_proposal.pdf</p>
                            <p className="text-xs text-muted-foreground">Shared 2 days ago</p>
                          </div>
                        </div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground mb-3">123 Maple St, Denver CO</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Viewed</span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-amber-100 p-2">
                            <FileText className="h-4 w-4 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">quote_123456.pdf</p>
                            <p className="text-xs text-muted-foreground">Shared yesterday</p>
                          </div>
                        </div>
                        <p className="font-medium">Carlos Ramos</p>
                        <p className="text-sm text-muted-foreground mb-3">45 Ocean View Dr, San Diego CA</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">Not viewed</span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <FileText className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">contract_signed.pdf</p>
                            <p className="text-xs text-muted-foreground">Shared 1 week ago</p>
                          </div>
                        </div>
                        <p className="font-medium">Emily Johnson</p>
                        <p className="text-sm text-muted-foreground mb-3">567 Oak Ln, Portland OR</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Signed</span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
