"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/image-upload"
import { Trash2 } from "lucide-react"
import { AboutContent, AboutImage } from "@/types/database"

export default function AboutPage() {
  const [paragraphs, setParagraphs] = useState<AboutContent[]>([])
  const [stats, setStats] = useState<AboutContent[]>([])
  const [images, setImages] = useState<AboutImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [contentRes, imagesRes] = await Promise.all([
      fetch("/api/admin/about/content"),
      fetch("/api/admin/about/images"),
    ])

    const contentData = await contentRes.json()
    const imagesData = await imagesRes.json()

    setParagraphs(contentData.filter((item: AboutContent) => item.section_type === "paragraph"))
    setStats(contentData.filter((item: AboutContent) => item.section_type === "stat"))
    setImages(imagesData)
    setIsLoading(false)
  }

  const updateParagraph = async (id: string, content: string) => {
    await fetch(`/api/admin/about/content/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
  }

  const updateStat = async (id: string, label: string, value: number) => {
    await fetch(`/api/admin/about/content/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, value }),
    })
  }

  const addImage = async (imageUrl: string) => {
    const response = await fetch("/api/admin/about/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl,
        alt_text: "About image",
        order_index: images.length,
      }),
    })

    if (response.ok) {
      fetchData()
    }
  }

  const deleteImage = async (id: string) => {
    await fetch(`/api/admin/about/images/${id}`, {
      method: "DELETE",
    })
    fetchData()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-navy" style={{ fontFamily: "var(--font-montserrat)" }}>
        Manage About Section
      </h1>

      {/* Paragraphs */}
      <Card>
        <CardHeader>
          <CardTitle>Paragraphs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <div key={paragraph.id} className="space-y-2">
              <Label>Paragraph {index + 1}</Label>
              <Textarea
                value={paragraph.content || ""}
                onChange={(e) => {
                  const newParagraphs = [...paragraphs]
                  newParagraphs[index] = { ...paragraph, content: e.target.value }
                  setParagraphs(newParagraphs)
                }}
                onBlur={() => updateParagraph(paragraph.id, paragraph.content || "")}
                rows={3}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={stat.id} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stat {index + 1} - Label</Label>
                <Input
                  value={stat.label || ""}
                  onChange={(e) => {
                    const newStats = [...stats]
                    newStats[index] = { ...stat, label: e.target.value }
                    setStats(newStats)
                  }}
                  onBlur={() => updateStat(stat.id, stat.label || "", stat.value || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Stat {index + 1} - Value</Label>
                <Input
                  type="number"
                  value={stat.value || 0}
                  onChange={(e) => {
                    const newStats = [...stats]
                    newStats[index] = { ...stat, value: parseInt(e.target.value) || 0 }
                    setStats(newStats)
                  }}
                  onBlur={() => updateStat(stat.id, stat.label || "", stat.value || 0)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.image_url}
                  alt={image.alt_text || "About image"}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Add New Image</Label>
            <ImageUpload
              value=""
              onChange={(url) => {
                addImage(url)
              }}
              bucket="about"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
