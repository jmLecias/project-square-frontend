import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import MainContainer from '../../components/containers/MainContainer';

import IdentityInfo from './IdentityInfo';
import IdentityFace from './IdentityFace';
import IdentityVerify from './IdentityVerify';

const IdentityPage = ({ content }) => {

    useEffect(() => {
        // Ask confirmation from user when reloading page
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className='identity-setup-container'>
            <ToastContainer />
            <div className='step-main-container'>
                {content === "info" && (<IdentityInfo />)}
                {content === "face" && (<IdentityFace />)}
                {content === "verify" && (<IdentityVerify />)}
                {content === "finish" && (<IdentityInfo />)}
            </div>
        </div>
    );
};

export default IdentityPage;
