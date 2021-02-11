
import React from 'react';
import LoginGoogle from "../atoms/LoginGoogle"

import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Icon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { Drawer } from "@chakra-ui/react";

const Setting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);


  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={() => onOpen()}>
        <Icon as={MdSettings} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => onClose()}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );

};

export default Setting;
