"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Badge } from "@/components/ui/badge"
import type { jobData } from "@/lib/sample-data"
import { getStageColor, type JobStage } from "@/lib/job-utils"
import { SortableKanbanItem } from "./sortable-kanban-item"

interface KanbanColumnProps {
  stage: JobStage
  jobs: typeof jobData
  onJobClick: (jobId: string) => void
}

export function KanbanColumn({ stage, jobs, onJobClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${stage}`,
    data: {
      stage,
    },
  })

  return (
    <div ref={setNodeRef} className="flex-shrink-0 w-80 flex flex-col rounded-lg bg-muted/30">
      <div className="p-3 font-medium flex items-center justify-between">
        <Badge variant="outline" className={`${getStageColor(stage)} border-none text-white px-3 py-1`}>
          {stage}
        </Badge>
        <span className="text-sm text-muted-foreground">{jobs.length}</span>
      </div>

      <div className={`flex-1 p-2 space-y-2 min-h-[200px] transition-colors ${isOver ? "bg-muted/80" : ""}`}>
        <SortableContext items={jobs.map((job) => job.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <SortableKanbanItem key={job.id} job={job} onClick={() => onJobClick(job.id)} />
          ))}
        </SortableContext>

        {jobs.length === 0 && (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-md">
            Drop jobs here
          </div>
        )}
      </div>
    </div>
  )
}
