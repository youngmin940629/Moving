import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Select } from "antd";
import axios from 'axios';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchInput = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (value) => {
    if (value) {
      axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/search/${value}`)
      .then(res => {
        console.log(res)
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
    <Option key={movie.id}>
      <Link href={`/movie/${movie.id}`}>
        {movie.title}
      </Link>
    </Option>
  );

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      onSearch={handleSearch}
      placeholder="영화 검색"
      style={{ width: 200 }}
      suffixIcon={<SearchOutlined />}
    >
      {options}
    </Select>
  )

};

export default SearchInput;
