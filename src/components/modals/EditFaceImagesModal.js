import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import IdentityFace from "../../pages/identity/IdentityFace";
import { useIdentity } from "../../hooks/useIdentity";

const EditFaceImagesModal = ({ show, onClose }) => {

    const { updateState } = useIdentity();

    const handleClose = () => {
        onClose();
        updateState({
            facePreviews: [null, null, null, null, null],
            faces: [null, null, null, null, null],
        })
    }

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
                style={{ padding: 0 }}
            >
                <div className="step-main-container mx-auto">
                    <IdentityFace
                        isUpdating={true}
                        onClose={handleClose}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default EditFaceImagesModal;