import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import { Select } from "antd";
import axios from 'axios';
import Link from 'next/link';
import { ConsoleSqlOutlined, SearchOutlined } from '@ant-design/icons';
import router from 'next/router';

const { Option } = Select;



const SearchInput = () => {

  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (value) => {
    if (value) {
      axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/search/${value}`)
      .then(res => {
        setSearchResult(res.data)
      })
      .catch(err => {
        console.log(err)
      });
    } else {
      setSearchResult([]);
    }
  };

  const options = searchResult.map(movie => 
    <Option key={movie.id} value={movie.id}>
      {movie.title}
    </Option>
  );

  return (
    <Select
      showSearch
      filterOption={false}
      notFoundContent={null}
      onSearch={handleSearch}
      onChange={(value) => {router.push(`/movie/${value}`)}}
      placeholder="영화 검색"
      style={{ width: 200 }}
      suffixIcon={<SearchOutlined style={{ color:'grey', cursor:'default'}}/>}
    >
      {options}
    </Select>
  )

};

export default SearchInput;
