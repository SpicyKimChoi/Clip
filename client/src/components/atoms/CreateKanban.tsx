import React, { useState } from 'react';
import axios from 'axios'
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
} from "@chakra-ui/react"

const CreateKanban = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const kanbanBtn = React.useRef<HTMLInputElement>(null)
    const [kanbanName, setKanbanName] = useState("");
    const initialRef = React.useRef<HTMLInputElement>(null);
    const finalRef = React.useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const kabanTitle = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setKanbanName(e.target.value);
    };
    const postKanban = () => {
        axios({
            method: "POST",
            url: "http://localhost:4000/kanban/create",
            data: {
                name: kanbanName,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        onClose();
        toast({
            title: "Project created.",
            description: "We've created your project for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };
    return (
        <>
            <Button onClick={onOpen}>
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                {/* 모달 뒤가 흐려집니다. */}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Kanban</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Kanban name</FormLabel>
                            <Input
                                onChange={kabanTitle}
                                value={kanbanName}
                                ref={initialRef}
                                placeholder="제목을 입력해주세요"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="facebook" mr={3} onClick={() => postKanban()}>
                            생성
                        </Button>
                        <Button onClick={() => onClose()}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateKanban;