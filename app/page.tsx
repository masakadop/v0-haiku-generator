"use client"

import { useState } from "react"
import { HaikuForm } from "@/components/haiku-form"
import { TanzakuPreview } from "@/components/tanzaku-preview"
import { ColorPicker, colorOptions, type ColorOption } from "@/components/color-picker"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

type Step = "input" | "preview"

interface Haiku {
  line1: string
  line2: string
  line3: string
}

export default function HaikuMakerPage() {
  const [step, setStep] = useState<Step>("input")
  const [haiku, setHaiku] = useState<Haiku | null>(null)
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0])

  const handleHaikuSubmit = (newHaiku: Haiku) => {
    setHaiku(newHaiku)
    setStep("preview")
  }

  const handleBack = () => {
    setStep("input")
  }

  const handleNewHaiku = () => {
    setHaiku(null)
    setSelectedColor(colorOptions[0])
    setStep("input")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">俳句メーカー</h1>
                <p className="text-xs text-muted-foreground">短冊画像を作成してSNSに投稿</p>
              </div>
            </div>
            {step === "preview" && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                戻る
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {step === "input" ? (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
                あなたの俳句を入力してください
              </h2>
              <p className="text-muted-foreground text-balance">
                五・七・五のリズムで、季節や心情を詠んでみましょう
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <HaikuForm onSubmit={handleHaikuSubmit} />
            </div>

            {/* Example haikus */}
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">参考例</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { line1: "古池や", line2: "蛙飛び込む", line3: "水の音" },
                  { line1: "閑さや", line2: "岩にしみ入る", line3: "蝉の声" },
                  { line1: "柿くへば", line2: "鐘が鳴るなり", line3: "法隆寺" },
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleHaikuSubmit(example)}
                    className="text-sm px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    {example.line1}{example.line2}{example.line3}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          haiku && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  短冊が完成しました
                </h2>
                <p className="text-muted-foreground">
                  背景色を選んで、SNSに投稿しましょう
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Preview */}
                <div className="order-1 md:order-2">
                  <div className="sticky top-32">
                    <TanzakuPreview
                      haiku={haiku}
                      backgroundColor={selectedColor.background}
                      textColor={selectedColor.text}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="order-2 md:order-1 space-y-8">
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-foreground mb-2">作成した俳句</h3>
                      <p className="text-xl text-foreground leading-relaxed">
                        {haiku.line1}　{haiku.line2}　{haiku.line3}
                      </p>
                    </div>
                    <ColorPicker
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                    />
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <ShareButtons
                      haiku={haiku}
                      backgroundColor={selectedColor.background}
                      textColor={selectedColor.text}
                    />
                  </div>

                  <Button
                    onClick={handleNewHaiku}
                    variant="outline"
                    className="w-full py-6 text-base border-border hover:bg-secondary"
                  >
                    新しい俳句を作る
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            俳句メーカー © 2026
          </p>
        </div>
      </footer>
    </main>
  )
}
