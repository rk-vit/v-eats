"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash2 } from "lucide-react"
import ShopLayout from "@/components/shop-layout"

// Sample menu data
const initialMenu = [
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices",
    price: 180,
    image: "/placeholder.svg?height=120&width=120&text=Biryani",
    category: "Biryani",
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
    isRecommended: true,
    isVeg: true,
  },
]

// Categories
const categories = ["Biryani", "Curry", "Breads", "Desserts"]

export default function MenuPage() {
  const [menu, setMenu] = useState(initialMenu)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)

  const filteredMenu = selectedCategory === "All" ? menu : menu.filter((item) => item.category === selectedCategory)

  const handleAvailabilityToggle = (id: string) => {
    setMenu((prev) => prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)))
  }

  const handleRecommendedToggle = (id: string) => {
    setMenu((prev) => prev.map((item) => (item.id === id ? { ...item, isRecommended: !item.isRecommended } : item)))
  }

  const handleEditItem = (item: any) => {
    setCurrentItem(item)
    setIsEditDialogOpen(true)
  }

  const handleAddItem = () => {
    setCurrentItem({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "/placeholder.svg?height=120&width=120&text=New",
      category: categories[0],
      isAvailable: true,
      isRecommended: false,
      isVeg: true,
    })
    setIsAddDialogOpen(true)
  }

  const handleSaveItem = (item: any, isNew: boolean) => {
    if (isNew) {
      // Generate a simple ID based on name
      const id = item.name.toLowerCase().replace(/\s+/g, "-")
      setMenu((prev) => [...prev, { ...item, id }])
      setIsAddDialogOpen(false)
    } else {
      setMenu((prev) => prev.map((menuItem) => (menuItem.id === item.id ? item : menuItem)))
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenu((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Menu Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove items from your menu</p>
          </div>
          <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>

        <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
              <TabsTrigger
                value="All"
                className="px-4 py-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 rounded-full"
              >
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 rounded-full"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid gap-4">
              {filteredMenu.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground">No items in this category</p>
                  <Button variant="outline" className="mt-4" onClick={handleAddItem}>
                    Add Item
                  </Button>
                </div>
              ) : (
                filteredMenu.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{item.name}</h3>
                                {item.isVeg ? (
                                  <div className="h-4 w-4 border border-green-500 flex items-center justify-center">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                  </div>
                                ) : (
                                  <div className="h-4 w-4 border border-red-500 flex items-center justify-center">
                                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                                  </div>
                                )}
                                {!item.isAvailable && (
                                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                                    Unavailable
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              <div className="mt-2">
                                <Badge variant="outline">{item.category}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₹{item.price}</div>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`available-${item.id}`}
                                checked={item.isAvailable}
                                onCheckedChange={() => handleAvailabilityToggle(item.id)}
                              />
                              <Label htmlFor={`available-${item.id}`}>Available</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`recommended-${item.id}`}
                                checked={item.isRecommended}
                                onCheckedChange={() => handleRecommendedToggle(item.id)}
                              />
                              <Label htmlFor={`recommended-${item.id}`}>Recommended</Label>
                            </div>
                            <div className="flex gap-2 ml-auto">
                              <Button variant="outline" size="icon" onClick={() => handleEditItem(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:w-24 h-24 sm:h-auto">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Item Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Add a new item to your menu. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={currentItem?.name || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentItem?.description || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={currentItem?.price || 0}
                    onChange={(e) => setCurrentItem({ ...currentItem, price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentItem?.category || categories[0]}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-veg"
                  checked={currentItem?.isVeg || false}
                  onCheckedChange={(checked) => setCurrentItem({ ...currentItem, isVeg: checked })}
                />
                <Label htmlFor="is-veg">Vegetarian</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveItem(currentItem, true)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogDescription>Make changes to the menu item. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={currentItem?.name || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentItem?.description || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentItem?.price || 0}
                    onChange={(e) => setCurrentItem({ ...currentItem, price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    id="edit-category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentItem?.category || categories[0]}
                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is-veg"
                  checked={currentItem?.isVeg || false}
                  onCheckedChange={(checked) => setCurrentItem({ ...currentItem, isVeg: checked })}
                />
                <Label htmlFor="edit-is-veg">Vegetarian</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveItem(currentItem, false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ShopLayout>
  )
}
