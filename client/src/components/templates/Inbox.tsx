import React from 'react';
import styled from 'styled-components'


const Inbox = () => {
    return (
        <InboxGrid>
            Inbox
        </InboxGrid>
    );
};


const InboxGrid = styled.div`
    grid-column: 1;
    grid-row: 2/3;
    border: 1px solid;
    border-color: green;
`

export default Inbox;