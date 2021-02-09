import React, { useState } from 'react';
import styled from "styled-components"
import { Note, Tape, NoteList } from "../../../style/StickyNote";
import axios from 'axios';


const Inbox = () => {
    return (
        <InboxGrid>
            <Note>
                <Tape></Tape>
                <NoteList>
                    <li>Test StickyNote </li>
                    <li>포스트잇 테스트</li>
                </NoteList>
            </Note>
        </InboxGrid>
    )
};

const InboxGrid = styled.section`
    width: 30%;
    border: 1px solid;
    border-color: green;
`

export default Inbox;