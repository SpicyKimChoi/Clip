import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "react-modal";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import usePrivateClip from "../../hooks/usePrivateClip";

Modal.setAppElement("#root");

interface Input {
  id: number;
  title: string;
  url: string;
  discription: string;
}

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
const ClipAddButton = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { privateClipArr, addPrivateClip } = usePrivateClip();
  const {
    titleState,
    urlState,
    discriptionState,
    makeTitle,
    makeUrl,
    makeDiscription,
  } = useInput();
  const [switchClip, setSwitchClip] = useState(false);

  const onClick = () => {
    const obj = {
      id: 1,
      title: titleState,
      url: urlState,
      discription: discriptionState,
    };
    addPrivateClip(obj);
    onClose();
  };
  const openModal = () => {
    onOpen();
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
    <>
      <button onClick={openModal}>+</button>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
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

        <button onClick={onClose}>취소</button>
        <button onClick={onClick}>생성</button>
      </Modal>
    </>
  );
};
const Clip = styled.div`
  border: 1px solid;
  border-color: green;
`;
export default ClipAddButton;
