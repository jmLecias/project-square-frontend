import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation } from "../../hooks/useLocation";
import { useFeeds } from "../../hooks/useFeeds";


const CAMERA_TYPES = [
    {
        id: null,
        type_name: 'None',
    },
    {
        id: 1,
        type_name: 'Entrance',
    },
    {
        id: 2,
        type_name: 'Exit',
    }
]

const CameraModal = ({ show, onClose, camera }) => {

    const {
        BUTTON_TEXT,
        updateState,
        handleChange,
        inputName,
        rtspUrl,
        cameraType,
        createGroup,
    } = useFeeds();
    const {
        triggerReloadLocation
    } = useLocation();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.ADD);

    const handleClose = () => {
        onClose();
        updateState({ inputName: null });
    }

    const handleSubmit = async () => {
        try {
            setButtonText(BUTTON_TEXT.ADDING);

            const group = await createGroup(inputName.trim(), 1);
            handleToast(`Group "${group.name}" created successfully`, 'success');
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            triggerReloadLocation(); // Reloads the location page
            setButtonText(BUTTON_TEXT.ADD);
            updateState({ inputName: null, });
            handleClose();
        }
    }

    return (
        <Modal
            aria-labe7lledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            onHide={() => { handleClose() }}
            contentClassName="upload-modal-dialog"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                    {camera ? "Edit Camera" : "Add a Camera"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="threel-scrollbar text-white" closeButton>
                <input
                    name='inputName' // must be same with state in useGroup
                    type='text'
                    placeholder='Camera Name'
                    value={inputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />
                <input
                    name='rtspUrl' // must be same with state in useGroup
                    type='text'
                    placeholder='RTSP Url'
                    value={rtspUrl}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />

                {/* Select for camera type */}
                <div className="small mb-2">Camera type</div>
                <select
                    name="cameraType" // must be same with state in useGroup
                    value={cameraType}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                >
                    <option value="" disabled>Select Camera Type</option>
                    {CAMERA_TYPES.map((type) => (
                        <option key={type.id} value={type.id}>{type.type_name}</option>
                    ))}
                </select>

                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.ADDING}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.ADDING && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>

        </Modal>
    );
}

export default CameraModal;