import React from "react";
import useModal from "../../hooks/useModal";

const ClipAddButton = () => {
  const { isOpen, onOpen, onClose } = useModal();
  return (
    <>
      {isOpen ? <div>MODAL ON</div> : <div>MODAL OFF</div>}
      <button onClick={onOpen}>+</button>
      <button onClick={onClose}>x</button>
    </>
  );
};

export default ClipAddButton;
