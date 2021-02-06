import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components'


const KanbanBoard = () => {
    return (
        <KanbanBoardGrid>
            KanbanBoard
        </KanbanBoardGrid>
    )
};


const KanbanBoardGrid = styled.section`
    width: 70%;
    border: 1px solid;
    border-color: pink;
    
`

export default KanbanBoard;
