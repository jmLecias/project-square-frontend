import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import StorageService from "../../services/StorageService";

import { useGroup } from "../../hooks/useGroup";
import { useAuth } from "../../hooks/useAuth";

const JoinGroupModal = ({ show, onClose }) => {
    const ss = new StorageService();

    const { user } = useAuth();

    const {
        BUTTON_TEXT,
        updateState,
        handleToast,
        handleChange,
        inputCode,
        inputErrors,
        joinGroup, 
        triggerReloadGroups
    } = useGroup();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.JOIN);

    const handleClose = () => {
        onClose();
        updateState({ inputName: null, inputCode: null}); 
    }

    const handleSubmit = async () => {
        try {
            setButtonText(BUTTON_TEXT.JOINING);

            const group = await joinGroup(inputCode.trim(), user.id);
            handleToast(`Joined "${group.name}" group successfully`, 'success');
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            triggerReloadGroups(); // Reloads the Groups page
            setButtonText(BUTTON_TEXT.JOIN);
            updateState({ inputCode: null,}); 
            handleClose();
        }
    }

    return (
        <Modal
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
                <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                    Join a group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="threel-scrollbar text-white" closeButton>
                <input
                    name='inputCode' // must be same with state in useGroup
                    type='text'
                    placeholder='Code'
                    value={inputCode}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />
                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.JOINING}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.JOINING && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default JoinGroupModal;