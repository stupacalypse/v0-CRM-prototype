import type { JobStage } from "./job-utils"

export const teamMembers = [
  {
    id: "1",
    name: "Ava Nguyen",
    role: "Field Rep",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Sales Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Field Rep",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "David Chen",
    role: "Field Rep",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const jobData = [
  {
    id: "1",
    homeowner: "Jane Doe",
    address: "123 Maple St, Denver CO",
    stage: "Design Sent" as JobStage,
    assignedTo: teamMembers[0],
    lastActivity: "2 hours ago",
    timeline: [
      {
        type: "scan",
        time: "5 hours ago",
      },
      {
        type: "design",
        time: "4 hours ago",
      },
      {
        type: "note",
        time: "2 hours ago",
        content: "Left VM",
      },
    ],
  },
  {
    id: "2",
    homeowner: "Carlos Ramos",
    address: "45 Ocean View Dr, San Diego CA",
    stage: "Scan Complete" as JobStage,
    assignedTo: null,
    lastActivity: "Yesterday",
    timeline: [
      {
        type: "scan",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "3",
    homeowner: "Michael Smith",
    address: "789 Pine Ave, Seattle WA",
    stage: "New" as JobStage,
    assignedTo: teamMembers[2],
    lastActivity: "3 days ago",
    timeline: [],
  },
  {
    id: "4",
    homeowner: "Emily Johnson",
    address: "567 Oak Ln, Portland OR",
    stage: "Won" as JobStage,
    assignedTo: teamMembers[0],
    lastActivity: "1 week ago",
    timeline: [
      {
        type: "scan",
        time: "2 weeks ago",
      },
      {
        type: "design",
        time: "10 days ago",
      },
      {
        type: "note",
        time: "1 week ago",
        content: "Contract signed",
      },
    ],
  },
]
