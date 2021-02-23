import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";
import useAddModal from "../../hooks/useAddModal";

const PublicClipAddButton = () => {
  const { onOpen } = useModal();
  const { makeTitle, makeUrl, makeDiscription } = useInput();
  const { makePublic } = useAddModal();
  const openModal = () => {
    onOpen();
    makePublic();
    makeTitle("");
    makeUrl("");
    makeDiscription("");
  };

  return (
    <button className="public" onClick={() => openModal()}>
      +
    </button>
  );
};

export default PublicClipAddButton;
