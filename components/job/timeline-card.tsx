import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TimelineCardProps {
  icon: React.ReactNode
  title: string
  time: string
  colorClass: string
  content?: React.ReactNode
}

export function TimelineCard({ icon, title, time, colorClass, content }: TimelineCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("rounded-full p-2 text-white", colorClass)}>{icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{title}</h3>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            {content}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
