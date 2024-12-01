import React from "react";
import Modal from 'react-bootstrap/Modal';

import { squareApiBaseUrl } from "../../api/square_api";

import { useDashboard } from "../../hooks/useDashboard";

const OriginImageModal = ({ show, onClose }) => {
    const { originImg } = useDashboard();

    const handleClose = () => {
        onClose();
    }

    return (
        <Modal
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            onHide={() => { handleClose() }}
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-6 text-white">
                    Origin Image
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: '0' }}>
                <img
                    style={{ objectFit: 'cover', width: '100%' }}
                    src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(originImg)}
                />
            </Modal.Body>
        </Modal>
    );
}

export default OriginImageModal;