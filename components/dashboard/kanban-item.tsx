import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { jobData } from "@/lib/sample-data"

interface KanbanItemProps {
  job: (typeof jobData)[0]
  className?: string
}

export function KanbanItem({ job, className = "" }: KanbanItemProps) {
  return (
    <Card className={`cursor-pointer hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-3 space-y-2">
        <div className="font-medium line-clamp-1">{job.homeowner}</div>
        <div className="text-sm text-muted-foreground line-clamp-1">{job.address}</div>

        <div className="flex items-center justify-between">
          {job.assignedTo ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={job.assignedTo.avatar || "/placeholder.svg"} alt={job.assignedTo.name} />
                <AvatarFallback>{job.assignedTo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{job.assignedTo.name}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Unassigned</span>
          )}

          <span className="text-xs text-muted-foreground">{job.lastActivity}</span>
        </div>
      </CardContent>
    </Card>
  )
}
