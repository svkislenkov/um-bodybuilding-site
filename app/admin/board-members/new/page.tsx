"use client"

import { useState } from "react"
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

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  bio: z.string().optional(),
  image_url: z.string().optional(),
})

type MemberFormData = z.infer<typeof memberSchema>

export default function NewBoardMemberPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  })

  const imageUrl = watch("image_url")

  const onSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true)

    const response = await fetch("/api/admin/board-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push("/admin/board-members")
      router.refresh()
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-navy mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>
        Add New Board Member
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
                {isSubmitting ? "Creating..." : "Create Board Member"}
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
