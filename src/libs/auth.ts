import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from 'bcrypt';
import { db } from "@/libs/db";
import { deleteTimer, verifyCode } from './email';

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
        password: { label: "Password", type: "password" },
        code: {label: 'Verification Code', type: 'text', placeholder: "Enter your verification code"}
      },
      async authorize(credentials, req) {
        if (!credentials?.code) {
          throw new Error('Verification Code cannot be empty');
        }
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
        if (credentials.email === process.env.NO_VERIFY_EMAIL) {
          return user;
        }
        const codeFlag = verifyCode(credentials.email, Number(credentials.code));
        if (codeFlag) {
          deleteTimer(credentials.email);
          return user;
        } else {
          throw new Error('Verification Code is incorrect');
        }
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
          return {...token, picture: u.image, id: u.id, isAdmin: u.isAdmin};
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