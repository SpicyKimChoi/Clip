import React from 'react';
import CreateProject from "../../atoms/CreateProject"
import ToggleProject from "../../atoms/ToggleProject";
import Setting from '../../atoms/Setting';


const Header = () => {
    return (
        <header>
            <ToggleProject />
            <CreateProject />
            <Setting />
        </header>
    )
}


export default Header;
