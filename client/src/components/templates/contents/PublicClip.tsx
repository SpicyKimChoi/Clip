import React, { useCallback, useState } from "react";
import styled from "styled-components";
import P_Clip from "../../../components/atoms/P_Clip";
import PublicClipAddButton from "../../../components/atoms/PublicClipAddButton";
import usePublicClip from "../../../hooks/usePublicClip";
import { Input } from "../../../modules/PublicClip";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

const PublicClip = () => {
  const { publicClipArr, changePublicClip } = usePublicClip();
  const findCard = (id: string) => {
    const clip = publicClipArr.filter((c) => `${c.id}` === id)[0];
    return {
      clip,
      index: publicClipArr.indexOf(clip),
    };
  };
  const moveClip = (id: string, atIndex: number) => {
    const { clip, index } = findCard(id);
    changePublicClip(
      update(publicClipArr, {
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
    <PublicClipGrid ref={drop}>
      <PublicClipAddButton />
      {publicClipArr.map((clip: Input, idx: number) => {
        return (
          <P_Clip
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
    </PublicClipGrid>
  );
};

const PublicClipGrid = styled.section`
  border: 1px solid;
  border-color: blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default PublicClip;
