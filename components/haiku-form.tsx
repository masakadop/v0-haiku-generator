"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface HaikuFormProps {
  onSubmit: (haiku: { line1: string; line2: string; line3: string }) => void
}

export function HaikuForm({ onSubmit }: HaikuFormProps) {
  const [line1, setLine1] = useState("")
  const [line2, setLine2] = useState("")
  const [line3, setLine3] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (line1.trim() && line2.trim() && line3.trim()) {
      onSubmit({ line1: line1.trim(), line2: line2.trim(), line3: line3.trim() })
    }
  }

  const isValid = line1.trim() && line2.trim() && line3.trim()

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="line1" className="text-base font-medium text-foreground">
            上の句（五文字）
          </Label>
          <Input
            id="line1"
            type="text"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            placeholder="例：古池や"
            className="text-lg py-6 px-4 bg-card border-border focus:border-primary focus:ring-primary placeholder:text-muted-foreground/50"
          />
          <p className="text-sm text-muted-foreground">
            {line1.length} 文字
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="line2" className="text-base font-medium text-foreground">
            中の句（七文字）
          </Label>
          <Input
            id="line2"
            type="text"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            placeholder="例：蛙飛び込む"
            className="text-lg py-6 px-4 bg-card border-border focus:border-primary focus:ring-primary placeholder:text-muted-foreground/50"
          />
          <p className="text-sm text-muted-foreground">
            {line2.length} 文字
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="line3" className="text-base font-medium text-foreground">
            下の句（五文字）
          </Label>
          <Input
            id="line3"
            type="text"
            value={line3}
            onChange={(e) => setLine3(e.target.value)}
            placeholder="例：水の音"
            className="text-lg py-6 px-4 bg-card border-border focus:border-primary focus:ring-primary placeholder:text-muted-foreground/50"
          />
          <p className="text-sm text-muted-foreground">
            {line3.length} 文字
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        短冊を作成する
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  )
}
