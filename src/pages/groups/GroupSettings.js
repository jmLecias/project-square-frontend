import React, { useState, useEffect } from 'react';
import { TimeRangePicker } from 'rsuite';
import { copyToClipboard } from '../../services/CopyService';

import SectionHeader from '../../components/headers/SectionHeader';
import DeleteGroupModal from '../../components/modals/DeleteGroupModal';

import { useGroup } from '../../hooks/useGroup';
import { useLocation } from '../../hooks/useLocation';

const GroupSettings = ({ group }) => {

    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [timeRange, setTimeRange] = useState(null);

    const {
        handleToast,
        handleChange,
        newInputName,
        updateGroup,
        showDeleteGroup,
        toggleDeleteGroup,
        updateState
    } = useGroup();

    const {
        triggerReloadLocation,
    } = useLocation();

    useEffect(() => {
        if (group.start_time && group.end_time && group.name) {
            const [startHours, startMinutes] = group.start_time.split(':').map(Number);
            const [endHours, endMinutes] = group.end_time.split(':').map(Number);

            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHours, startMinutes);
            const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHours, endMinutes);

            setTimeRange([startDate, endDate]);
            updateState({ newInputName: group.name });
        }
    }, [group]);

    const handleRename = () => {
        if (isRunning || newInputName === null) return;
        setIsRunning(true);

        const [startDate, endDate] = timeRange;

        const formatTime = (date) =>
            date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

        const startTime = (startDate) ? formatTime(startDate) : null;
        const endTime = (endDate) ? formatTime(endDate) : null;

        updateGroup(group.id, newInputName, startTime, endTime)
            .then(() => {
                handleToast("Group updated successfully!", 'success');
                updateState({ newInputName: null });
            })
            .catch((e) => {
                console.log("Renaming error: " + e)
            })
            .finally(() => {
                setIsRunning(false);
                triggerReloadLocation();
            });
    };

    const handleCopy = () => {
        if (!isCopied) {
            setIsCopied(true);
            copyToClipboard(group.code);

            setTimeout(() => {
                setIsCopied(false);
            }, 15000);
        }
    };

    return (
        <>
            <DeleteGroupModal
                show={showDeleteGroup}
                onClose={toggleDeleteGroup}
                group={group}
            />
            <div className='group-locations-area' >
                <div style={{ width: '100%', maxWidth: '800px' }} className='slide-up'>
                    <SectionHeader
                        title={"Group Settings"}
                    />
                    <div className='fs-6 mb-2' style={{ fontWeight: '600' }}>Group name</div>
                    <input
                        name='newInputName'
                        type='text'
                        placeholder={group.name}
                        value={newInputName}
                        onChange={handleChange}
                        className="form-control w-50 me-2"
                        style={{ maxWidth: '300px' }}
                    />
                    <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>Schedule</div>
                    <TimeRangePicker
                        appearance="subtle"
                        placement="bottomStart"
                        format="hh:mm aa"
                        showMeridiem
                        value={timeRange}
                        onChange={setTimeRange}
                    />
                    <button
                        className='main-button mt-4'
                        disabled={isRunning}
                        onClick={handleRename}
                    >
                        {(isRunning) ? "Updating..." : "Update"}
                    </button>

                    <div className='fs-6 mb-1 mt-5' style={{ fontWeight: '600' }}>Share group</div>
                    <div className='small mb-2'>Use the code below to let other users join this group.</div>
                    <div className='w-100 mb-5 d-flex align-items-center'>
                        <input
                            value={group.code}
                            className="form-control w-25"
                            disabled
                        />
                        <button
                            className='main-button ms-2'
                            disabled={isCopied}
                            onClick={handleCopy}
                        >
                            {(isCopied) ? "Copied" : "Copy"}
                        </button>
                    </div>

                    <SectionHeader
                        title={"Danger Zone"}
                    />
                    <div className='fs-6 mb-1 mt-4' style={{ fontWeight: '600' }}>Delete this group</div>
                    <div className='small mb-3'>Once you delete this group, there is no way to recover it. Please be certain.</div>
                    <button
                        className='danger-button fst-italic'
                        onClick={toggleDeleteGroup}
                    >
                        Delete group
                    </button>

                </div>
            </div>

        </>
    );
}

export default GroupSettings;
