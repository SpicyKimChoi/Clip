import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();


const LoginGoogle = () => {

    const responseGoogle = (res: any): void => {
        console.log(res)
    }
    const responseFailGoogle = (err: any): void => {
        console.log(err)
    }
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENTID!}
                buttonText="Google login"
                onSuccess={responseGoogle}
                onFailure={responseFailGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default LoginGoogle;
