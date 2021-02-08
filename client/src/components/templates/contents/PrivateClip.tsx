import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Clip from "../../../components/atoms/Clip";
import ClipAddButton from "../../../components/atoms/ClipAddButton";
import usePrivateClip from "../../../hooks/usePrivateClip";
import { Input } from "../../../modules/PrivateClip";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

const PrivateClip = () => {
  const { privateClipArr, changePrivateClip } = usePrivateClip();
  const findCard = (id: string) => {
    const clip = privateClipArr.filter((c) => `${c.id}` === id)[0];
    return {
      clip,
      index: privateClipArr.indexOf(clip),
    };
  };
  const moveClip = (id: string, atIndex: number) => {
    const { clip, index } = findCard(id);
    changePrivateClip(
      update(privateClipArr, {
        $splice: [
          [index, 1],
          [atIndex, 0, clip],
        ],
      }),
    );
  };
  const ItemTypes = { CLIP: "clip" };
  const [, drop] = useDrop({ accept: ItemTypes.CLIP });

  return (
    <PrivateClipGrid ref={drop}>
      <ClipAddButton />
      {privateClipArr.map((clip: Input, idx: number) => {
        return (
          <Clip
            key={idx}
            title={clip.title}
            id={`${clip.id}`}
            url={clip.url}
            discription={clip.discription}
            moveClip={moveClip}
            findClip={findCard}
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
