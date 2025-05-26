import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import db from "../../../lib/db"
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await db.query("SELECT * FROM users1 WHERE email=$1", [email]);
        const user = result.rows[0];

        if (!user){
          console.log("No such user found");
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.first_name + " " + user.last_name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // your custom login page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
