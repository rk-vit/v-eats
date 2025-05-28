import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import db from "../../../lib/db";
import bcrypt from "bcryptjs";

type AppUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  reg_no?: string;
  shop_no?: string;
  gst_in?: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: string;
        };

        console.log("The user role is: " + role);

        let result;
        if (role === "user") {
          result = await db.query("SELECT * FROM users1 WHERE email=$1 AND role=$2", [email, role]);
        } else if (role === "shop") {
          result = await db.query("SELECT * FROM shop WHERE email=$1 AND role=$2", [email, role]);
        } else {
          console.log("Unknown role");
          return null;
        }

        const account = result.rows[0];

        if (!account) {
          console.log("No such account found");
          return null;
        }

        const isValid = await bcrypt.compare(password, account.password);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        const user: AppUser = {
          id: role === "user" ? account.id : account.shop_id,
          email: account.email,
          name: role === "user" ? `${account.first_name} ${account.last_name}` : account.shop_name,
          role: account.role,
        };

        if (role === "user") {
          user.reg_no = account.reg_no;
        } else if (role === "shop") {
          user.shop_no = account.shop_no;
          user.gst_in = account.gst_in;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.reg_no = user.reg_no;
        token.shop_no = user.shop_no;
        token.gst_in = user.gst_in;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.reg_no = token.reg_no as string;
        session.user.shop_no = token.shop_no as string;
        session.user.gst_in = token.gst_in as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
