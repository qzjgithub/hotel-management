import { db } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import { SearchRoomDto } from "@/dto/validate/search-room.dto";
import { Prisma } from "@prisma/client";


export async function GET(request: NextRequest) {
  try {
    const room = await db.hotelRoom.findFirst({
      where: { isFeatured: true },
      include: {
        reviews: {
          where: {
            userRating: {gte: 3}
          },
          take: 3
        }
      }
    });
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

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const pageNum = Number(searchParams.get('pageNum')) || 1;
  try {
    const data = await request.json();
    const dto = plainToInstance(SearchRoomDto, data);
    const {type, place, checkinDate, checkoutDate, numberOfBeds, name} = dto;
    const where: Prisma.HotelRoomWhereInput = {};
    const bookingsWhere: Prisma.BookingWhereInput = {OR: []};
    if (type) {
      where.type = type;
    }
    if (place) {
      where.place = {contains: place};
    }
    if (numberOfBeds) {
      where.numberOfBeds = numberOfBeds;
    }
    if (name) {
      where.name = {contains: name};
    }
    if (checkinDate) {
      bookingsWhere.OR?.push(
        {
          checkinDate: {lte: checkinDate},
          checkoutDate: {gte: checkinDate}
        }
      );
    }
    if (checkoutDate) {
      bookingsWhere.OR?.push(
        {
          checkinDate: {lte: checkoutDate},
          checkoutDate: {gte: checkoutDate}
        }
      );
    }
    const total = await db.hotelRoom.count({where});
    const rooms = await db.hotelRoom.findMany({
      where,
      include: {
        bookings: {
          where: bookingsWhere
        }
      },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    });
    return NextResponse.json({
      success: true,
      data: {total, data: rooms}
    });
  } catch(e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message
    });
  }
}