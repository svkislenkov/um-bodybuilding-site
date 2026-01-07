"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import Image from "next/image"

type Props = {
  value?: string
  onChange: (url: string) => void
  bucket?: string
}

export function ImageUpload({ value, onChange, bucket = "images" }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("bucket", bucket)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        onChange(data.url)
      } else {
        setError(data.error || "Failed to upload image")
      }
    } catch (error) {
      setError("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {value && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => onChange("")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="cursor-pointer"
        />
        {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  )
}
