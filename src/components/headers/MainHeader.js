import React from 'react';

import { Dropdown, Avatar, IconButton } from 'rsuite';
// import Dropdown from '../dropdowns/Dropdown';

import { IoMdAdd } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { useGroup } from '../../hooks/useGroup';
import { useSidebar } from '../../hooks/useSidebar';
import { useRecognize } from '../../hooks/useRecognize';
import { useIdentity } from '../../hooks/useIdentity';

const MainHeader = ({ text }) => {
    const { user, logout } = useAuth();
    const { toggleCreateGroup, toggleJoinGroup } = useGroup();
    const { isScanning } = useRecognize();
    const { toggleCollapse } = useSidebar();
    const { identity } = useIdentity();

    const navigate = useNavigate();

    const renderToggle = props => (
        <div className='header-user-div' {...props}>
            <img
                src={user.image}
                className='fade-in'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );


    const renderIconButton = (props, ref) => {
        return (
            <IconButton {...props} ref={ref} icon={<IoMdAdd size={20} />} circle appearance="subtle" style={{ color: 'white' }} />
        );
    };

    return (
        <div className='main-header-container'>
            <div className='d-flex align-items-center cursor-pointer'>
                <HiOutlineMenuAlt2 size={30} onClick={toggleCollapse} />
                {(text) && (<div className='main-header-text'>{text}</div>)}
            </div>
            <div className='d-flex align-items-center'>
                <Dropdown renderToggle={renderIconButton} title={"Add"} placement="bottomEnd">
                    <Dropdown.Item
                        icon={<IoMdAdd size={25} title='Create Group' />}
                        onClick={toggleCreateGroup}
                    >Create Group</Dropdown.Item>
                    <Dropdown.Item
                        icon={<IoMdAdd size={25} title='Join Group' />}
                        onClick={toggleJoinGroup}
                    >Join Group</Dropdown.Item>
                </Dropdown>
                <Dropdown renderToggle={renderToggle} placement="bottomEnd" className='ms-2'>
                    <Dropdown.Item panel style={{ padding: 10, color: 'var(--background-dark)' }}>
                        <p className='small'>Signed in as</p>
                        <strong>{(identity) ? identity.fullname : ''}</strong>
                        <p> {user.email}</p>
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item
                        icon={<IoSettingsSharp size={20} />}
                        onClick={() => navigate("/settings")}
                    >Settings</Dropdown.Item>
                    <Dropdown.Item
                        icon={<FiLogOut size={20} />}
                        onClick={() => {
                            if (!isScanning) {
                                logout().then(() => {
                                    window.location.replace('/dashboard');
                                });
                            }
                        }}
                    >{(isScanning) ? 'Still Scanning...' : 'Logout'}</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
}

export default MainHeader;
