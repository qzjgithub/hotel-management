'use client'

import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import { SearchController, SearchParamType } from './SearchController';

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
        酒店列表页面
      </div>
    </div>
  )
}

export default RoomMainPage;