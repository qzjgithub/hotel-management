import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcrypt from 'bcrypt';

declare global {
  var prisma: PrismaClient | undefined;
  var CODE_MAP: Map<string, number>;
  var CODE_TIMER_MAP: Map<string, NodeJS.Timeout>;
}

export const db = globalThis.prisma || new PrismaClient();
export const CODE_MAP = globalThis.CODE_MAP || new Map();
export const CODE_TIMER_MAP = globalThis.CODE_TIMER_MAP || new Map();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
  globalThis.CODE_MAP = CODE_MAP;
  globalThis.CODE_TIMER_MAP = CODE_TIMER_MAP;
};
