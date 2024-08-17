'use client'

import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react"
import { SearchController, SearchParamType } from './SearchController';
import SightsCard from '@/components/SIghtsCard/SightsCard';
import { Sights } from '@/models/sights';

const RoomMainPage = () => {
  const [sights, setSights] = useState([]);

  const fetchSightsData = useCallback(async (params: SearchParamType) => {
    const { data } = await axios.post('/api/places', params);
    setSights(data.data);
  }, []);

  useEffect(() => {
    fetchSightsData({});
  }, []);

  return (
    <div className="container mx-auto">
      <SearchController
        onSearch={fetchSightsData}
      />
      <div className='flex mt-20 justify-between flex-wrap'>
        {sights.map((sight: Sights) => (
          <SightsCard key={sight.id} sight={sight} />
        ))}
      </div>
    </div>
  )
}

export default RoomMainPage;