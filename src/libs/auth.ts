import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from 'bcrypt';
import { db } from "@/libs/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        name: { label: "Name", type: "text", placeholder: "enter your name" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.name || !credentials?.password) {
          return null;
        }
        const user = await db.user.findFirst({where: {name: credentials?.name}});
        if (!user) {
          return null;
        }
        const validPassword = await bcrypt.compare(credentials?.password, user.password);
        if (!validPassword) {
          return null;
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
    session: async ({ session, token }: { session: Session; token: JWT })
    : Promise<Session> => {
      if (token.name) {
        const user = await db.user.findFirst({where: {name: token.name}});
        if (user) {
          const {password, ...rest} = user;
          return {...session, user: {...session.user, ...rest}};
        }
      }
      return {...session, user: {}};
    },
    async signIn({ user, credentials }) {
      return true;
    }
  },
}