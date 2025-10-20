"use client"

import { useEffect, useRef } from "react"

interface ParticlegroundOptions {
  minSpeedX?: number
  maxSpeedX?: number
  minSpeedY?: number
  maxSpeedY?: number
  directionX?: 'center' | 'left' | 'right'
  directionY?: 'center' | 'up' | 'down'
  density?: number
  dotColor?: string
  lineColor?: string
  particleRadius?: number
  lineWidth?: number
  curvedLines?: boolean
  proximity?: number
  parallax?: boolean
  parallaxMultiplier?: number
}

interface ParticlegroundBackgroundProps {
  className?: string
  options?: ParticlegroundOptions
}

declare global {
  interface Window {
    particleground: (element: HTMLElement, options?: ParticlegroundOptions) => any
  }
}

export function ParticlegroundBackground({ className = "", options = {} }: ParticlegroundBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<any>(null)

  const defaultOptions: ParticlegroundOptions = {
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7,
    directionX: 'center',
    directionY: 'center',
    density: 10000,
    dotColor: '#FFCB05', // Michigan maize color
    lineColor: '#FFCB05', // Michigan maize color
    particleRadius: 7,
    lineWidth: 1,
    curvedLines: false,
    proximity: 100,
    parallax: true,
    parallaxMultiplier: 5,
    ...options
  }

  useEffect(() => {
    const loadParticleground = () => {
      if (window.particleground && containerRef.current) {
        instanceRef.current = window.particleground(containerRef.current, defaultOptions)
      }
    }

    if (typeof window !== 'undefined') {
      if (window.particleground) {
        loadParticleground()
      } else {
        const script = document.createElement('script')
        script.src = '/jquery.particleground.min.js'
        script.onload = loadParticleground
        document.head.appendChild(script)
      }
    }

    return () => {
      if (instanceRef.current && instanceRef.current.destroy) {
        instanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}