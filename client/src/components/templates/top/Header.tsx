import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import LoginGoogle from "../../atoms/LoginGoogle";
import LogoutButton from "../../atoms/LogoutButton";
const Header = () => {
  const [addData, setAddData] = useState(2);
  const [prevData, setPrevData] = useState(0);
  const [data, setData] = useState(addData); // 2 or 4
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([] as any);

  const fetchMoreData = () => {
    setTimeout(() => {
      axios.get(`https://koreanjson.com/todos`).then((res) => {
        // console.log("res.data:", res.data);
        let fourData = res.data.slice(prevData, data);
        //updating data
        setItems([...items, ...fourData]);
        setPrevData(prevData + addData);
        setData(data + addData);
      });
    }, 1000); // 시간 차 주지 않으면 스크롤 계속 내려감!
  };
  return (
    <header style={{ overflow: "scroll" }} id="scrollHeader">
      <p>여기서 시작</p>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollHeader"
      >
        {items &&
          items.map((data: object | any, i: number) => {
            let title = data.title;
            return <div key={i}>{title}</div>;
          })}
      </InfiniteScroll>
    </header>
  );
};

export default Header;
