import type React from "react"

interface ActivityItemProps {
  icon: React.ReactNode
  title: string
  time: string
  user: string
  description?: string
}

export function ActivityItem({ icon, title, time, user, description }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-muted p-1.5">{icon}</div>
        <div className="w-px flex-1 bg-border"></div>
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{user}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
