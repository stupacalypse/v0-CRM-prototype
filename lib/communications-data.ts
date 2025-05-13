export interface Communication {
  id: string
  type: "email" | "sms" | "call" | "meeting"
  contact: {
    id: string
    name: string
    avatar: string
  }
  subject?: string
  message: string
  date: string
  time: string
  status: "completed" | "scheduled" | "pending"
  attachments?: string[]
}

export const communicationsData: Communication[] = [
  {
    id: "1",
    type: "email",
    contact: {
      id: "1",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Your Hover Design is Ready",
    message:
      "Hi Jane,\n\nI'm excited to share your new home design with you! Please take a look at the attached design and let me know your thoughts.\n\nBest regards,\nAva",
    date: "2025-05-10",
    time: "14:30",
    status: "completed",
    attachments: ["design_proposal.pdf", "measurements.pdf"],
  },
  {
    id: "2",
    type: "call",
    contact: {
      id: "1",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message: "Left voicemail for homeowner about the design. Will follow up tomorrow.",
    date: "2025-05-10",
    time: "16:45",
    status: "completed",
  },
  {
    id: "3",
    type: "meeting",
    contact: {
      id: "1",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Design Review Meeting",
    message: "Meeting to review the design proposal and discuss next steps.",
    date: "2025-05-12",
    time: "10:00",
    status: "scheduled",
  },
  {
    id: "4",
    type: "sms",
    contact: {
      id: "1",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message:
      "Hi Jane, just checking if you received the design I emailed yesterday? Let me know if you have any questions.",
    date: "2025-05-11",
    time: "09:15",
    status: "completed",
  },
  {
    id: "5",
    type: "email",
    contact: {
      id: "2",
      name: "Carlos Ramos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Scan Complete - Next Steps",
    message:
      "Hello Carlos,\n\nI wanted to let you know that we've completed the scan of your property. Our team is now working on creating a detailed design based on these measurements.\n\nYou should receive the design within the next 2-3 business days.\n\nPlease let me know if you have any questions in the meantime.\n\nBest regards,\nThe Hover Team",
    date: "2025-05-09",
    time: "11:20",
    status: "completed",
  },
  {
    id: "6",
    type: "call",
    contact: {
      id: "2",
      name: "Carlos Ramos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    message: "Called to confirm appointment for tomorrow. Customer confirmed they will be available.",
    date: "2025-05-08",
    time: "15:30",
    status: "completed",
  },
  {
    id: "7",
    type: "email",
    contact: {
      id: "3",
      name: "Michael Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Welcome to Hover",
    message:
      "Hi Michael,\n\nThank you for choosing Hover for your home renovation project. We're excited to work with you!\n\nOur next step is to schedule a time for our team to scan your property. This will allow us to create accurate 3D models and designs.\n\nPlease let me know what days and times work best for you in the coming week.\n\nBest regards,\nSarah",
    date: "2025-05-07",
    time: "10:00",
    status: "pending",
  },
  {
    id: "8",
    type: "meeting",
    contact: {
      id: "4",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Final Contract Review",
    message: "Meeting to review and sign the final contract for the renovation project.",
    date: "2025-05-15",
    time: "14:00",
    status: "scheduled",
  },
]

export const communicationTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    type: "email",
    subject: "Welcome to Hover",
    content:
      "Hi {name},\n\nThank you for choosing Hover for your home renovation project. We're excited to work with you!\n\nOur next step is to schedule a time for our team to scan your property. This will allow us to create accurate 3D models and designs.\n\nPlease let me know what days and times work best for you in the coming week.\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "scan-complete",
    name: "Scan Complete",
    type: "email",
    subject: "Scan Complete - Next Steps",
    content:
      "Hello {name},\n\nI wanted to let you know that we've completed the scan of your property at {address}. Our team is now working on creating a detailed design based on these measurements.\n\nYou should receive the design within the next 2-3 business days.\n\nPlease let me know if you have any questions in the meantime.\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "design-ready",
    name: "Design Ready",
    type: "email",
    subject: "Your Hover Design is Ready",
    content:
      "Hi {name},\n\nI'm excited to share your new home design with you! Please take a look at the attached design and let me know your thoughts.\n\nI'd be happy to schedule a call to discuss any questions or modifications you might have.\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "follow-up",
    name: "Follow-up",
    type: "email",
    subject: "Following Up on Your Hover Design",
    content:
      "Hi {name},\n\nI wanted to follow up on the design we sent over last week. Have you had a chance to review it?\n\nI'd love to hear your thoughts and answer any questions you might have.\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "appointment-confirmation",
    name: "Appointment Confirmation",
    type: "all",
    subject: "Appointment Confirmation",
    content:
      "Hi {name},\n\nThis is a confirmation of our appointment on [DATE] at [TIME].\n\nPlease let me know if you need to reschedule or have any questions before our meeting.\n\nLooking forward to speaking with you!\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "quote",
    name: "Quote",
    type: "email",
    subject: "Your Custom Quote",
    content:
      "Hi {name},\n\nThank you for your interest in our services. I've attached a detailed quote for your project at {address}.\n\nThis quote includes all the materials, labor, and timeline as we discussed.\n\nPlease review it and let me know if you have any questions or would like to make any adjustments.\n\nBest regards,\nYour Hover Rep",
  },
  {
    id: "sms-follow-up",
    name: "SMS Follow-up",
    type: "sms",
    content:
      "Hi {name}, just checking if you received the design I emailed yesterday? Let me know if you have any questions.",
  },
  {
    id: "call-notes",
    name: "Call Notes Template",
    type: "call",
    content:
      "Discussed project timeline and budget. Customer had questions about material options. Agreed to send additional information via email.",
  },
]
