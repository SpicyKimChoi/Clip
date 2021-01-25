import React from 'react';
import styled from 'styled-components'
import AddClip from "../../atoms/AddClip";

const PublicClip = () => {
    return (
        <PublicClipGrid>
            PublicClip
            <AddClip />
        </PublicClipGrid>
    );
};


const PublicClipGrid = styled.div`
    grid-column: 2 ;
    grid-row: 1;
    border: 1px solid;
    border-color: blue;
`

export default PublicClip;