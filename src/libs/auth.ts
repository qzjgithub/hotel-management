import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from 'bcrypt';
import { db } from "@/libs/db";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email or password cannot be empty');
        }
        const user = await db.user.findFirst({where: {email: credentials?.email}});
        if (!user) {
          throw new Error('Email or password is incorrect');
        }
        const validPassword = await bcrypt.compare(credentials?.password, user.password);
        if (!validPassword) {
          throw new Error('Email or password is incorrect');
        }
        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
      strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token.name) {
        const user = await db.user.findFirst({
          where: {name: token.name},
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            about: true,
            isAdmin: true
          }
        });
        if (user) {
          return {...session, user: {...session.user, ...user}};
        }
      }
      return {...session, user: {}};
    },
    async signIn() {
      // console.log(user, credentials);
      return true;
    }
  },
}