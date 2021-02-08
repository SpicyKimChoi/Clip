import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Switch,
} from "@chakra-ui/react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import usePrivateClip from "../../hooks/usePrivateClip";

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
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLButtonElement>(null);

  return (
    <PrivateClipWrapper>
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add modal</ModalHeader>
          <ModalBody pb={1}>
            <Switch
              size={"md"}
              pb={3}
              onChange={() => {
                setSwitchClip(!switchClip);
              }}
            >
              스위치
            </Switch>
            {switchClip ? (
              <FormControl>
                <FormLabel>Memo </FormLabel>
                <Input
                  placeholder="Memo"
                  name="discription"
                  onChange={onChange}
                ></Input>
              </FormControl>
            ) : (
              <div>
                <FormControl pb={5}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    placeholder="Title을 입력하세요"
                    onChange={onChange}
                  ></Input>
                </FormControl>
                <FormControl pb={5}>
                  <FormLabel>Url</FormLabel>
                  <Input
                    name="url"
                    placeholder="Url을 입력하세요"
                    onChange={onChange}
                  ></Input>
                </FormControl>
                <FormControl pb={5}>
                  <FormLabel>Discription</FormLabel>
                  <Input
                    placeholder="Discription을 입력하세요"
                    name="discription"
                    onChange={onChange}
                  ></Input>
                </FormControl>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="facebook" onClick={onClick}>
              생성
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PrivateClipWrapper>
  );
};
const PrivateClipWrapper = styled.div`
  border: 1px solid;
  border-color: green;
`;
export default ClipAddButton;
