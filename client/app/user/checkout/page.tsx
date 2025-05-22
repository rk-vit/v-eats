"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CheckCircle2, CreditCard, Loader2 } from "lucide-react"
import UserLayout from "@/components/user-layout"

// Sample data for shops (simplified version)
const shops = {
  gazebo: {
    id: "gazebo",
    name: "Gazebo",
  },
  sris: {
    id: "sris",
    name: "Sris",
  },
  gymkhana: {
    id: "gymkhana",
    name: "GymKhana",
  },
  northsquare: {
    id: "northsquare",
    name: "North Square",
  },
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shopId = searchParams.get("shopId") || ""
  const pickupTime = searchParams.get("pickupTime") || "15"

  const shop = shops[shopId as keyof typeof shops]

  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!shop) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid checkout</h1>
          <p className="mb-6">The shop information is missing or invalid.</p>
          <Button onClick={() => router.push("/user/shops")}>Back to Shops</Button>
        </div>
      </UserLayout>
    )
  }

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Redirect to order confirmation after payment success
      setTimeout(() => {
        router.push(`/user/orders/123?success=true`)
      }, 2000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been placed successfully. Redirecting to order details...
            </p>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Button variant="ghost" className="mb-4 pl-0 flex items-center gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order from {shop.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>₹16</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>₹336</span>
                </div>
                <div className="bg-orange-50 p-3 rounded-md text-sm">
                  <p className="font-medium text-orange-800">Pickup Information</p>
                  <p className="text-orange-700 mt-1">
                    Your order will be ready for pickup in {pickupTime} minutes from {shop.name}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    <div className="font-medium">UPI</div>
                    <div className="text-sm text-muted-foreground">Pay using any UPI app</div>
                  </Label>
                  <div className="flex gap-1">
                    <div className="h-6 w-6 bg-purple-100 rounded-sm flex items-center justify-center text-xs font-bold text-purple-600">
                      G
                    </div>
                    <div className="h-6 w-6 bg-green-100 rounded-sm flex items-center justify-center text-xs font-bold text-green-600">
                      P
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">Pay using your card</div>
                  </Label>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                    <div className="font-medium">Campus Wallet</div>
                    <div className="text-sm text-muted-foreground">Pay using your campus wallet</div>
                  </Label>
                  <div className="h-6 w-6 bg-orange-100 rounded-sm flex items-center justify-center text-xs font-bold text-orange-600">
                    W
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "upi" && (
                <div className="mt-4 space-y-3">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="yourname@upi" />
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay ₹336`
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </UserLayout>
  )
}
