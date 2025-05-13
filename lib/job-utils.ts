export type JobStage = "New" | "Scan Complete" | "Design Sent" | "Won" | "Lost"

export function getStageColor(stage: JobStage): string {
  switch (stage) {
    case "New":
      return "bg-blue-500"
    case "Scan Complete":
      return "bg-teal-500"
    case "Design Sent":
      return "bg-amber-500"
    case "Won":
      return "bg-green-500"
    case "Lost":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}
