"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, UtensilsCrossed } from "lucide-react"

interface OrderItem {
  name: string
  quantity: number
}

interface OrderCardProps {
  order: {
    id: string
    shopName: string
    shopId: string
    status: string
    orderTime: string
    pickupTime: string
    items: OrderItem[]
    total: number
    orderNumber: string
  }
  isPast?: boolean
}

export default function OrderCard({ order, isPast = false }: OrderCardProps) {
  return (
    <Link href={`/user/orders/${order.id}`} key={order.id}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{order.shopName}</h3>
                <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
              </div>
              {isPast ? (
                <p className="text-sm text-muted-foreground">{new Date(order.orderTime).toLocaleDateString()}</p>
              ) : (
                <Badge
                  className={
                    order.status === "ready"
                      ? "bg-green-500"
                      : order.status === "preparing"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                  }
                >
                  {order.status === "ready"
                    ? "Ready for Pickup"
                    : order.status === "preparing"
                      ? "Preparing"
                      : "Completed"}
                </Badge>
              )}
            </div>
          </div>
          <div className="p-4">
            {!isPast && (
              <div className="flex items-start gap-3 mb-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">
                    Pickup at{" "}
                    {new Date(order.pickupTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-1">
              {order.items.map((item, index) => (
                <p key={index} className="text-sm">
                  {item.quantity}x {item.name}
                </p>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              {isPast ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `/user/shops/${order.shopId}`
                  }}
                >
                  <UtensilsCrossed className="mr-1 h-3 w-3" />
                  Order Again
                </Button>
              ) : (
                <span className="text-sm font-medium">Total</span>
              )}
              <span className="font-medium">₹{order.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
