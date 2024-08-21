'use client'

import React, { useEffect, useMemo, useState } from "react"
import { FaAlignLeft, FaAlignRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Dropdown } from "../Dropdown/Dropdown";

type PaginationProps = {
  total: number;
  pageSize?: number;
  pageNum?: number;
  onChange?: Function;
}

export const Pagination = (props: PaginationProps) => {
  const {total} = props;
  const [pageSize, setPageSize] = useState(props.pageSize ?? 10);
  const [pageNum, setPageNum] = useState(props.pageNum ?? 1);

  useEffect(() => {
    if (!props.pageSize) { return; }
    setPageSize(props.pageSize);
  }, [props.pageSize]);

  useEffect(() => {
    if (!props.pageNum) { return; }
    setPageNum(props.pageNum);
  }, [props.pageNum]);

  useEffect(() => {
    const maxNum = Math.ceil((total || 0) / pageSize);
    if (maxNum && maxNum < pageNum) {
      setPageNum(maxNum);
    }
  }, [total]);

  const pageSizeOptions = useMemo(() => {
    const options = [
      {value: 6, label: '6 per page'},
      {value: 10, label: '10 per page'},
      {value: 15, label: '15 per page'}
    ];
    if (![6, 10, 15].includes(pageSize)) {
      options.unshift({value: pageSize, label: pageSize.toString() + ' per page'});
    }
    return options;
  }, [pageSize]);

  useEffect(() => {
    props.onChange && props.onChange(pageNum, pageSize, total);
  }, [pageNum, pageSize]);

  const maxPage = Math.ceil((total || 0) / pageSize);
  return (
    <div className="flex justify-center mt-3 items-center">
      <Dropdown
        className='bg-white text-center py-1 px-3 rounded-lg mr-3'
        selected={pageSize}
        options={pageSizeOptions}
        onChange={(v: string) => setPageSize(Number(v))}
      />
      <button
        className="text-[1.5rem] m-2"
        disabled={pageNum <= 1}
        onClick={() => setPageNum(Math.max(pageNum - 1, 1))}
      >
        <FaAngleLeft />
      </button>
      <input
        className='bg-white text-center py-1 px-3 rounded-lg'
        type="number"
        min={1}
        max={maxPage || 1}
        step={1}
        value={pageNum}
        onChange={(e) => setPageNum(Number(e.target.value))}
      />
      <button
        className="text-[1.5rem] m-2"
        disabled={pageNum >= maxPage}
        onClick={() => setPageNum(Math.min(pageNum + 1, maxPage))}
      >
        <FaAngleRight />
      </button>
      <p>Total {total}</p>
    </div>
  );
}