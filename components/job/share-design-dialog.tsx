"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShareDesignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onShare: () => void
}

export function ShareDesignDialog({ open, onOpenChange, onShare }: ShareDesignDialogProps) {
  const [emailTemplate, setEmailTemplate] = useState("standard")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Design</DialogTitle>
          <DialogDescription>Send the design to the homeowner via email.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" defaultValue="jane.doe@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Email Template</Label>
            <Select value={emailTemplate} onValueChange={setEmailTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Design Share</SelectItem>
                <SelectItem value="followup">Follow-up Template</SelectItem>
                <SelectItem value="custom">Custom Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              className="min-h-32"
              defaultValue="Hi Jane,

I'm excited to share your new home design with you! Please take a look at the attached design and let me know your thoughts.

Best regards,
Your Hover Rep"
            />
          </div>

          <div className="space-y-2">
            <Label>Design Preview</Label>
            <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Design preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onShare}>Send Design</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
