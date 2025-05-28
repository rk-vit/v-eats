import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest){
    const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET})
    if(!token) return NextResponse.redirect(new URL("/login",req.url));
    const path = req.nextUrl.pathname;
    console.log("check");
    console.log(token.role);
    if(path.startsWith("/shop") && token.role !=="shop"){
        console.log("Shop");
        return NextResponse.redirect(new URL("/user/shops", req.url)); // Optional: redirect to unauthorized
    }
    if(path.startsWith("/user") && token.role !=="user"){
        console.log("user");
        return NextResponse.redirect(new URL("/shop/dashboard", req.url)); // Optional: redirect to unauthorized
    }
    return NextResponse.next()
}

export const config = {
  matcher: ["/user/:path*", "/shop/:path*"],
}
