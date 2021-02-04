import React from 'react';
import LoginGoogle from "../../atoms/LoginGoogle";
import CreateProject from "../../atoms/CreateProject"
import ToggleProject from "../../atoms/ToggleProject";


const Header = () => {
    return (
        <div>
            <LoginGoogle />
            <ToggleProject />
            <CreateProject />
        </div>
    )
}


export default Header;
