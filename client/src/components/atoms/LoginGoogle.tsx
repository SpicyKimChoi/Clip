import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const LoginGoogle = () => {
    const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
        if ('googleId' in res) {
            const profile = res.getBasicProfile()
            console.log(res.profileObj)
        }
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