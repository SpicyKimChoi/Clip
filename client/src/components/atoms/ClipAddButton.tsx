import React from "react";
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
  return (
    <>
      <button onClick={onOpen}>+</button>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div>
          <input type="text" placeholder="Title"></input>
        </div>
        <div>
          <input type="text" placeholder="Url"></input>
        </div>
        <div>
          <input type="text" placeholder="Discription"></input>
        </div>

        <button onClick={onClose}>취소</button>
        <button onClick={() => console.log("클립 생성!")}>생성</button>
      </Modal>
    </>
  );
};

export default ClipAddButton;
