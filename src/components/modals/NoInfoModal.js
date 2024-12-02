import React from "react";
import Modal from 'react-bootstrap/Modal';

import { useAuth } from "../../hooks/useAuth";
import { useSettings } from "../../hooks/useSettings";

import { FaArrowRight } from "react-icons/fa6";

const NoInfoModal = ({ show }) => {
    const { user, logout } = useAuth();
    const { setShowNoInfo } = useSettings();

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
                    Registration Incomplete
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex flex-column align-items-center text-white">
                <img src='/svg/personal-site-animate.svg' alt="img" width={'50%'}/>
                <div className="fs-4 text-center">It looks like you've skipped a step in setting up Identity.</div>
                <button
                    className='modal-button m-3 mt-5'
                    onClick={() => {
                        logout().then(() => {
                            setShowNoInfo(false);
                            window.location.replace(`/auth/register/identity/` + user.id);
                        });
                    }}
                >
                    Continue setting up Identity 
                    <FaArrowRight className="ms-2"/>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default NoInfoModal;