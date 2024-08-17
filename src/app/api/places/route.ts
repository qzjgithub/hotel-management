import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import { Prisma } from "@prisma/client";
import { SearchSightsDto } from "@/dto/validate/search-sights.dto";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dto = plainToInstance(SearchSightsDto, data);
    const {place, minDuration, maxDuration, name} = dto;
    const where: Prisma.SightsWhereInput = {};
    if (place) {
      where.place = {contains: place};
    }
    if (minDuration || maxDuration) {
      where.duration = {gte: minDuration ?? 1, lte: maxDuration ?? 8};
    }
    if (name) {
      where.name = {contains: name};
    }
    const sights = await db.sights.findMany({
      where
    });
    return NextResponse.json({
      success: true,
      data: sights
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}