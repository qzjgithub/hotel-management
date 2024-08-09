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
    jwt: async ({token, user}) => {
      if (token.email) {
        const u = await db.user.findFirst({
          where: {email: token.email},
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            about: true,
            isAdmin: true
          }
        });
        if (u) {
          return {...token, picture: u.image, isAdmin: u.isAdmin};
        }
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token.email) {
        return {...session, user: {...session.user, ...token}};
      }
      return {...session, user: {}};
    },
    async signIn() {
      return true;
    }
  },
}