import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "react-modal";
Modal.setAppElement("#root");
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
  const [inputs, setInputs] = useState({
    title: "",
    url: "",
    discription: "",
  });
  const [clipState, setClipState] = useState(false);
  const { title, url, discription } = inputs;

  const onClick = () => {
    console.log("클립 생성!", inputs, clipState);
    onClose();
    setClipState(true);
    onReset();
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
      {clipState ? (
        <div>
          <div>{inputs.title}</div>
          <div>{inputs.url}</div>
          <div>{inputs.discription}</div>
        </div>
      ) : (
        <div></div>
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
export default ClipAddButton;
