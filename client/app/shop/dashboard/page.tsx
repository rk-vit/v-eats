"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ShoppingBag, Users, Clock } from "lucide-react"
import ShopLayout from "@/components/shop-layout"
import ShopOrderCard from "@/components/shop-order-card"

// Sample data for orders
const initialOrders = [
  {
    id: "123",
    customerName: "Rahul Sharma",
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
    timeRemaining: 15,
  },
  {
    id: "124",
    customerName: "Priya Patel",
    status: "ready",
    orderTime: "2025-05-14T15:15:00",
    pickupTime: "2025-05-14T15:30:00",
    items: [
      { name: "Veg Biryani", quantity: 1 },
      { name: "Butter Naan", quantity: 1 },
    ],
    total: 220,
    orderNumber: "VIT-2025-1235",
    timeRemaining: 0,
  },
]

// Sample data for today's stats
const todayStats = {
  totalOrders: 12,
  totalRevenue: 3240,
  totalCustomers: 10,
  pendingOrders: 2,
}

export default function ShopDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [orders, setOrders] = useState(initialOrders)

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const handleExtendTime = (orderId: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, timeRemaining: order.timeRemaining + 5 } : order)),
    )
  }

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Shop Dashboard</h1>
            <p className="text-muted-foreground">Manage your orders and menu</p>
          </div>
          <Button onClick={() => (window.location.href = "/shop/menu")} className="bg-orange-600 hover:bg-orange-700">
            Manage Menu
          </Button>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{todayStats.totalRevenue}</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">To be prepared</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <ShopOrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onExtendTime={handleExtendTime}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold mb-4">Preparing</h2>
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "preparing")
                    .map((order) => (
                      <ShopOrderCard
                        key={order.id}
                        order={order}
                        onStatusChange={handleStatusChange}
                        onExtendTime={handleExtendTime}
                      />
                    ))}

                  {orders.filter((order) => order.status === "preparing").length === 0 && (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-muted-foreground">No orders being prepared</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Ready for Pickup</h2>
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "ready")
                    .map((order) => (
                      <ShopOrderCard
                        key={order.id}
                        order={order}
                        onStatusChange={handleStatusChange}
                        onExtendTime={handleExtendTime}
                      />
                    ))}

                  {orders.filter((order) => order.status === "ready").length === 0 && (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-muted-foreground">No orders ready for pickup</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ShopLayout>
  )
}
