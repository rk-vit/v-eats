"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"

interface TimePickerProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function TimePicker({ value, onChange, min = 10, max = 60 }: TimePickerProps) {
  const [pickupNow, setPickupNow] = useState(false)

  const handlePickupNowToggle = (checked: boolean) => {
    setPickupNow(checked)
    if (checked) {
      onChange(min)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="pickup-time" className="text-sm font-medium">
          Pickup in (minutes)
        </Label>
        <div className="flex items-center space-x-2">
          <Switch id="pickup-now" checked={pickupNow} onCheckedChange={handlePickupNowToggle} />
          <Label htmlFor="pickup-now" className="text-sm">
            Pickup ASAP
          </Label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onChange(Math.max(min, value - 5))}
          disabled={value <= min || pickupNow}
        >
          -
        </Button>
        <Input
          id="pickup-time"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-8 text-center"
          min={min}
          max={max}
          disabled={pickupNow}
        />
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onChange(Math.min(max, value + 5))}
          disabled={value >= max || pickupNow}
        >
          +
        </Button>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <Info className="h-3 w-3 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          {pickupNow
            ? `Your order will be ready for pickup as soon as possible (est. ${min} minutes)`
            : `Your order will be ready for pickup in ${value} minutes`}
        </p>
      </div>
    </div>
  )
}
