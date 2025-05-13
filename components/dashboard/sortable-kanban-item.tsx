"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { jobData } from "@/lib/sample-data"
import { KanbanItem } from "./kanban-item"

interface SortableKanbanItemProps {
  job: (typeof jobData)[0]
  onClick: () => void
}

export function SortableKanbanItem({ job, onClick }: SortableKanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id,
    data: {
      job,
      stage: job.stage,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={onClick} className="touch-manipulation">
      <KanbanItem job={job} />
    </div>
  )
}
