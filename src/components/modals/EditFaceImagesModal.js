import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import IdentityFace from "../../pages/identity/IdentityFace";

const EditFaceImagesModal = ({ show, onClose, faceImages }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            onHide={() => { handleClose() }}
            contentClassName="upload-modal-dialog"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-white">
                    Update Face Images
                </Modal.Title>
            </Modal.Header>

            <Modal.Body 
                className="threel-scrollbar text-white"
                style={{padding: 0}}
            >
                <div className="step-main-container mx-auto">
                    <IdentityFace faceImages={faceImages}/>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default EditFaceImagesModal;