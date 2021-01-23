import React from 'react';
import styled from 'styled-components'


const KanbanBoard = () => {
    return (
        <KanbanBoardGrid>
            KanbanBoard
        </KanbanBoardGrid>
    );
};


const KanbanBoardGrid = styled.div`
    grid-column: 2;
    grid-row: 2/3;
    border: 1px solid;
    border-color: pink;
`

export default KanbanBoard;