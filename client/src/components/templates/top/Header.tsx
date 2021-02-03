import React from 'react';
import LoginGoogle from "../../atoms/LoginGoogle";
import CreateProject from "../../atoms/CreateProject"



const Header = () => {
    return (
        <div>
            <LoginGoogle />
            <CreateProject />
        </div>
    )
}


export default Header;
