"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtensilsCrossed } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "user"

  const [isLoading, setIsLoading] = useState(false)
  const[email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleLogin = async(role: string) => {
    setIsLoading(true);
    const callBackUrl=role==="user"?"/user/shops":"/shop/dashboard";

    const res = await signIn("credentials",{
      email,
      password,
      redirect:true,
     callbackUrl:callBackUrl
    })
    // Simulate login process
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 text-2xl font-bold">
        <UtensilsCrossed className="h-8 w-8 text-orange-500" />
        <span>V-EATS</span>
      </Link>

      <Tabs defaultValue={defaultRole} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">Student</TabsTrigger>
          <TabsTrigger value="shop">Shop Owner</TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="your.email@vitstudent.ac.in" type="email"  onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}}/>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-orange-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => handleLogin("user")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup?role=user" className="text-orange-500 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shop">
          <Card>
            <CardHeader>
              <CardTitle>Shop Owner Login</CardTitle>
              <CardDescription>Enter your credentials to manage your shop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shop-email">Email</Label>
                <Input id="shop-email" placeholder="your.shop@vit.ac.in" type="email" onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shop-password">Password</Label>
                  <Link href="#" className="text-xs text-orange-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="shop-password" type="password" onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => handleLogin("shop")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                Need shop registration?{" "}
                <Link href="/signup?role=shop" className="text-orange-500 hover:underline">
                  Contact admin
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
