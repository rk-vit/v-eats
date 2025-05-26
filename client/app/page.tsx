import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, UtensilsCrossed } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <UtensilsCrossed className="h-6 w-6 text-orange-500" />
          <span>V-EATS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Skip the Wait, Preorder Your Food
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Order ahead from your favorite campus eateries and pick up your food when it's ready. No more
                    waiting in lines!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login?role=user">
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                      Order Food
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login?role=shop">
                    <Button size="lg" variant="outline">
                      Shop Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl">
                  <img
                    alt="Students enjoying food"
                    className="object-cover w-full h-full"
                    src="WhatsApp Image 2025-05-19 at 21.18.47_b90ce8ec.jpg/?height=500&width=500"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Preordering your food is simple and convenient
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-bold">Choose a Restaurant</h3>
                <p className="text-gray-500">Browse through various campus eateries and select your favorite</p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-bold">Place Your Order</h3>
                <p className="text-gray-500">Select your items, specify quantity, and set your pickup time</p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-bold">Pick Up & Enjoy</h3>
                <p className="text-gray-500">Skip the line and collect your food when it's ready</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">© 2025 VIT Food. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
