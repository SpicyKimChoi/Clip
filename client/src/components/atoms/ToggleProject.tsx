import React, { useState } from 'react';
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
    const handleProject = (e: any) => {
        setSelect(e.target.value)
    }

    console.log(select)
    return (
        <>
            <Menu>
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