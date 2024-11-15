import React from 'react';

import Dropdown from '../dropdowns/Dropdown';

import { IoNotifications } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { useAuth } from "../../hooks/useAuth";
import { useGroup } from '../../hooks/useGroup';
import { useSidebar } from '../../hooks/useSidebar';
import { useIdentity } from '../../hooks/useIdentity';

const MainHeader = ({ text }) => {
    const { user } = useAuth();
    const { toggleCreateGroup, toggleJoinGroup } = useGroup();
    const { toggleCollapse, isNarrow } = useSidebar();
    const { identity } = useIdentity();


    return (
        <div className='main-header-container'>
            <div className='d-flex align-items-center cursor-pointer'>
                <HiOutlineMenuAlt2 size={30} onClick={toggleCollapse} />
                {(text && !isNarrow) && (<div className='fs-5 ms-2'>{text}</div>)}
            </div>
            <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center'>
                    <Dropdown icon={<IoMdAdd size={25} />} title={"Add"}>
                        <div className='icon-dropdown-item' onClick={toggleCreateGroup}>
                            <IoMdAdd size={25} title='Create Group' />
                            <span className='icon-dropdown-text'>Create group</span>
                        </div>
                        <div className='icon-dropdown-item' onClick={toggleJoinGroup}>
                            <IoMdAdd size={25} title='Join Group' />
                            <span className='icon-dropdown-text'>Join group</span>
                        </div>
                    </Dropdown>
                    <Dropdown icon={<IoNotifications size={24} />} title={"Notifications"}>
                        <div className='icon-dropdown-item' onClick={() => { }}>
                            <IoNotifications size={24} title='Notifications' />
                            <span className='icon-dropdown-text'>Notifications</span>
                        </div>
                    </Dropdown>
                </div>
                <div className='d-flex align-items-center ms-4'>
                    <div className='header-user-div prevent-select'>
                        <img
                            src={"/images/user_default.jpg"}
                            alt={`user_image`}
                        />
                    </div>
                    {!isNarrow && (
                        <div className='me-3'>
                            <div className='fs-6'>
                                {(identity)? identity.fullname : ''}
                            </div>
                            <div className='small'>
                                {user.email}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainHeader;
