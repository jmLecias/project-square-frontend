import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import IdentityInfo from './IdentityInfo';
import IdentityFace from './IdentityFace';
import IdentityVerify from './IdentityVerify';
import IdentityUpload from './IdentityUpload';

import { useParams } from 'react-router-dom';
import { useIdentity } from '../../hooks/useIdentity';

const IdentityPage = () => {
    const { id } = useParams();
    const { currentStep, uploadFinished } = useIdentity();

    useEffect(() => {
        // Ask confirmation from user when reloading page
        const handleBeforeUnload = (event) => {
            if (!uploadFinished) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [uploadFinished]);

    return (
        <div className='identity-setup-container'>
            <ToastContainer />
            <div className='step-main-container'>
                {currentStep === 0 && (<IdentityInfo />)}
                {currentStep === 1 && (<IdentityFace />)}
                {currentStep === 2 && (<IdentityVerify />)}
                {currentStep === 3 && (<IdentityUpload userId={id} />)}
            </div>
        </div>
    );
};

export default IdentityPage;
