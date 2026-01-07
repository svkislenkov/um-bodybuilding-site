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
import { Event } from "@/types/database"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [eventId, setEventId] = useState<string>("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  })

  const imageUrl = watch("image_url")

  useEffect(() => {
    async function init() {
      const resolvedParams = await params
      setEventId(resolvedParams.id)

      const response = await fetch(`/api/admin/events/${resolvedParams.id}`)
      if (response.ok) {
        const event: Event = await response.json()
        reset({
          title: event.title,
          date: event.date,
          location: event.location,
          description: event.description,
          image_url: event.image_url || "",
        })
      }
      setIsLoading(false)
    }

    init()
  }, [params, reset])

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)

    const response = await fetch(`/api/admin/events/${eventId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push("/admin/events")
      router.refresh()
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-navy mb-8" style={{ fontFamily: "var(--font-montserrat)" }}>
        Edit Event
      </h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
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
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Event Image</Label>
              <ImageUpload
                value={imageUrl}
                onChange={(url) => setValue("image_url", url)}
                bucket="events"
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
