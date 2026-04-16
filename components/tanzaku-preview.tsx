"use client"

import { useRef, useEffect, useState } from "react"

interface TanzakuPreviewProps {
  haiku: {
    line1: string
    line2: string
    line3: string
  }
  backgroundColor: string
  textColor: string
}

export function TanzakuPreview({ haiku, backgroundColor, textColor }: TanzakuPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      setFontLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!fontLoaded) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas dimensions (vertical tanzaku style)
    const width = 400
    const height = 800
    canvas.width = width
    canvas.height = height

    // Background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Add subtle border
    ctx.strokeStyle = textColor + "30"
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, width - 40, height - 40)

    // Add decorative corner elements
    ctx.strokeStyle = textColor + "40"
    ctx.lineWidth = 2
    
    // Top left corner
    ctx.beginPath()
    ctx.moveTo(40, 60)
    ctx.lineTo(40, 40)
    ctx.lineTo(60, 40)
    ctx.stroke()

    // Top right corner
    ctx.beginPath()
    ctx.moveTo(width - 60, 40)
    ctx.lineTo(width - 40, 40)
    ctx.lineTo(width - 40, 60)
    ctx.stroke()

    // Bottom left corner
    ctx.beginPath()
    ctx.moveTo(40, height - 60)
    ctx.lineTo(40, height - 40)
    ctx.lineTo(60, height - 40)
    ctx.stroke()

    // Bottom right corner
    ctx.beginPath()
    ctx.moveTo(width - 60, height - 40)
    ctx.lineTo(width - 40, height - 40)
    ctx.lineTo(width - 40, height - 60)
    ctx.stroke()

    // Text settings
    ctx.fillStyle = textColor
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw haiku text vertically
    const fontSize = 42
    ctx.font = `500 ${fontSize}px "Noto Serif JP", serif`
    
    const centerX = width / 2
    const startY = 120
    const lineHeight = fontSize * 1.8
    
    // Combine all lines and draw vertically centered
    const fullText = haiku.line1 + haiku.line2 + haiku.line3
    const chars = fullText.split("")
    
    chars.forEach((char, index) => {
      ctx.fillText(char, centerX, startY + index * lineHeight * 0.6)
    })

    // Add author line (small text at bottom)
    ctx.font = `400 18px "Noto Serif JP", serif`
    ctx.fillStyle = textColor + "80"
    ctx.fillText("俳句メーカー", centerX, height - 60)

  }, [haiku, backgroundColor, textColor, fontLoaded])

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="shadow-2xl rounded-lg max-w-full h-auto"
        style={{ maxHeight: "600px" }}
      />
    </div>
  )
}

export function getTanzakuDataUrl(
  haiku: { line1: string; line2: string; line3: string },
  backgroundColor: string,
  textColor: string
): Promise<string> {
  return new Promise((resolve) => {
    document.fonts.ready.then(() => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve("")
        return
      }

      const width = 400
      const height = 800
      canvas.width = width
      canvas.height = height

      // Background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      // Border
      ctx.strokeStyle = textColor + "30"
      ctx.lineWidth = 4
      ctx.strokeRect(20, 20, width - 40, height - 40)

      // Corner decorations
      ctx.strokeStyle = textColor + "40"
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(40, 60)
      ctx.lineTo(40, 40)
      ctx.lineTo(60, 40)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(width - 60, 40)
      ctx.lineTo(width - 40, 40)
      ctx.lineTo(width - 40, 60)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(40, height - 60)
      ctx.lineTo(40, height - 40)
      ctx.lineTo(60, height - 40)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(width - 60, height - 40)
      ctx.lineTo(width - 40, height - 40)
      ctx.lineTo(width - 40, height - 60)
      ctx.stroke()

      // Text
      ctx.fillStyle = textColor
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const fontSize = 42
      ctx.font = `500 ${fontSize}px "Noto Serif JP", serif`

      const centerX = width / 2
      const startY = 120
      const lineHeight = fontSize * 1.8

      const fullText = haiku.line1 + haiku.line2 + haiku.line3
      const chars = fullText.split("")

      chars.forEach((char, index) => {
        ctx.fillText(char, centerX, startY + index * lineHeight * 0.6)
      })

      ctx.font = `400 18px "Noto Serif JP", serif`
      ctx.fillStyle = textColor + "80"
      ctx.fillText("俳句メーカー", centerX, height - 60)

      resolve(canvas.toDataURL("image/png"))
    })
  })
}
