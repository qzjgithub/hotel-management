'use client'

import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react"
import { SearchController, SearchParamType } from './SearchController';
import SightsCard from '@/components/SIghtsCard/SightsCard';
import { Sights } from '@/models/sights';
import { Pagination } from '@/components/Pagination/pagination';

const RoomMainPage = () => {
  const [sights, setSights] = useState([]);
  const [total, setTotal] = useState(0);
  const [controlParam, setControlParam] = useState<SearchParamType>({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  const fetchSightsData = useCallback(async (params: SearchParamType = controlParam, pagination: any = {pageSize, pageNum}) => {
    const url = `/api/places?pageSize=${pagination.pageSize}&pageNum=${pagination.pageNum}`;
    const { data: {data} } = await axios.post(url, params);
    setTotal(data.total);
    setSights(data.data);
  }, []);

  useEffect(() => {
    fetchSightsData({});
  }, []);

  return (
    <div className="container mx-auto">
      <SearchController
        onSearch={(cp: SearchParamType) => {
          setControlParam(cp);
          setPageNum(1);
          fetchSightsData(cp, {pageSize, pageNum: 1});
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
            fetchSightsData(undefined, {pageSize: s, pageNum: 1});
          }
          if (n !== pageNum) {
            setPageNum(n);
            fetchSightsData(undefined, {pageSize: s, pageNum: n});
          }
        }}
      />
      <div className='flex mt-20 justify-between flex-wrap'>
        {sights.map((sight: Sights) => (
          <SightsCard key={sight.id} sight={sight} />
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
            fetchSightsData(undefined, {pageSize: s, pageNum: 1});
          }
          if (n !== pageNum) {
            setPageNum(n);
            fetchSightsData(undefined, {pageSize: s, pageNum: n});
          }
        }}
      />
    </div>
  )
}

export default RoomMainPage;