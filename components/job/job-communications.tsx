"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Phone, Calendar, Plus, ChevronRight } from "lucide-react"
import { CommunicationItem } from "@/components/communications/communication-item"
import { CommunicationComposer } from "@/components/communications/communication-composer"
import { communicationsData } from "@/lib/communications-data"

interface JobCommunicationsProps {
  jobId: string
  homeowner: string
  address: string
}

export function JobCommunications({ jobId, homeowner, address }: JobCommunicationsProps) {
  const router = useRouter()
  const [showComposer, setShowComposer] = useState(false)
  const [communicationType, setCommunicationType] = useState<"email" | "sms" | "call" | "meeting">("email")

  // Filter communications for this job
  const jobCommunications = communicationsData.filter((comm) => comm.contact.id === jobId)

  // Create a contact object for this job
  const contact = {
    id: jobId,
    name: homeowner,
    address: address,
    avatar: "/placeholder.svg?height=40&width=40",
    email: `${homeowner.toLowerCase().replace(/\s/g, ".")}@example.com`,
    phone: "555-123-4567",
  }

  const handleNewCommunication = (type: "email" | "sms" | "call" | "meeting") => {
    setCommunicationType(type)
    setShowComposer(true)
  }

  const handleViewAll = () => {
    router.push("/communications")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Communications</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleViewAll}>
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showComposer ? (
          <CommunicationComposer
            type={communicationType}
            contacts={[contact]}
            selectedContactId={jobId}
            onClose={() => setShowComposer(false)}
          />
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => handleNewCommunication("email")}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleNewCommunication("sms")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              SMS
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleNewCommunication("call")}>
              <Phone className="mr-2 h-4 w-4" />
              Log Call
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleNewCommunication("meeting")}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        )}

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="call">Calls</TabsTrigger>
            <TabsTrigger value="meeting">Meetings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {jobCommunications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No communications yet</p>
                <Button variant="outline" className="mt-2" onClick={() => handleNewCommunication("email")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Communication
                </Button>
              </div>
            ) : (
              jobCommunications.map((communication) => (
                <CommunicationItem key={communication.id} communication={communication} />
              ))
            )}
          </TabsContent>

          <TabsContent value="email" className="space-y-4 mt-4">
            {jobCommunications.filter((c) => c.type === "email").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No emails yet</p>
                <Button variant="outline" className="mt-2" onClick={() => handleNewCommunication("email")}>
                  <Mail className="mr-2 h-4 w-4" />
                  New Email
                </Button>
              </div>
            ) : (
              jobCommunications
                .filter((c) => c.type === "email")
                .map((communication) => <CommunicationItem key={communication.id} communication={communication} />)
            )}
          </TabsContent>

          <TabsContent value="sms" className="space-y-4 mt-4">
            {jobCommunications.filter((c) => c.type === "sms").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No SMS messages yet</p>
                <Button variant="outline" className="mt-2" onClick={() => handleNewCommunication("sms")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New SMS
                </Button>
              </div>
            ) : (
              jobCommunications
                .filter((c) => c.type === "sms")
                .map((communication) => <CommunicationItem key={communication.id} communication={communication} />)
            )}
          </TabsContent>

          <TabsContent value="call" className="space-y-4 mt-4">
            {jobCommunications.filter((c) => c.type === "call").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No calls logged yet</p>
                <Button variant="outline" className="mt-2" onClick={() => handleNewCommunication("call")}>
                  <Phone className="mr-2 h-4 w-4" />
                  Log Call
                </Button>
              </div>
            ) : (
              jobCommunications
                .filter((c) => c.type === "call")
                .map((communication) => <CommunicationItem key={communication.id} communication={communication} />)
            )}
          </TabsContent>

          <TabsContent value="meeting" className="space-y-4 mt-4">
            {jobCommunications.filter((c) => c.type === "meeting").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No meetings scheduled yet</p>
                <Button variant="outline" className="mt-2" onClick={() => handleNewCommunication("meeting")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            ) : (
              jobCommunications
                .filter((c) => c.type === "meeting")
                .map((communication) => <CommunicationItem key={communication.id} communication={communication} />)
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
