import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const roomMock = readFileSync(join(process.env.ROOT_URL as string, '/mock/room.json'), {encoding: 'utf8'});
    const rooms = JSON.parse(roomMock);
    for (const room of rooms) {
      try {
        await db.hotelRoom.create({data: room});
      } catch(e) {
        console.log(`${room.slug} is repeated`);
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