import React, { useRef } from 'react';
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

const CreateProject = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef<HTMLInputElement>(null)
    const finalRef = React.useRef<HTMLButtonElement>(null)

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Button ml={4} ref={finalRef}>
                I'll receive focus on close
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Project name</FormLabel>
                            <Input ref={initialRef} placeholder="프로젝트 이름을 입력하세요" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder="간단한 설명을 입력해주세요" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateProject;