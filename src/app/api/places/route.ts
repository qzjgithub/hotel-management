import { db } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import { Prisma } from "@prisma/client";
import { SearchSightsDto } from "@/dto/validate/search-sights.dto";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const pageNum = Number(searchParams.get('pageNum')) || 1;
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
    const total = await db.sights.count({where});
    const sights = await db.sights.findMany({
      where,
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    });
    return NextResponse.json({
      success: true,
      data: {total, data: sights}
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}