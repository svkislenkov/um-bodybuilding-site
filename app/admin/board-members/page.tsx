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
import { BoardMember } from "@/types/database"

export default function BoardMembersPage() {
  const [members, setMembers] = useState<BoardMember[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const response = await fetch("/api/admin/board-members")
    const data = await response.json()
    setMembers(data)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch(`/api/admin/board-members/${deleteId}`, {
      method: "DELETE",
    })

    setDeleteId(null)
    fetchMembers()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-navy" style={{ fontFamily: "var(--font-montserrat)" }}>
          Manage Board Members
        </h1>
        <Button
          onClick={() => router.push("/admin/board-members/new")}
          className="bg-maize text-navy hover:bg-maize/90 font-bold"
        >
          Add Board Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Board Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No board members found</p>
            ) : (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-maize transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {member.image_url && (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-navy">{member.name}</h3>
                      <p className="text-sm text-maize">{member.title}</p>
                      {member.email && (
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/admin/board-members/${member.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteId(member.id)}
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
              This action cannot be undone. This will permanently delete the board member.
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
