import React from 'react';
import LoginGoogle from "../../atoms/LoginGoogle";
import CreateProject from "../../atoms/CreateProject"
import ToggleProject from "../../atoms/ToggleProject";


const Header = () => {
    return (
        <header>
            <LoginGoogle />
            <ToggleProject />
            <CreateProject />
        </header>
    )
}


export default Header;
