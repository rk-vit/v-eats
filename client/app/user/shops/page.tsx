"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UtensilsCrossed } from "lucide-react"
import UserLayout from "@/components/user-layout"
import ShopCard from "@/components/shop-card"

// Sample data for shops
type Shop = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  coverimage:string
  status: string;
  estimatedTime: string;
  tags: string[];
};
/*
var defaultShops = [
  {
    id: "sris",
    name: "Sris",
    description: "South Indian delicacies",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.2,
    status: "Open",
    estimatedTime: "10-15 min",
    tags: ["South Indian", "Dosa", "Idli"],
  },
  {
    id: "gymkhana",
    name: "GymKhana",
    description: "Healthy and protein-rich meals",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.0,
    status: "Open",
    estimatedTime: "20-25 min",
    tags: ["Healthy", "Protein", "Salads"],
  },
  {
    id: "northsquare",
    name: "North Square",
    description: "Multi-cuisine restaurant",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.3,
    status: "Open",
    estimatedTime: "15-20 min",
    tags: ["Multi-cuisine", "Chinese", "Continental"],
  },
]
  */

export default function ShopsPage() {
  const[loading,setLoading] = useState(true);
  const [shops,setShops] = useState<Shop[]>([])
  useEffect(()=>{
    getShops();
  },[]);
  async function getShops(){
    try{
    const res = await fetch("/api/shops",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await res.json();
      setShops(() => [...data.shops])
    }catch(err){
      console.log("Some error in fetching shops:", err);
    }finally{
      setLoading(false);
    }
  }
  const [searchQuery, setSearchQuery] = useState("")

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )
  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Campus Eateries</h1>
            <p className="text-muted-foreground">Find and order from your favorite campus food spots</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search restaurants or cuisines..."
              className="w-full md:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredShops.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No restaurants found</h2>
            <p className="text-muted-foreground">We couldn't find any restaurants matching "{searchQuery}"</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  )
}
