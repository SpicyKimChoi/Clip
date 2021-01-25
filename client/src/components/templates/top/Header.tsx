import React, { useState } from 'react';
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import LoginGoogle from "../../atoms/LoginGoogle";
import axios from 'axios'

const Header = () => {
    const [data, setData] = useState([]);
    const fetchMoreData = () => {
        setTimeout(() => {
            axios.get(`https://jsonplaceholder.typicode.com/posts`)
                .then((res) => {
                    // console.log("res.data:", res.data);
                    //updating data
                    setData(res.data.slice(0, 5))
                })
        }, 1000); // 시간 차 주지 않으면 스크롤 계속 내려감!
    }
    return (
        <div>
            <div>demo: 인피니티스크롤</div>
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<div>Loading...</div>}
            >
                {data.map((i, idx) => {
                    <div key={idx}>div-#{idx}</div>
                })}
            </InfiniteScroll>
            <LoginGoogle />
        </div>
    );

};

export default Header;
