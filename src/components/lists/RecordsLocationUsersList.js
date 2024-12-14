import React from 'react';
import { List } from 'rsuite';

import { PiExportBold } from "react-icons/pi";

import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useRecords } from '../../hooks/useRecords';

const RecordsLocationUsersList = ({ users, currentUser, onUserChange, location }) => {

    const { 
        exportAttendanceExcel,
    } = useRecords();

    const handleUserClick = (user) => {
        onUserChange(user);
    };

    const renderUsers = () => {
        return (
            <>
                {users.map((user) => {
                    return (
                        <List.Item
                            className='user-list-item'
                            key={user.id}
                            style={{ backgroundColor: `${(currentUser) ? (currentUser.id === user.id) ? 'var(--primary-color-light)' : '' : ''}` }}
                            onClick={() => handleUserClick(user)}
                        >
                            <FaUser className='me-3' size={15} />
                            {user.name}
                        </List.Item>

                    )
                })}
            </>
        );
    };

    return (
        <div className="records-selection-panel" style={{ padding: '1rem' }}>
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <div className='fs-6 fw-bold'>Filter location users</div>
                <button
                    className='main-button'
                    onClick={() => {
                        exportAttendanceExcel(location)
                    }}
                    style={{ padding: '5px 10px', borderRadius: '9px' }}
                >
                    <PiExportBold className='me-2' size={20} />
                    Export Attendance
                </button>
            </div>
            <List hover bordered>
                <List.Item
                    key={"all"}
                    className='user-list-item'
                    style={{ backgroundColor: `${!currentUser ? 'var(--primary-color-light)' : ''}` }}
                    onClick={() => handleUserClick(null)}
                >
                    <FaUsers className='me-3' size={20} />
                    All users
                </List.Item>
                {renderUsers()}
            </List>
        </div>
    )
}

export default RecordsLocationUsersList;