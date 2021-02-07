import React from 'react';
import LoginGoogle from "../../atoms/LoginGoogle";
import CreateProject from "../../atoms/CreateProject"
import ToggleProject from "../../atoms/ToggleProject";
import Setting from '../../atoms/Setting';


const Header = () => {
    return (
        <header>
            <LoginGoogle />
            <ToggleProject />
            <CreateProject />
            <Setting />
        </header>
    )
}


export default Header;
