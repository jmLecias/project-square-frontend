import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { TimeRangePicker } from 'rsuite'; 
import Accordion from 'react-bootstrap/Accordion';

import { useGroup } from "../../hooks/useGroup";
import { useAuth } from "../../hooks/useAuth";
import { useDashboard } from "../../hooks/useDashboard";

const CreateGroupModal = ({ show, onClose }) => {
    const { user } = useAuth();
    const { triggerReloadDashboard } = useDashboard();

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
    const [timeRange, setTimeRange] = useState([null, null]);

    const handleClose = () => {
        onClose();
        updateState({ inputName: null, inputCode: null });
        setTimeRange(null); 
    };

    const handleSubmit = async () => {
        try {
            setButtonText(BUTTON_TEXT.CREATING);
            const [startDate, endDate] = timeRange;

            const formatTime = (date) =>
                date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
                    
            const startTime = (startDate)? formatTime(startDate) : null; 
            const endTime = (endDate)? formatTime(endDate) : null;   

            const group = await createGroup(inputName.trim(), user.id, startTime, endTime);
            handleToast(`Group "${group.name}" created successfully`, 'success');
        } catch (error) {
            handleToast(error.response.data.error, 'error');
        } finally {
            triggerReloadGroups(); // Reloads the Groups page
            triggerReloadDashboard(); // Reloads the Dashboard page
            setButtonText(BUTTON_TEXT.CREATE);
            updateState({ inputName: null });
            handleClose();
        }
    };

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            backdrop={"static"}
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
                    name="inputName"
                    type="text"
                    placeholder="Name"
                    value={inputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />

                <Accordion className="mb-3" defaultActiveKey={null}>
                    <Accordion.Item>
                        <Accordion.Header>Advanced Settings</Accordion.Header>
                        <Accordion.Body>
                            <div className="mb-2">Schedule (optional):</div>
                            <TimeRangePicker
                                appearance="subtle"
                                placement="topStart"
                                format="hh:mm aa"
                                showMeridiem
                                value={timeRange}
                                onChange={setTimeRange}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <button
                    className="group-forms-btn"
                    disabled={buttonText === BUTTON_TEXT.CREATING || (!inputName && !timeRange)}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.CREATING && <Spinner size="sm" variant="light" />}
                    <span className="text-white ms-2">{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default CreateGroupModal;
