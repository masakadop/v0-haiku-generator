"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ColorOption {
  name: string
  background: string
  text: string
}

const colorOptions: ColorOption[] = [
  { name: "紅白", background: "#FDF6F0", text: "#2D1810" },
  { name: "藤色", background: "#E8E4F0", text: "#2D2840" },
  { name: "若草", background: "#E8F0E4", text: "#1A2D18" },
  { name: "空色", background: "#E4EEF0", text: "#18282D" },
  { name: "珊瑚", background: "#F0E8E4", text: "#2D2018" },
  { name: "墨色", background: "#2D2D2D", text: "#F0F0E8" },
  { name: "茜色", background: "#8B2D2D", text: "#F5F0E8" },
  { name: "深緑", background: "#2D4A3D", text: "#F0F5F0" },
]

interface ColorPickerProps {
  selectedColor: ColorOption
  onColorChange: (color: ColorOption) => void
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">背景色を選択</h3>
      <div className="grid grid-cols-4 gap-3">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color)}
            className={cn(
              "relative aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105",
              selectedColor.name === color.name
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-border hover:border-primary/50"
            )}
            style={{ backgroundColor: color.background }}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="h-5 w-5" style={{ color: color.text }} />
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        選択中: <span className="font-medium text-foreground">{selectedColor.name}</span>
      </p>
    </div>
  )
}

export { colorOptions }
export type { ColorOption }
