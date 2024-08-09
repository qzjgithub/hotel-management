import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const param = await request.json();
    const rooms = await db.hotelRoom.findMany({where: param});
    return NextResponse.json({
      success: true,
      data: rooms
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}