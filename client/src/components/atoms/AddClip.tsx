import React, { useState } from 'react';
import Modal from 'react-modal';
import Hello from "./Hello";
Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const AddClip = () => {
    const [clip, setClip] = useState(false)

    const openModal = () => {
        setClip(true)
    }
    const closeModal = () => {
        setClip(false)
    }
    const postServer = () => {
        closeModal()
    }
    const getCurrentPage = () => {

    }
    return (
        <div>
            <button onClick={openModal}>+</button>
            <Modal
                isOpen={clip}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal}>취소</button>
                <button onClick={postServer}>생성</button>
                <Hello />
            </Modal>
            <div>
                <button onClick={() => getCurrentPage()}>getPage</button>
            </div>
        </div>
    );
};

export default AddClip;