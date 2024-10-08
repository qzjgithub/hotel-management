import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const room = await db.hotelRoom.findFirst({where: { slug }});
    return NextResponse.json({
      success: true,
      data: room
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}