"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useToast } from "@/components/ui/use-toast"
import type { jobData } from "@/lib/sample-data"
import type { JobStage } from "@/lib/job-utils"
import { KanbanColumn } from "./kanban-column"
import { KanbanItem } from "./kanban-item"

// Define all possible stages
const stages: JobStage[] = ["New", "Scan Complete", "Design Sent", "Won", "Lost"]

interface KanbanBoardProps {
  jobs: typeof jobData
}

export function KanbanBoard({ jobs }: KanbanBoardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [items, setItems] = useState(jobs)

  // Group jobs by stage
  const columns = stages.reduce(
    (acc, stage) => {
      acc[stage] = items.filter((job) => job.stage === stage)
      return acc
    },
    {} as Record<JobStage, typeof jobs>,
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    // If the item is dropped in a different column
    if (active.data.current?.stage !== over.data.current?.stage) {
      const activeJob = items.find((job) => job.id === active.id)
      if (!activeJob) return

      // Update the job's stage
      const updatedItems = items.map((job) => {
        if (job.id === active.id) {
          return { ...job, stage: over.data.current?.stage }
        }
        return job
      })

      setItems(updatedItems)

      toast({
        title: "Job moved",
        description: `${activeJob.homeowner} moved to ${over.data.current?.stage}`,
      })
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeJob = activeId ? items.find((job) => job.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            jobs={columns[stage]}
            onJobClick={(jobId) => router.push(`/job/${jobId}`)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-80 rotate-3 scale-105 shadow-lg">
            <KanbanItem job={activeJob} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
