'use client'

import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import { SearchController, SearchParamType } from './SearchController';
import RoomCard from '@/components/RoomCard/RoomCard';
import { Room } from '@/models/room';

const RoomMainPage = () => {
  const queryParams = useSearchParams();
  const place = queryParams.get('place');
  const checkinDate = queryParams.get('checkinDate');

  const [rooms, setRooms] = useState([]);

  const fetchRoomsData = useCallback(async (params: SearchParamType) => {
    const { data } = await axios.post('/api/rooms', params);
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
        onSearch={fetchRoomsData}
      />
      <div className='text-center m-4'>
        {rooms.map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}

export default RoomMainPage;