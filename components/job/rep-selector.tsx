"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface RepSelectorProps {
  teamMembers: TeamMember[]
  selectedRep: TeamMember | null
  onSelect: (rep: TeamMember | null) => void
}

export function RepSelector({ teamMembers, selectedRep, onSelect }: RepSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = teamMembers.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search team members..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {selectedRep && (
          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onSelect(null)}
          >
            <X className="mr-2 h-4 w-4" />
            Unassign
          </Button>
        )}

        {filteredMembers.map((member) => (
          <Button key={member.id} variant="outline" className="w-full justify-start" onClick={() => onSelect(member)}>
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span>{member.name}</span>
              <span className="text-xs text-muted-foreground">{member.role}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
