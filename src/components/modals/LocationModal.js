import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation } from "../../hooks/useLocation";

const LocationModal = ({ show, onClose, group, location }) => {

    const {
        BUTTON_TEXT,
        updateState,
        handleToast,
        handleChange,
        inputName,
        createLocation,
        updateLocation,
        triggerReloadLocation,
        setEditLocation
    } = useLocation();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.CREATE);

    useEffect(() => {
        if (location) {
            updateState({
                inputName: location.name,
            })
            setButtonText((location)? BUTTON_TEXT.UPDATE : BUTTON_TEXT.CREATE)
        }
    }, [location])

    const handleClose = () => {
        onClose();
        updateState({ inputName: null });
        setEditLocation(null);
    }

    const handleSubmit = async () => {
        if (location) {
            try {
                setButtonText(BUTTON_TEXT.UPDATING);
    
                const response = await updateLocation(inputName.trim(), location.id);
                handleToast(response.message, 'success');
            } catch (error) {
                handleToast(error.response.data.message, 'error');
            } finally {
                triggerReloadLocation(); //Reloads the Group page
                setButtonText((location) ? BUTTON_TEXT.UPDATE : BUTTON_TEXT.CREATE);
                updateState({ inputName: null, });
                handleClose();
            }
        } else {
            try {
                setButtonText(BUTTON_TEXT.CREATING);
    
                const location = await createLocation(inputName.trim(), group.id);
                handleToast(`Location "${location.name}" created successfully`, 'success');
            } catch (error) {
                handleToast(error.response.data.message, 'error');
            } finally {
                triggerReloadLocation(); //Reloads the Group page
                setButtonText((location) ? BUTTON_TEXT.UPDATE : BUTTON_TEXT.CREATE);
                updateState({ inputName: null, });
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
                    {(location)? "Edit location" : "Add new location"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="threel-scrollbar text-white" closeButton>
                <input
                    name='inputName' // must be same with state in useLocation
                    type='text'
                    placeholder='Name'
                    value={inputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />
                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.CREATING || buttonText === BUTTON_TEXT.UPDATING}
                    onClick={() => { handleSubmit() }}
                >
                    {(buttonText === BUTTON_TEXT.CREATING || buttonText === BUTTON_TEXT.UPDATING) && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default LocationModal;