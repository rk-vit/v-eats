"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Clock, Star } from "lucide-react"
import UserLayout from "@/components/user-layout"
import MenuItemCard from "@/components/menu-item-card"
import TimePicker from "@/components/time-picker"

// Sample data for shops
const shops = {
  gazebo: {
    id: "gazebo",
    name: "Gazebo",
    description: "Authentic North Indian cuisine",
    image: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=800&text=Gazebo",
    rating: 4.5,
    status: "Open",
    estimatedTime: "15-20 min",
    categories: ["Recommended", "Biryani", "Curry", "Breads", "Desserts"],
    menu: [
      {
        id: "chicken-biryani",
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices",
        price: 180,
        image: "/placeholder.svg?height=120&width=120&text=Biryani",
        category: "Biryani",
        isRecommended: true,
        isVeg: false,
      },
      {
        id: "paneer-butter-masala",
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in a rich and creamy tomato-based gravy",
        price: 160,
        image: "/placeholder.svg?height=120&width=120&text=Paneer",
        category: "Curry",
        isRecommended: true,
        isVeg: true,
      },
      {
        id: "butter-naan",
        name: "Butter Naan",
        description: "Soft and fluffy leavened bread brushed with butter",
        price: 40,
        image: "/placeholder.svg?height=120&width=120&text=Naan",
        category: "Breads",
        isRecommended: false,
        isVeg: true,
      },
      {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        description: "Deep-fried milk solids soaked in sugar syrup",
        price: 80,
        image: "/placeholder.svg?height=120&width=120&text=Dessert",
        category: "Desserts",
        isRecommended: true,
        isVeg: true,
      },
    ],
  },
  sris: {
    id: "sris",
    name: "Sris",
    description: "South Indian delicacies",
    image: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=800&text=Sris",
    rating: 4.2,
    status: "Open",
    estimatedTime: "10-15 min",
    categories: ["Recommended", "Dosa", "Idli", "Rice", "Beverages"],
    menu: [
      {
        id: "masala-dosa",
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato filling",
        price: 90,
        image: "/placeholder.svg?height=120&width=120&text=Dosa",
        category: "Dosa",
        isRecommended: true,
        isVeg: true,
      },
      {
        id: "idli-sambar",
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil soup and coconut chutney",
        price: 70,
        image: "/placeholder.svg?height=120&width=120&text=Idli",
        category: "Idli",
        isRecommended: true,
        isVeg: true,
      },
    ],
  },
  gymkhana: {
    id: "gymkhana",
    name: "GymKhana",
    description: "Healthy and protein-rich meals",
    image: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=800&text=GymKhana",
    rating: 4.0,
    status: "Open",
    estimatedTime: "20-25 min",
    categories: ["Recommended", "Protein Bowls", "Salads", "Smoothies"],
    menu: [
      {
        id: "chicken-protein-bowl",
        name: "Chicken Protein Bowl",
        description: "Grilled chicken with quinoa, mixed vegetables, and hummus",
        price: 220,
        image: "/placeholder.svg?height=120&width=120&text=Protein",
        category: "Protein Bowls",
        isRecommended: true,
        isVeg: false,
      },
    ],
  },
  northsquare: {
    id: "northsquare",
    name: "North Square",
    description: "Multi-cuisine restaurant",
    image: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=800&text=NorthSquare",
    rating: 4.3,
    status: "Open",
    estimatedTime: "15-20 min",
    categories: ["Recommended", "Chinese", "Continental", "Indian"],
    menu: [
      {
        id: "hakka-noodles",
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables in a spicy sauce",
        price: 120,
        image: "/placeholder.svg?height=120&width=120&text=Noodles",
        category: "Chinese",
        isRecommended: true,
        isVeg: true,
      },
    ],
  },
}

export default function ShopDetailPage({ params }: { params: { shopId: string } }) {
  const router = useRouter()
  const { shopId } = params
  const shop = shops[shopId as keyof typeof shops]

  const [selectedCategory, setSelectedCategory] = useState("Recommended")
  const [cart, setCart] = useState<{ [key: string]: { item: any; quantity: number } }>({})
  const [pickupTime, setPickupTime] = useState(15)

  if (!shop) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Shop not found</h1>
          <p className="mb-6">The shop you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/user/shops")}>Back to Shops</Button>
        </div>
      </UserLayout>
    )
  }

  const filteredMenu =
    selectedCategory === "Recommended"
      ? shop.menu.filter((item) => item.isRecommended)
      : shop.menu.filter((item) => item.category === selectedCategory)

  const addToCart = (item: any) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[item.id]) {
        newCart[item.id].quantity += 1
      } else {
        newCart[item.id] = { item, quantity: 1 }
      }
      return newCart
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const cartItems = Object.values(cart)
  const cartTotal = cartItems.reduce((total, { item, quantity }) => total + item.price * quantity, 0)

  const proceedToCheckout = () => {
    router.push(`/user/checkout?shopId=${shopId}&pickupTime=${pickupTime}`)
  }

  return (
    <UserLayout>
      <div className="relative">
        <div className="h-48 md:h-64 w-full relative">
          <img src={shop.coverImage || "/placeholder.svg"} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={() => router.push("/user/shops")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-16 mb-6 flex items-start gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={shop.image || "/placeholder.svg"} alt={shop.name} />
              <AvatarFallback>{shop.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="pt-16 md:pt-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
                <Badge variant={shop.status === "Open" ? "success" : "destructive"} className="bg-green-500">
                  {shop.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{shop.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{shop.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{shop.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
            <div>
              <Tabs defaultValue="Recommended" className="w-full">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                    {shop.categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        onClick={() => setSelectedCategory(category)}
                        className="px-4 py-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 rounded-full"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value={selectedCategory} className="mt-6 w-full overflow-hidden">
                  <div className="grid gap-4 w-full">
                    {filteredMenu.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No items found in this category</p>
                      </div>
                    ) : (
                      filteredMenu.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          inCart={!!cart[item.id]}
                          quantity={cart[item.id]?.quantity || 0}
                          onAdd={addToCart}
                          onRemove={removeFromCart}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:sticky md:top-4 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                  <CardDescription>From {shop.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground mt-1">Add items to place an order</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map(({ item, quantity }) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col sm:flex-row w-full items-center gap-1 text-sm">
                              <span className="font-medium">{quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                          </div>
                          <div className="font-medium">₹{item.price * quantity}</div>
                        </div>
                      ))}

                      <div className="border-t pt-4">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>₹{cartTotal}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <TimePicker value={pickupTime} onChange={setPickupTime} min={10} max={60} />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={cartItems.length === 0}
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
