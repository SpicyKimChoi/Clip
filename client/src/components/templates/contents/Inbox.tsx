import React, { useState } from 'react';
import styled from "styled-components"
import axios from 'axios';


const Inbox = () => {
    return (
        <InboxGrid>
            inbox
        </InboxGrid>
    )
};


const InboxGrid = styled.section`
    width: 30%;
    border: 1px solid;
    border-color: green;
`

export default Inbox;