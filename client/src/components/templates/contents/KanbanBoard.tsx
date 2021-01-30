import axios from 'axios';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components'


const KanbanBoard = () => {
    const [addData, setAddData] = useState(2);
    const [prevData, setPrevData] = useState(0);
    const [data, setData] = useState(addData); // 2 or 4
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([] as any);

    const fetchMoreData = () => {
        setTimeout(() => {
            axios.get(`https://koreanjson.com/todos`)
                .then((res) => {
                    let fourData = res.data.slice(prevData, data);
                    setItems([...items, ...fourData]);
                    setPrevData(prevData + addData);
                    setData(data + addData);
                })
        }, 1000);
    }
    return (
        <KanbanBoardGrid style={{ overflow: "scroll" }} id="scrollHeader">
            {/* 이 공간이 채워져야 스크롤이 생깁니다. */}
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollHeader"
            >
                {items && items.map((data: object | any, i: number) => {
                    let title = data.title;
                    return (
                        <div key={i}>
                            {title}
                        </div>
                    )
                })}
            </InfiniteScroll>
        </KanbanBoardGrid>
    );
};


const KanbanBoardGrid = styled.section`
    grid-column: 2;
    grid-row: 2/3;
    border: 1px solid;
    border-color: pink;
    
`

export default KanbanBoard;
