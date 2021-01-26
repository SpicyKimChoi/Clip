import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import LoginGoogle from "../../atoms/LoginGoogle";
import axios from 'axios'
import { setgid } from 'process';

const Header = () => {
    const [addData, setAddData] = useState(8);
    const [prevData, setPrevData] = useState(0);
    const [data, setData] = useState(addData); // 4 or 8
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([] as any);

    const fetchMoreData = () => {
        setTimeout(() => {
            axios.get(`https://koreanjson.com/todos`)
                .then((res) => {
                    // console.log("res.data:", res.data);
                    let fourData = res.data.slice(prevData, data);
                    //updating data
                    setItems([...items, ...fourData]);
                    setPrevData(prevData + addData);
                    setData(data + addData);
                })
        }, 1000); // 시간 차 주지 않으면 스크롤 계속 내려감!
    }
    return (
        <div>
            <p>여기서 시작</p>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                {items && items.map((data: any, i: any) => {
                    { console.log(data) }
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Header;
