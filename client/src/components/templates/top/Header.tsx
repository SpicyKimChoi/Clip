import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import LoginGoogle from "../../atoms/LoginGoogle";
import LogoutButton from "../../atoms/LogoutButton";
const Header = () => {
  const [data, setData] = useState([]);
  const fetchMoreData = () => {
    setTimeout(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
        // console.log("res.data:", res.data);
        //updating data
        setData(res.data.slice(0, 5));
      });
    }, 1000); // 시간 차 주지 않으면 스크롤 계속 내려감!
  };
  return (
    <div>
      <div>demo: 인피니티스크롤</div>
      <hr />
      <LoginGoogle />
      <LogoutButton />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<div>Loading...</div>}
      >
        {data.map((i, idx) => {
          return <div key={idx}>div-#{idx}</div>;
        })}
      </InfiniteScroll>
    </div>
  );
};
export default Header;
