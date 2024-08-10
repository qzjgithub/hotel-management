import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import { plainToInstance } from 'class-transformer';
import { SearchRoomDto } from "@/dto/validate/search-room.dto";
import { Prisma } from "@prisma/client";


export async function GET(request: Request) {
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

export async function POST(request: Request) {
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
    const rooms = await db.hotelRoom.findMany({
      where,
      include: {
        bookings: {
          where: bookingsWhere
        }
      }
    });
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