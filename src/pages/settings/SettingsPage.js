import React from 'react';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import SectionHeader from '../../components/headers/SectionHeader';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { useIdentity } from '../../hooks/useIdentity';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
    const navigate = useNavigate();

    const { IDENTITY_PAGES, identity, userImage } = useIdentity();
    const { user } = useAuth();

    return (
        <MainContainer>
            <ContentContainer
                header={<MainBreadcrumbs />}
            >
                <div className='settings-container'>
                    <div className='mt-4 settings-section'>
                        <SectionHeader
                            title={"User Settings"}
                        />
                        <div className='d-flex mb-3'>
                            <div className='user-default-profile-div'>
                                <img
                                    src={userImage}
                                    className='fade-in'
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className='ms-4'>
                                <div className='fs-4' style={{ fontWeight: '600' }}>{(identity) ? identity.fullname : ''}</div>
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

            </ContentContainer>
        </MainContainer>
    );
};

export default SettingsPage;
