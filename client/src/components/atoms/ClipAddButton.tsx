import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";
import useAddModal from "../../hooks/useAddModal";

const ClipAddButton = () => {
  const { onOpen } = useModal();
  const { makeTitle, makeUrl, makeDiscription } = useInput();
  const { makePrivate } = useAddModal();
  const openModal = () => {
    onOpen();
    makePrivate();
    makeTitle("");
    makeUrl("");
    makeDiscription("");
  };

  return (
    <button className="private" onClick={() => openModal()}>
      +
    </button>
  );
};

export default ClipAddButton;
