import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation } from "../../hooks/useLocation";
import { useFeeds } from "../../hooks/useFeeds";


const CameraModal = ({ show, onClose, camera, location }) => {

    const {
        BUTTON_TEXT,
        handleToast,
        updateState,
        handleChange,
        inputName,
        rtspUrl,
        addCamera,
        setEditCamera,
        updateCamera
    } = useFeeds();
    const {
        triggerReloadLocation,
    } = useLocation();

    const [buttonText, setButtonText] = useState((camera)? BUTTON_TEXT.UPDATE : BUTTON_TEXT.ADD);

    useEffect(() => {
        if(camera) {
            updateState({
                inputName: camera.name,
                rtspUrl: camera.rtsp_url
            })
        }
    }, [camera])

    const handleClose = () => {
        onClose();
        updateState({ inputName: null, rtspUrl: null });
        setEditCamera(null);
    }

    const handleSubmit = async () => {
        if (camera) {
            try {
                setButtonText(BUTTON_TEXT.UPDATING);

                const response = await updateCamera(inputName.trim(), rtspUrl.trim(), camera.id);
                handleToast(response.message, 'success');
            } catch (error) {
                console.error(error);
                handleToast(error.message, 'error');
            } finally {
                triggerReloadLocation(); // Reloads the location page
                setButtonText(BUTTON_TEXT.ADD);
                updateState({ inputName: null, rtspUrl: null});
                handleClose();
            }
        } else {
            try {
                setButtonText(BUTTON_TEXT.ADDING);

                const response = await addCamera(inputName.trim(), rtspUrl.trim(), location.id);
                handleToast(response.message, 'success');
            } catch (error) {
                console.error(error);
                handleToast(error.message, 'error');
            } finally {
                triggerReloadLocation(); // Reloads the location page
                setButtonText(BUTTON_TEXT.ADD);
                updateState({ inputName: null, rtspUrl: null});
                handleClose();
            }
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

                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.ADDING || buttonText === BUTTON_TEXT.UPDATING}
                    onClick={() => { handleSubmit() }}
                >
                    {(buttonText === BUTTON_TEXT.ADDING || buttonText === BUTTON_TEXT.UPDATING) && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>

        </Modal>
    );
}

export default CameraModal;