"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface OrderItem {
  name: string
  quantity: number
}

interface ShopOrderCardProps {
  order: {
    id: string
    customerName: string
    status: string
    orderTime: string
    pickupTime: string
    items: OrderItem[]
    total: number
    orderNumber: string
    timeRemaining: number
  }
  onStatusChange: (orderId: string, newStatus: string) => void
  onExtendTime: (orderId: string) => void
}

export default function ShopOrderCard({ order, onStatusChange, onExtendTime }: ShopOrderCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(order.timeRemaining)
  const [showExtendButton, setShowExtendButton] = useState(false)
  const [progress, setProgress] = useState(order.status === "preparing" ? 100 - (order.timeRemaining / 15) * 100 : 100)

  useEffect(() => {
    if (order.status !== "preparing") return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0
        return prev - 1 / 60 // Decrease by 1 second (1/60 of a minute)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [order.status])

  useEffect(() => {
    // Show extend button when less than 5 minutes remain
    setShowExtendButton(timeRemaining > 0 && timeRemaining < 5 && order.status === "preparing")

    // Update progress based on time remaining
    if (order.status === "preparing") {
      setProgress(100 - (timeRemaining / 15) * 100)
    }
  }, [timeRemaining, order.status])

  const handleExtendTime = () => {
    setTimeRemaining((prev) => prev + 5)
    onExtendTime(order.id)
  }

  return (
    <Card key={order.id}>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{order.customerName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{order.customerName}</h3>
                <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
              </div>
            </div>
            <Badge
              className={
                order.status === "ready"
                  ? "bg-green-500"
                  : order.status === "preparing"
                    ? "bg-orange-500"
                    : "bg-blue-500"
              }
            >
              {order.status === "ready" ? "Ready for Pickup" : order.status === "preparing" ? "Preparing" : "Completed"}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          {order.status === "preparing" && (
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span>Preparing order</span>
                <span className={timeRemaining < 5 ? "text-red-500 font-medium" : ""}>
                  {timeRemaining.toFixed(1)} min remaining
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex items-start gap-3 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm">
                Pickup at {new Date(order.pickupTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {order.items.map((item, index) => (
              <p key={index} className="text-sm">
                {item.quantity}x {item.name}
              </p>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <span className="text-sm font-medium">Total</span>
            <span className="font-medium">₹{order.total}</span>
          </div>

          {showExtendButton && (
            <div className="mt-3 p-2 bg-red-50 rounded-md flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-xs text-red-700 flex-1">Time is running out!</p>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleExtendTime}
              >
                Add 5 min
              </Button>
            </div>
          )}

          {order.status === "preparing" && (
            <div className="mt-4">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onStatusChange(order.id, "ready")}
              >
                Mark as Ready
              </Button>
            </div>
          )}

          {order.status === "ready" && (
            <div className="mt-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onStatusChange(order.id, "completed")}
              >
                Mark as Completed
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
