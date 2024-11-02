import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MemberItem from '../../components/items/MemberItem';

import { useGroup } from '../../hooks/useGroup';
import { useLocation } from '../../hooks/useLocation';

const GroupMembers = ({ members, owner }) => {

    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

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

    const renderMembers = () => {
        return (
            members.map((member) => (<MemberItem member={member} />))
        )
    }

    return (
        <div className='group-locations-area' >
            <div style={{ width: '100%', maxWidth: '700px' }} className='slide-up mb-5'>
                <div className='fs-5 mb-3 fw-bold'>Owner</div>
                <MemberItem member={owner} />

                <div className='mt-4 mb-3 d-flex align-items-center justify-content-between'>
                    <div className='fs-5 fw-bold'>Group Members</div>
                    <div className='small'>{members.length} members</div>
                </div>
                {renderMembers()}
            </div>
        </div>
    );
}

export default GroupMembers;
