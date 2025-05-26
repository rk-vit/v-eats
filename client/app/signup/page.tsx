"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UtensilsCrossed } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "user"

  const [isLoading, setIsLoading] = useState(false)
  const[first_name,setFname] = useState("");
  const[last_name,setLname] = useState("");
  const[email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const[reg_no,setRegNo] = useState("");
  const handleSignup = async() => {
    setIsLoading(true)
    try{
      const res = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          first_name,
          last_name,
          email,
          reg_no,
          password,
          role
        })
      })
      const data = await res.json();
      if(res.ok){
        router.push("/login?role=" + role)
      }else{
        alert(data.message || "Signup failed");

      }
    }catch(err){
      console.log("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }finally{
      setIsLoading(false)

    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 text-2xl font-bold">
        <UtensilsCrossed className="h-8 w-8 text-orange-500" />
        <span>V-EATS</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            {role === "user"
              ? "Sign up to start ordering food from campus eateries"
              : "Contact admin for shop registration"}
          </CardDescription>
        </CardHeader>

        {role === "user" ? (
          <>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" onChange={(e)=>{e.preventDefault(); setFname(e.target.value)}} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" onChange={(e)=>{e.preventDefault(); setLname(e.target.value)}}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="your.email@vitstudent.ac.in" type="email" onChange={(e)=>{e.preventDefault(); setEmail(e.target.value)}} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-number">Registration Number</Label>
                <Input id="reg-number" placeholder="e.g. 21BCE1234" onChange={(e)=>{e.preventDefault(); setRegNo(e.target.value)}} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e)=>{e.preventDefault(); setPassword(e.target.value)}}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleSignup} disabled={isLoading}>
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
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login?role=user" className="text-orange-500 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-gray-700">
                  Shop registration requires approval from the campus administration. Please contact the food services
                  department to register your shop.
                </p>
                <p className="mt-2 text-sm font-medium">
                  Contact:{" "}
                  <a href="mailto:food.services@vit.ac.in" className="text-orange-600 hover:underline">
                    food.services@vit.ac.in
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button variant="outline" className="w-full" onClick={() => router.push("/login?role=shop")}>
                Back to Login
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
