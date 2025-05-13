"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { communicationTemplates } from "@/lib/communications-data"

export function TemplateManager() {
  const { toast } = useToast()
  const [templates, setTemplates] = useState(communicationTemplates)
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null)
  const [templateType, setTemplateType] = useState<"email" | "sms" | "call" | "meeting" | "all">("email")
  const [templateName, setTemplateName] = useState("")
  const [templateSubject, setTemplateSubject] = useState("")
  const [templateContent, setTemplateContent] = useState("")

  const handleCreateTemplate = () => {
    // Validate
    if (!templateName.trim()) {
      toast({
        title: "Missing name",
        description: "Please enter a template name",
        variant: "destructive",
      })
      return
    }

    if (templateType === "email" && !templateSubject.trim()) {
      toast({
        title: "Missing subject",
        description: "Email templates require a subject",
        variant: "destructive",
      })
      return
    }

    if (!templateContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter template content",
        variant: "destructive",
      })
      return
    }

    // Create new template
    const newTemplate = {
      id: `template-${Date.now()}`,
      name: templateName,
      type: templateType,
      subject: templateSubject,
      content: templateContent,
    }

    setTemplates([...templates, newTemplate])
    resetForm()
    setShowNewTemplate(false)

    toast({
      title: "Template created",
      description: `${templateName} template has been created`,
    })
  }

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    setEditingTemplate(templateId)
    setTemplateType(template.type as any)
    setTemplateName(template.name)
    setTemplateSubject(template.subject || "")
    setTemplateContent(template.content)
  }

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return

    // Validate
    if (!templateName.trim()) {
      toast({
        title: "Missing name",
        description: "Please enter a template name",
        variant: "destructive",
      })
      return
    }

    // Update template
    const updatedTemplates = templates.map((template) => {
      if (template.id === editingTemplate) {
        return {
          ...template,
          name: templateName,
          type: templateType,
          subject: templateSubject,
          content: templateContent,
        }
      }
      return template
    })

    setTemplates(updatedTemplates)
    resetForm()
    setEditingTemplate(null)

    toast({
      title: "Template updated",
      description: `${templateName} template has been updated`,
    })
  }

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    const updatedTemplates = templates.filter((t) => t.id !== templateId)
    setTemplates(updatedTemplates)

    toast({
      title: "Template deleted",
      description: `${template.name} template has been deleted`,
    })
  }

  const resetForm = () => {
    setTemplateType("email")
    setTemplateName("")
    setTemplateSubject("")
    setTemplateContent("")
  }

  const getTemplateTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Email"
      case "sms":
        return "SMS"
      case "call":
        return "Call"
      case "meeting":
        return "Meeting"
      case "all":
        return "All Types"
      default:
        return type
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Communication Templates</h1>
          <p className="text-muted-foreground">Manage templates for different communication types</p>
        </div>
        <Dialog open={showNewTemplate} onOpenChange={setShowNewTemplate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-type">Template Type</Label>
                <Select value={templateType} onValueChange={(value) => setTemplateType(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="all">All Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Welcome Email"
                />
              </div>

              {(templateType === "email" || templateType === "all") && (
                <div className="space-y-2">
                  <Label htmlFor="template-subject">Subject Line</Label>
                  <Input
                    id="template-subject"
                    value={templateSubject}
                    onChange={(e) => setTemplateSubject(e.target.value)}
                    placeholder="e.g., Welcome to Hover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="template-content">Template Content</Label>
                <Textarea
                  id="template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  placeholder="Type your template content here..."
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{name}"}, {"{address}"}, and other placeholders to personalize your template.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewTemplate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-template-type">Template Type</Label>
                <Select value={templateType} onValueChange={(value) => setTemplateType(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="all">All Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-template-name">Template Name</Label>
                <Input id="edit-template-name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
              </div>

              {(templateType === "email" || templateType === "all") && (
                <div className="space-y-2">
                  <Label htmlFor="edit-template-subject">Subject Line</Label>
                  <Input
                    id="edit-template-subject"
                    value={templateSubject}
                    onChange={(e) => setTemplateSubject(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="edit-template-content">Template Content</Label>
                <Textarea
                  id="edit-template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{name}"}, {"{address}"}, and other placeholders to personalize your template.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTemplate}>Update Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge variant="outline" className="bg-muted text-muted-foreground">
                  {getTemplateTypeLabel(template.type)}
                </Badge>
              </div>
              {template.subject && <p className="text-sm text-muted-foreground">Subject: {template.subject}</p>}
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md mb-4 max-h-32 overflow-y-auto">
                <p className="text-sm whitespace-pre-line">{template.content}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template.id)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
