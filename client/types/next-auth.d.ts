// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      role?: string;
      reg_no?: string;
      shop_no?: string;
      gst_in?: string;
    };
  }

  interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    reg_no?: string;
    shop_no?: string;
    gst_in?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    reg_no?: string;
    shop_no?: string;
    gst_in?: string;
  }
}
