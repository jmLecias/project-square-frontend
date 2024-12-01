import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useGroup } from "../../hooks/useGroup";
import { useAuth } from "../../hooks/useAuth";

const CreateGroupModal = ({ show, onClose }) => {

    const { user } = useAuth();

    const {
        BUTTON_TEXT,
        updateState,
        handleToast,
        handleChange,
        inputName,
        createGroup,
        triggerReloadGroups
    } = useGroup();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.CREATE);

    const handleClose = () => {
        onClose();
        updateState({ inputName: null, inputCode: null}); 
    }

    const handleSubmit = async () => {
        try {
            setButtonText(BUTTON_TEXT.CREATING);

            const group = await createGroup(inputName.trim(), user.id);
            handleToast(`Group "${group.name}" created successfully`, 'success');
        } catch (error) {
            handleToast(error.response.data.error, 'error');
        } finally {
            triggerReloadGroups(); // Reloads the Groups page
            setButtonText(BUTTON_TEXT.CREATE);
            updateState({ inputName: null,}); 
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
                    Create a group
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="threel-scrollbar text-white" closeButton>
                <input
                    name='inputName' // must be same with state in useGroup
                    type='text'
                    placeholder='Name'
                    value={inputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />
                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.CREATING}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.CREATING && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default CreateGroupModal;