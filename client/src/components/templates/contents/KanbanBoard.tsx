import axios from 'axios';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import CreateKanban from '../../atoms/CreateKanban'

const KanbanBoard = () => {
    const onDragStart = () => { }
    const onDragEnd = () => { }
    return (
        <KanbanBoardGrid>
            KanbanBoard
            <DragDropContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <div>Hello world</div>
                <CreateKanban />
            </DragDropContext>
        </KanbanBoardGrid>
    )
};


const KanbanBoardGrid = styled.section`
    width: 70%;
    border: 1px solid;
    border-color: pink;
    
`

export default KanbanBoard;
