import React from "react";
import Modal from 'react-bootstrap/Modal';

import { useAuth } from "../../hooks/useAuth";
import { useSettings } from "../../hooks/useSettings";

import { FaArrowRight } from "react-icons/fa6";

const SessionTimeoutModal = ({ show }) => {
    const { logout } = useAuth();
    const { setShowTimeout } = useSettings();

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            backdrop="static"
            scrollable
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-6 text-white">
                    Session Timeout
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex flex-column align-items-center text-white">
                <img src='/svg/tablet-login-animate.svg' alt="img" width={'50%'}/>
                <div className="fs-4 text-center">Your authenticated session has expired.</div>
                <div className="fs-6 opacity-50 text-center">Please log in again to continue using Square.</div>
                <button
                    className='modal-button m-3 mt-5'
                    onClick={() => {
                        logout().then(() => {
                            setShowTimeout(false);
                            window.location.replace(`/auth/login`);
                        });
                    }}
                >
                    Log in
                    <FaArrowRight className="ms-2"/>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default SessionTimeoutModal;