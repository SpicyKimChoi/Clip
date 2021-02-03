import React from "react";
import styled from "styled-components";
import Clip from "../../../components/atoms/Clip";
import ClipAddButton from "../../../components/atoms/ClipAddButton";
import usePrivateClip from "../../../hooks/usePrivateClip";
import { Input } from "../../../modules/PrivateClip";

const PrivateClip = () => {
  const { privateClipArr } = usePrivateClip();
  return (
    <PrivateClipGrid style={{ overflow: "scroll" }}>
      <ClipAddButton />
      {privateClipArr.map((clip: Input, idx: number) => {
        return (
          <Clip
            key={idx}
            title={clip.title}
            id={clip.id}
            url={clip.url}
            discription={clip.discription}
          />
        );
      })}
    </PrivateClipGrid>
  );
};

const PrivateClipGrid = styled.section`
  grid-column: 1;
  grid-row: 1;
  border: 1px solid;
  border-color: red;
`;

export default PrivateClip;
