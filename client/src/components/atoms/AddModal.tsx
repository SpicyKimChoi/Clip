import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";
import usePrivateClip from "../../hooks/usePrivateClip";
import useAddModal from "../../hooks/useAddModal";
import usePublicClip from "../../hooks/usePublicClip";

const AddModal = () => {
  const { isOpen, onClose } = useModal();
  const { addPrivateClip } = usePrivateClip();
  const { addPublicClip } = usePublicClip();

  const {
    titleState,
    urlState,
    discriptionState,
    makeDiscription,
    makeTitle,
    makeUrl,
  } = useInput();
  const { isPrivate } = useAddModal();
  const [switchClip, setSwitchClip] = useState(false);

  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLButtonElement>(null);

  const makePrivateClip = () => {
    const obj = {
      id: 1,
      title: titleState,
      url: urlState,
      discription: discriptionState,
    };
    addPrivateClip(obj);
    onClose();
  };
  const makePublicClip = () => {
    const obj = {
      id: 1,
      title: titleState,
      url: urlState,
      discription: discriptionState,
    };
    addPublicClip(obj);
    onClose();
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
          {isPrivate === "Private" ? (
            <Button mr={3} colorScheme="facebook" onClick={makePrivateClip}>
              생성
            </Button>
          ) : (
            <Button mr={3} colorScheme="facebook" onClick={makePublicClip}>
              생성
            </Button>
          )}

          <Button onClick={() => onClose()}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
