import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  session: { strategy: 'jwt' }
})
