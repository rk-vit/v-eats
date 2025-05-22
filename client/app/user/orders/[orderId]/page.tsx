"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Clock, MapPin, Receipt, UtensilsCrossed } from "lucide-react"
import UserLayout from "@/components/user-layout"

// Sample order data
const orderData = {
  id: "123",
  shopName: "Gazebo",
  shopId: "gazebo",
  status: "preparing", // preparing, ready, completed
  orderTime: "2025-05-14T15:30:00",
  pickupTime: "2025-05-14T15:45:00",
  items: [
    { name: "Chicken Biryani", quantity: 1, price: 180 },
    { name: "Paneer Butter Masala", quantity: 1, price: 160 },
    { name: "Butter Naan", quantity: 2, price: 40 },
  ],
  subtotal: 420,
  taxes: 21,
  total: 441,
  orderNumber: "VIT-2025-1234",
}

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get("success") === "true"

  const [order, setOrder] = useState(orderData)
  const [progress, setProgress] = useState(30)
  const [timeRemaining, setTimeRemaining] = useState(15)

  useEffect(() => {
    if (showSuccess) {
      // Show success message briefly
      const timer = setTimeout(() => {
        router.replace(`/user/orders/${params.orderId}`)
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Simulate order progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setOrder((prev) => ({ ...prev, status: "ready" }))
          return 100
        }
        return prev + 5
      })

      setTimeRemaining((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(progressInterval)
  }, [params.orderId, router, showSuccess])

  if (showSuccess) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">Your order has been confirmed and is being prepared.</p>
          </div>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Button
          variant="ghost"
          className="mb-4 pl-0 flex items-center gap-2"
          onClick={() => router.push("/user/orders")}
        >
          <ArrowLeft className="h-4 w-4" />
          All Orders
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{order.orderNumber}</CardTitle>
                  <CardDescription>From {order.shopName}</CardDescription>
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
                  {order.status === "ready"
                    ? "Ready for Pickup"
                    : order.status === "preparing"
                      ? "Preparing"
                      : "Completed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {order.status === "preparing" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preparing your order</span>
                    <span>{timeRemaining} min remaining</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Order placed</span>
                    <span>Ready for pickup</span>
                  </div>
                </div>
              )}

              {order.status === "ready" && (
                <div className="bg-green-50 p-4 rounded-md flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Your order is ready!</h3>
                    <p className="text-sm text-green-700">Please collect it from {order.shopName}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-medium">Order Details</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹{order.taxes}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Pickup Information</h3>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Time</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.pickupTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup Location</p>
                    <p className="text-sm text-muted-foreground">{order.shopName}, VIT Chennai Campus</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className="w-full" variant="outline" onClick={() => router.push(`/user/shops/${order.shopId}`)}>
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Order Again
              </Button>
              <Button className="w-full" variant="ghost">
                <Receipt className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </UserLayout>
  )
}
