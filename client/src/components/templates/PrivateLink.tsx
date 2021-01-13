import React from 'react';
import styled from 'styled-components'


const PrivateLink = () => {
    return (
        <PrivateLinkGrid>
            PrivateLink
        </PrivateLinkGrid>
    );
};


const PrivateLinkGrid = styled.div`
    grid-column: 1;
    grid-row: 1;
    border: 1px solid;
    border-color: red;
`

export default PrivateLink;