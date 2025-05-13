"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, ChevronDown, Plus, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { type JobStage, getStageColor } from "@/lib/job-utils"
import { jobData } from "@/lib/sample-data"
import { KanbanBoard } from "@/components/dashboard/kanban-board"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all-jobs")
  const [stageFilter, setStageFilter] = useState<JobStage | "all">("all")
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table")

  const filteredJobs = jobData.filter((job) => {
    if (activeTab === "my-jobs" && !job.assignedTo) return false
    if (stageFilter !== "all" && job.stage !== stageFilter) return false
    return true
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sales Hub</h1>
          <p className="text-muted-foreground">Manage your leads and jobs</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Jobs</CardTitle>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all-jobs" className="w-[300px]" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
                  <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Filter className="mr-2 h-4 w-4" />
                    {stageFilter === "all" ? "All Stages" : stageFilter}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStageFilter("all")}>All Stages</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStageFilter("New")}>New</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStageFilter("Scan Complete")}>Scan Complete</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStageFilter("Design Sent")}>Design Sent</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStageFilter("Won")}>Won</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStageFilter("Lost")}>Lost</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("rounded-none px-3 h-8", viewMode === "table" && "bg-muted text-muted-foreground")}
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("rounded-none px-3 h-8", viewMode === "kanban" && "bg-muted text-muted-foreground")}
                  onClick={() => setViewMode("kanban")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Homeowner</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow
                    key={job.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/job/${job.id}`)}
                  >
                    <TableCell className="font-medium">{job.address}</TableCell>
                    <TableCell>{job.homeowner}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStageColor(job.stage)} border-none text-white`}>
                        {job.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {job.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={job.assignedTo.avatar || "/placeholder.svg"} alt={job.assignedTo.name} />
                            <AvatarFallback>{job.assignedTo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{job.assignedTo.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>{job.lastActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <KanbanBoard jobs={filteredJobs} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
