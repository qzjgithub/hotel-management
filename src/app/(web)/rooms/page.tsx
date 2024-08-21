'use client'

import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import { SearchController, SearchParamType } from './SearchController';
import RoomCard from '@/components/RoomCard/RoomCard';
import { Room } from '@/models/room';
import { Pagination } from '@/components/Pagination/pagination';

const RoomMainPage = () => {
  const queryParams = useSearchParams();
  const place = queryParams.get('place');
  const checkinDate = queryParams.get('checkinDate');

  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [controlParam, setControlParam] = useState<SearchParamType>({place, checkinDate: checkinDate ? (new Date(checkinDate)) : null});
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  const fetchRoomsData = useCallback(async (params: SearchParamType = controlParam, pagination: any = {pageSize, pageNum}) => {
    const url = `/api/rooms?pageSize=${pagination.pageSize}&pageNum=${pagination.pageNum}`;
    const { data: {data} } = await axios.post(url, params);
    setTotal(data.total);
    setRooms(data.data);
  }, []);

  useEffect(() => {
    fetchRoomsData({place, checkinDate: checkinDate ? (new Date(checkinDate)) : null});
  }, []);

  return (
    <div className="container mx-auto">
      <SearchController
        place={place}
        checkinDate={checkinDate ? (new Date(checkinDate)) : null}
        onSearch={(cp: SearchParamType) => {
          setControlParam(cp);
          setPageNum(1);
          fetchRoomsData(cp, {pageSize, pageNum: 1});
        }}
      />
      <Pagination
        total={total}
        pageSize={pageSize}
        pageNum={pageNum}
        onChange={(n: number, s: number) => {
          if (s !== pageSize) {
            setPageSize(s);
            setPageNum(1);
            fetchRoomsData(undefined, {pageSize: s, pageNum: 1});
          }
          if (n !== pageNum) {
            setPageNum(n);
            fetchRoomsData(undefined, {pageSize: s, pageNum: n});
          }
        }}
      />
      <div className='flex mt-20 justify-between flex-wrap'>
        {rooms.map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      <Pagination
        total={total}
        pageSize={pageSize}
        pageNum={pageNum}
        onChange={(n: number, s: number) => {
          if (s !== pageSize) {
            setPageSize(s);
            setPageNum(1);
            fetchRoomsData(undefined, {pageSize: s, pageNum: 1});
          }
          if (n !== pageNum) {
            setPageNum(n);
            fetchRoomsData(undefined, {pageSize: s, pageNum: n});
          }
        }}
      />
    </div>
  )
}

export default RoomMainPage;