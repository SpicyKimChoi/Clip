import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import usePrivateClip from "../../hooks/usePrivateClip";
import { useDrag, useDrop } from "react-dnd";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

type Clipinput = {
  id: string;
  title: string;
  url: string;
  discription: string;
  moveClip: (id: string, to: number) => void;
  findClip: (id: string) => { index: number };
};
type Item = {
  type: string;
  id: string;
  originalIndex: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Clip = ({
  id,
  title,
  url,
  discription,
  moveClip,
  findClip,
}: Clipinput) => {
  const originalIndex = findClip(id).index;
  const ItemTypes = { CLIP: "clip" };
  const { deletePrivateClip, editPrivateClip } = usePrivateClip();
  const [editModal, setEditModal] = useState(false);
  const [switchClip, setSwitchClip] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CLIP, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveClip(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CLIP,
    canDrop: () => false,
    hover({ id: draggedId }: Item) {
      if (draggedId !== id) {
        const { index: overIndex } = findClip(id);
        moveClip(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;

  const {
    titleState,
    urlState,
    discriptionState,
    makeDiscription,
    makeTitle,
    makeUrl,
  } = useInput();
  const editClip = () => {
    const obj = {
      id: Number(id),
      title: titleState,
      url: urlState,
      discription: discriptionState,
    };
    editPrivateClip(obj);
    setEditModal(false);
  };
  const openModal = () => {
    setEditModal(true);
    makeTitle("");
    makeUrl("");
    makeDiscription("");
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "title") {
      makeTitle(value);
    } else if (name === "url") {
      makeUrl(value);
    } else if (name === "discription") {
      makeDiscription(value);
    }
  };
  return (
    <ClipWrapper ref={(node) => drag(drop(node))}>
      <div>{title}</div>

      <button onClick={() => openModal()}>edit</button>
      <button onClick={() => deletePrivateClip(Number(id))}>delete</button>
      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        style={customStyles}
      >
        <div>Edit modal</div>
        <button
          onClick={() => {
            setSwitchClip(!switchClip);
          }}
        >
          스위치
        </button>
        {switchClip ? (
          <div>
            <div>
              <input
                placeholder="Memo"
                name="discription"
                onChange={onChange}
              ></input>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input
                name="title"
                placeholder="Title"
                onChange={onChange}
              ></input>
            </div>
            <div>
              <input name="url" placeholder="Url" onChange={onChange}></input>
            </div>
            <div>
              <input
                placeholder="Discription"
                name="discription"
                onChange={onChange}
              ></input>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setEditModal(false);
          }}
        >
          취소
        </button>
        <button onClick={() => editClip()}>생성</button>
      </Modal>
    </ClipWrapper>
  );
};

const ClipWrapper = styled.div`
  border: 1px solid;
  border-color: aqua;
`;

export default Clip;
