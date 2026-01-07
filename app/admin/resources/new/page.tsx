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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  link: z.string().min(1, "Link is required"),
  embed_content: z.string().optional(),
})

type ResourceFormData = z.infer<typeof resourceSchema>

export default function NewResourcePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      icon: "FileText",
    },
  })

  const selectedIcon = watch("icon")

  const onSubmit = async (data: ResourceFormData) => {
    setIsSubmitting(true)

    const response = await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push("/admin/resources")
      router.refresh()
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-navy mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>
        Add New Resource
      </h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={selectedIcon} onValueChange={(value) => setValue("icon", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FileText">FileText</SelectItem>
                  <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="BookOpen">BookOpen</SelectItem>
                </SelectContent>
              </Select>
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (URL or path)</Label>
              <Input id="link" {...register("link")} placeholder="https://example.com/file.pdf" />
              {errors.link && (
                <p className="text-sm text-red-500">{errors.link.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="embed_content">Embed Content (optional)</Label>
              <Textarea
                id="embed_content"
                rows={2}
                {...register("embed_content")}
                placeholder="Additional description or summary"
              />
              {errors.embed_content && (
                <p className="text-sm text-red-500">{errors.embed_content.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-maize text-navy hover:bg-maize/90 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Resource"}
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
