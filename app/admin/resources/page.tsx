"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Resource } from "@/types/database"

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    const response = await fetch("/api/admin/resources")
    const data = await response.json()
    setResources(data)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch(`/api/admin/resources/${deleteId}`, {
      method: "DELETE",
    })

    setDeleteId(null)
    fetchResources()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-navy" style={{ fontFamily: "var(--font-montserrat)" }}>
          Manage Resources
        </h1>
        <Button
          onClick={() => router.push("/admin/resources/new")}
          className="bg-maize text-navy hover:bg-maize/90 font-bold"
        >
          Add Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No resources found</p>
            ) : (
              resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-maize transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-navy">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Icon: {resource.icon}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/admin/resources/${resource.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteId(resource.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
