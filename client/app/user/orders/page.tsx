"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Receipt } from "lucide-react"
import UserLayout from "@/components/user-layout"
import OrderCard from "@/components/order-card"

// Sample orders data
const orders = [
  {
    id: "123",
    shopName: "Gazebo",
    shopId: "gazebo",
    status: "preparing",
    orderTime: "2025-05-14T15:30:00",
    pickupTime: "2025-05-14T15:45:00",
    items: [
      { name: "Chicken Biryani", quantity: 1 },
      { name: "Paneer Butter Masala", quantity: 1 },
      { name: "Butter Naan", quantity: 2 },
    ],
    total: 441,
    orderNumber: "VIT-2025-1234",
  },
  {
    id: "122",
    shopName: "Sris",
    shopId: "sris",
    status: "completed",
    orderTime: "2025-05-13T12:30:00",
    pickupTime: "2025-05-13T12:45:00",
    items: [
      { name: "Masala Dosa", quantity: 2 },
      { name: "Idli Sambar", quantity: 1 },
    ],
    total: 250,
    orderNumber: "VIT-2025-1233",
  },
  {
    id: "121",
    shopName: "North Square",
    shopId: "northsquare",
    status: "completed",
    orderTime: "2025-05-12T19:15:00",
    pickupTime: "2025-05-12T19:30:00",
    items: [
      { name: "Hakka Noodles", quantity: 1 },
      { name: "Manchurian", quantity: 1 },
    ],
    total: 220,
    orderNumber: "VIT-2025-1232",
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active")

  const activeOrders = orders.filter((order) => order.status !== "completed")
  const pastOrders = orders.filter((order) => order.status === "completed")

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Your Orders</h1>
            <p className="text-muted-foreground">Track and manage your food orders</p>
          </div>
        </div>

        <Tabs defaultValue="active" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="past">Past Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
                  <Package className="h-8 w-8 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No active orders</h2>
                <p className="text-muted-foreground mb-6">You don't have any active orders at the moment</p>
                <Button
                  onClick={() => (window.location.href = "/user/shops")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Order Food
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Receipt className="h-8 w-8 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No order history</h2>
                <p className="text-muted-foreground mb-6">You haven't placed any orders yet</p>
                <Button
                  onClick={() => (window.location.href = "/user/shops")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Order Food
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isPast={true} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  )
}
