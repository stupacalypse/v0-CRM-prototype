"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  ImageIcon,
  MessageSquare,
  PaintbrushIcon as PaintBrush,
  Plus,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type JobStage, getStageColor } from "@/lib/job-utils"
import { jobData, teamMembers } from "@/lib/sample-data"
import { TimelineCard } from "@/components/job/timeline-card"
import { ActivityItem } from "@/components/job/activity-item"
import { RepSelector } from "@/components/job/rep-selector"
import { ShareDesignDialog } from "@/components/job/share-design-dialog"
import { JobCommunications } from "@/components/job/job-communications"

export default function JobDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const jobId = params.id
  const job = jobData.find((j) => j.id === jobId) || jobData[0]

  const [currentStage, setCurrentStage] = useState<JobStage>(job.stage)
  const [assignedRep, setAssignedRep] = useState(job.assignedTo)
  const [showRepSelector, setShowRepSelector] = useState(false)
  const [showNoteDrawer, setShowNoteDrawer] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [showActivityFeed, setShowActivityFeed] = useState(true)
  const [activeTab, setActiveTab] = useState("timeline")

  const handleStageChange = (stage: JobStage) => {
    setCurrentStage(stage)
    toast({
      title: "Stage updated",
      description: `Job stage changed to ${stage}`,
    })
  }

  const handleAssignRep = (rep: (typeof teamMembers)[0] | null) => {
    setAssignedRep(rep)
    setShowRepSelector(false)
    toast({
      title: "Rep assigned",
      description: rep ? `Job assigned to ${rep.name}` : "Job unassigned",
    })
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return

    toast({
      title: "Note added",
      description: "Your note has been added to the timeline",
    })

    setNoteText("")
    setShowNoteDrawer(false)
  }

  const handleShareDesign = () => {
    toast({
      title: "Design shared",
      description: "Design has been shared with the homeowner",
    })

    setShowShareDialog(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Header Section */}
        <div className="md:col-span-3">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{job.homeowner}</h1>
                <p className="text-muted-foreground">{job.address}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("min-w-32 justify-start", getStageColor(currentStage), "text-white border-none")}
                    >
                      {currentStage}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleStageChange("New")}>New</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStageChange("Scan Complete")}>
                      Scan Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStageChange("Design Sent")}>Design Sent</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStageChange("Won")}>Won</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStageChange("Lost")}>Lost</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={showRepSelector} onOpenChange={setShowRepSelector}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="min-w-32 justify-start">
                      {assignedRep ? (
                        <>
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarImage src={assignedRep.avatar || "/placeholder.svg"} alt={assignedRep.name} />
                            <AvatarFallback>{assignedRep.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {assignedRep.name}
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Assign Rep
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Assign Representative</DialogTitle>
                    </DialogHeader>
                    <RepSelector teamMembers={teamMembers} selectedRep={assignedRep} onSelect={handleAssignRep} />
                  </DialogContent>
                </Dialog>

                <ShareDesignDialog
                  open={showShareDialog}
                  onOpenChange={setShowShareDialog}
                  onShare={handleShareDesign}
                />

                <Button onClick={() => setShowShareDialog(true)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Design
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs for Timeline and Communications */}
        <div className="md:col-span-3">
          <Tabs defaultValue="timeline" onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "timeline" ? (
          <>
            {/* Timeline Section */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Timeline</h2>
                <div className="flex items-center gap-2">
                  <Drawer open={showNoteDrawer} onOpenChange={setShowNoteDrawer}>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Note
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Add Note</DrawerTitle>
                        <DrawerDescription>
                          Add a note to the job timeline. This will be visible to all team members.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4">
                        <Textarea
                          placeholder="Type your note here..."
                          className="min-h-32"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                        />
                      </div>
                      <DrawerFooter>
                        <Button onClick={handleAddNote}>Save Note</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>

              <div className="space-y-4">
                <TimelineCard
                  icon={<PaintBrush className="h-4 w-4" />}
                  title="Design generated"
                  time="4 hours ago"
                  colorClass="bg-teal-500"
                  content={
                    <div className="mt-2">
                      <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Design preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  }
                />

                <TimelineCard
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Note added"
                  time="2 hours ago"
                  colorClass="bg-blue-500"
                  content={
                    <div className="mt-2 text-sm">
                      <p>Left voicemail for homeowner about the design. Will follow up tomorrow.</p>
                    </div>
                  }
                />

                <TimelineCard
                  icon={<ImageIcon className="h-4 w-4" />}
                  title="Scan uploaded"
                  time="5 hours ago"
                  colorClass="bg-purple-500"
                  content={
                    <div className="mt-2">
                      <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Scan preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  }
                />

                <TimelineCard
                  icon={<FileText className="h-4 w-4" />}
                  title="Measurement PDF"
                  time="5 hours ago"
                  colorClass="bg-orange-500"
                  content={
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        measurements.pdf
                      </Button>
                    </div>
                  }
                />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="relative">
              <Card className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Activity Feed</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 md:hidden"
                    onClick={() => setShowActivityFeed(!showActivityFeed)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className={cn("space-y-4", !showActivityFeed && "hidden md:block")}>
                  <ActivityItem
                    icon={<Clock className="h-4 w-4" />}
                    title="Stage changed to Design Sent"
                    time="2 hours ago"
                    user="System"
                  />

                  <ActivityItem
                    icon={<MessageSquare className="h-4 w-4" />}
                    title="Added note"
                    time="2 hours ago"
                    user="Ava Nguyen"
                    description="Left voicemail for homeowner about the design. Will follow up tomorrow."
                  />

                  <ActivityItem
                    icon={<PaintBrush className="h-4 w-4" />}
                    title="Design generated"
                    time="4 hours ago"
                    user="System"
                  />

                  <ActivityItem
                    icon={<ImageIcon className="h-4 w-4" />}
                    title="Scan uploaded"
                    time="5 hours ago"
                    user="Ava Nguyen"
                  />

                  <ActivityItem
                    icon={<FileText className="h-4 w-4" />}
                    title="Measurement PDF created"
                    time="5 hours ago"
                    user="System"
                  />
                </div>
              </Card>
            </div>
          </>
        ) : (
          <div className="md:col-span-3">
            <JobCommunications jobId={job.id} homeowner={job.homeowner} address={job.address} />
          </div>
        )}
      </div>
    </div>
  )
}
