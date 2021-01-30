import React, { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");
type Clip = {
  title: string;
  url: string;
  discription: string;
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
const ClipAddButton = () => {
  const data: Clip[] = [];
  const { isOpen, onOpen, onClose } = useModal();
  const [inputs, setInputs] = useState({
    title: "",
    url: "",
    discription: "",
  });
  const [clipData, setClipData] = useState<Clip[]>([]);
  const { title, url, discription } = inputs;

  const onClick = () => {
    console.log("클립 생성!", inputs);

    let temp = clipData.slice();
    temp.push(inputs);
    setClipData(temp);
    console.log(data, "data check");

    onClose();
    onReset();
    return data;
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    console.log(nextInputs);
    setInputs(nextInputs);
  };
  const onReset = () => {
    const resetInputs = {
      title: "",
      url: "",
      discription: "",
    };
    setInputs(resetInputs);
  };
  return (
    <>
      <button onClick={onOpen}>+</button>
      {clipData.length === 0 ? (
        <div></div>
      ) : (
        clipData.map((clip: Clip, idx: number) => {
          console.log(clip, "clip");
          return (
            <Clip key={idx}>
              <div>{clip.title}</div>
              <a href={clip.url} target="_blank">
                링크
              </a>
              <div>{clip.discription}</div>
              <button>삭제</button>
              <button>수정</button>
            </Clip>
          );
        })
      )}

      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div>
          <input
            name="title"
            placeholder="Title"
            onChange={onChange}
            value={title}
          ></input>
        </div>
        <div>
          <input
            name="url"
            placeholder="Url"
            onChange={onChange}
            value={url}
          ></input>
        </div>
        <div>
          <input
            placeholder="Discription"
            name="discription"
            onChange={onChange}
            value={discription}
          ></input>
        </div>
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
