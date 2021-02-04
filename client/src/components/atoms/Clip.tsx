import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import usePrivateClip from "../../hooks/usePrivateClip";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Clipinput = {
  id: number;
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

const Clip = ({ id, title, url, discription }: Clipinput) => {
  const { deletePrivateClip, editPrivateClip } = usePrivateClip();
  const {
    titleState,
    urlState,
    discriptionState,
    makeDiscription,
    makeTitle,
    makeUrl,
  } = useInput();
  const [editModal, setEditModal] = useState(false);
  const [switchClip, setSwitchClip] = useState(false);
  const editClip = () => {
    const obj = {
      id: id,
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
    <div>
      <div>{title}</div>
      <div>{url}</div>
      <div>{discription}</div>
      <button onClick={openModal}>edit</button>
      <button onClick={() => deletePrivateClip(id)}>delete</button>
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
        <button onClick={editClip}>생성</button>
      </Modal>
    </div>
  );
};

export default Clip;
