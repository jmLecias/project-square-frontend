import React from 'react';

import MainContainer from '../../components/containers/MainContainer';

import SectionHeader from '../../components/headers/SectionHeader';

import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { useIdentity } from '../../hooks/useIdentity';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
    const navigate = useNavigate();

    const { IDENTITY_PAGES, identity } = useIdentity();
    const { user } = useAuth();

    return (
        <MainContainer>
            <div className='settings-container'>
                <div className='mt-4'>
                    <SectionHeader
                        title={"User Settings"}
                    />
                    <div className='d-flex mb-3'>
                        <div className='user-default-profile-div'>
                            <img src='/images/user_default.jpg' alt='User image' className='fade-in' />
                        </div>
                        <div className='ms-4'>
                            <div className='fs-4' style={{ fontWeight: '600' }}>{(identity)? identity.fullname : ''}</div>
                            <div className='fs-6 mb-3' style={{ fontWeight: '400' }}>{user.email}</div>

                            <button
                                className='main-button'
                                onClick={() => navigate(IDENTITY_PAGES.INFO)}
                                style={{ padding: '5px 15px' }}
                            >
                                <MdEdit size={20} />
                                <span className='ms-1'>Update Identity</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default SettingsPage;
