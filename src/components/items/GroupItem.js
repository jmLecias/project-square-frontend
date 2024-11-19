import React from 'react';
import { useNavigate } from 'react-router-dom';


const GroupItem = ({ group }) => {
    const navigate = useNavigate();

    return (
        <div className='group-item fade-in' onClick={() => { navigate(`/groups/${group.id}`) }}>
            <div
                className='opacity-75 text-truncate'
                style={{ fontSize: '11px' }}
            >
                Group
            </div>

            <div
                className='fw-bold text-truncate'
                title={group.name}
            >
                {group.name}
            </div>
        </div>
    )
}

export default GroupItem;