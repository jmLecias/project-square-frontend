import React from 'react';
import { List } from 'rsuite';

import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const RecordsLocationUsersList = ({ users, currentUser, onUserChange }) => {

    const handleUserClick = (user) => {
        onUserChange(user);
    };

    return (
        <div className="records-selection-panel" style={{ padding: '1rem' }}>
            <div className='fs-6 mb-3 fw-bold'>Filter location users</div>
            <List hover bordered>
                <List.Item
                    className='user-list-item'
                    style={{ backgroundColor: `${currentUser === null ? 'var(--primary-color-light)' : ''}` }}
                    onClick={() => handleUserClick(null)}
                >
                    <FaUsers className='me-3' size={20} />
                    All users
                </List.Item>
                {users.map((user) => (
                    <List.Item
                        className='user-list-item'
                        style={{ backgroundColor: `${(currentUser)? (currentUser.id === user.id) ? 'var(--primary-color-light)' : '' : ''}` }}
                        onClick={() => handleUserClick(user)}
                    >
                        <FaUser className='me-3' size={15}/>
                        {user.name}
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default RecordsLocationUsersList;