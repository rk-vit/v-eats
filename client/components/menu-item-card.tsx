"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isrecommended: boolean
  isveg: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  inCart: boolean
  quantity?: number
  onAdd: (item: MenuItem) => void
  onRemove: (itemId: string) => void
}

export default function MenuItemCard({ item, inCart, quantity = 0, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <Card key={item.id} className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{item.name}</h3>
                {item.isveg ? (
                  <div className="h-4 w-4 border border-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="h-4 w-4 border border-red-500 flex items-center justify-center">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
            <div className="text-right">
              <div className="font-medium">₹{item.price}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            {inCart ? (
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full"
                  onClick={() => onRemove(item.id)}
                >
                  -
                </Button>
                <span className="font-medium">{quantity}</span>
                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => onAdd(item)}>
                  +
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onAdd(item)}>
                Add
              </Button>
            )}
          </div>
        </div>
        <div className="w-full sm:w-24 h-24 sm:h-auto">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </Card>
  )
}
