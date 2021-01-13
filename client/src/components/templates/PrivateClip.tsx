import React from 'react';
import styled from 'styled-components'


const PrivateClip = () => {
    return (
        <PrivateClipGrid>
            PrivateClip
        </PrivateClipGrid>
    );
};


const PrivateClipGrid = styled.div`
    grid-column: 1;
    grid-row: 1;
    border: 1px solid;
    border-color: red;
`

export default PrivateClip;