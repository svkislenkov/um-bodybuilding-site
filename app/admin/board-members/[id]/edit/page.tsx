"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/image-upload"
import { BoardMember } from "@/types/database"

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  bio: z.string().optional(),
  image_url: z.string().optional(),
})

type MemberFormData = z.infer<typeof memberSchema>

export default function EditBoardMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [memberId, setMemberId] = useState<string>("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  })

  const imageUrl = watch("image_url")

  useEffect(() => {
    async function init() {
      const resolvedParams = await params
      setMemberId(resolvedParams.id)

      const response = await fetch(`/api/admin/board-members/${resolvedParams.id}`)
      if (response.ok) {
        const member: BoardMember = await response.json()
        reset({
          name: member.name,
          title: member.title,
          email: member.email || "",
          bio: member.bio || "",
          image_url: member.image_url || "",
        })
      }
      setIsLoading(false)
    }

    init()
  }, [params, reset])

  const onSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true)

    const response = await fetch(`/api/admin/board-members/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push("/admin/board-members")
      router.refresh()
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-navy mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>
        Edit Board Member
      </h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Board Member Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title (e.g., President, Vice President)</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (optional)</Label>
              <Textarea
                id="bio"
                rows={4}
                {...register("bio")}
                placeholder="Short biography about the board member"
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Member Image</Label>
              <ImageUpload
                value={imageUrl}
                onChange={(url) => setValue("image_url", url)}
                bucket="board-members"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-maize text-navy hover:bg-maize/90 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
