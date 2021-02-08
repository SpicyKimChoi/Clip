import React, { useState } from 'react';
import axios from 'axios';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'



const ToggleProject = () => {
    const [select, setSelect] = useState("Your Project")
    const toggle = React.useRef<HTMLButtonElement>(null)

    const handleProject = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { value } = e.target as HTMLButtonElement;
        setSelect(value)
    }
    // const fetchProject = () => {
    //     axios.get(`test`)
    //         .then((res) => {
    //             return res.data
    //         })
    // }
    console.log(select)
    return (
        <>
            <Menu>
                {/* <MenuButton onClick={fetchProject} ref={toggle} as={Button} mr={3} rightIcon={<ChevronDownIcon />}> */}
                <MenuButton ref={toggle} as={Button} mr={3} rightIcon={<ChevronDownIcon />}>
                    {select}
                </MenuButton>
                <MenuList onClick={handleProject} >
                    <MenuItem value="Download">Download</MenuItem>
                    <MenuItem value="Create a Copy">Create a Copy</MenuItem>
                    <MenuItem value="Mark as Draft">Mark as Draft</MenuItem>
                    <MenuItem value="Delete">Delete</MenuItem>
                    <MenuItem value="Attend a Workshop">Attend a Workshop</MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default ToggleProject;