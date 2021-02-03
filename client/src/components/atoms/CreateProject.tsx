import React, { useState } from 'react';
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
    useDisclosure
} from "@chakra-ui/react";
import axios from 'axios';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<HTMLInputElement>(null)
    const finalRef = React.useRef<HTMLButtonElement>(null)

    const projectChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setProjectName(e.target.value)
    }
    const descriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(e.target.value)
    }
    const postProject = () => {
        axios({
            method: "POST",
            url: "http://localhost:4000/projects/create",
            data: {
                "name": projectName,
                "description": description
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        onClose()
    }
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                {/* 모달 뒤가 흐려집니다. */}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Project name</FormLabel>
                            <Input onChange={projectChange} value={projectName} ref={initialRef} placeholder="프로젝트 이름을 입력하세요" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input onChange={descriptionChange} value={description} placeholder="간단한 설명을 입력해주세요" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="facebook" mr={3} onClick={postProject}>
                            생성
                        </Button>
                        <Button onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateProject;