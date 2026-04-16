"use client"

import { Button } from "@/components/ui/button"
import { Download, Twitter, Share2 } from "lucide-react"
import { getTanzakuDataUrl } from "./tanzaku-preview"

interface ShareButtonsProps {
  haiku: {
    line1: string
    line2: string
    line3: string
  }
  backgroundColor: string
  textColor: string
}

export function ShareButtons({ haiku, backgroundColor, textColor }: ShareButtonsProps) {
  const haikuText = `${haiku.line1}　${haiku.line2}　${haiku.line3}`

  const handleDownload = async () => {
    const dataUrl = await getTanzakuDataUrl(haiku, backgroundColor, textColor)
    const link = document.createElement("a")
    link.download = `haiku-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${haikuText}\n\n#俳句 #俳句メーカー`)
    const url = `https://twitter.com/intent/tweet?text=${text}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const dataUrl = await getTanzakuDataUrl(haiku, backgroundColor, textColor)
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const file = new File([blob], "haiku.png", { type: "image/png" })

        await navigator.share({
          title: "俳句",
          text: haikuText,
          files: [file],
        })
      } catch {
        // Fallback to text-only share
        await navigator.share({
          title: "俳句",
          text: haikuText,
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">SNSに投稿</h3>
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleDownload}
          variant="outline"
          className="w-full py-6 text-base border-border hover:bg-secondary hover:text-secondary-foreground"
        >
          <Download className="mr-2 h-5 w-5" />
          画像をダウンロード
        </Button>

        <Button
          onClick={handleTwitterShare}
          className="w-full py-6 text-base bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
        >
          <Twitter className="mr-2 h-5 w-5" />
          X (Twitter) に投稿
        </Button>

        {typeof navigator !== "undefined" && navigator.share && (
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full py-6 text-base border-border hover:bg-secondary hover:text-secondary-foreground"
          >
            <Share2 className="mr-2 h-5 w-5" />
            その他のアプリで共有
          </Button>
        )}
      </div>
    </div>
  )
}
