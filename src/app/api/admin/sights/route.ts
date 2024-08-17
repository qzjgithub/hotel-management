import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const sightsMock = readFileSync(join(process.env.ROOT_URL as string, '/mock/sights.json'), {encoding: 'utf8'});
    const sights = JSON.parse(sightsMock);
    for (const sight of sights) {
      try {
        await db.sights.create({data: sight});
      } catch(e) {
        console.log(`${sight.slug} is repeated`);
        console.log(e);
      }
    }
    return NextResponse.json({
      success: true,
      data: 'end'
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}