import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ShopCardProps {
  shop: {
    id: string
    name: string
    description: string
    image: string
    rating: number
    status: string
    estimatedTime: string
    tags: string[]
  }
}

export default function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link href={`/user/shops/${shop.id}`} key={shop.id}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="h-40 w-full relative overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src={`/placeholder.svg?height=160&width=400&text=${shop.name}`}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 z-20">
              <Badge variant={shop.status === "Open" ? "success" : "destructive"} className="bg-green-500">
                {shop.status}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm -mt-8 relative z-20">
                <AvatarImage src={shop.image || "/placeholder.svg"} alt={shop.name} />
                <AvatarFallback>{shop.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{shop.name}</h3>
                <p className="text-muted-foreground text-sm">{shop.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {shop.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{shop.rating}</span>
              </div>
              <div className="text-muted-foreground">{shop.estimatedTime} delivery</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
