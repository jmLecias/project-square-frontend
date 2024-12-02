import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import SectionHeader from '../../components/headers/SectionHeader';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import EditFaceImagesModal from '../../components/modals/EditFaceImagesModal';

import { MdEdit } from "react-icons/md";

import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';

const SettingsPage = () => {
    const { user } = useAuth();
    const {
        BUTTON_TEXT,
        firstname,
        middlename,
        lastname,
        handleChange,
        updateState,
        handleToast,
        userInfo,
        setUserInfo,
        getUserInfo,
        updateUserInfo,
        getUserFullname,
        showEditFaces,
        toggleEditFaces
    } = useSettings();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.SAVE);

    useEffect(() => {
        if (userInfo) {
            updateState({
                firstname: userInfo.firstname,
                middlename: userInfo.middlename,
                lastname: userInfo.lastname
            })
        }
    }, [userInfo]);

    const handleSaveChanges = async () => {
        try {
            setButtonText(BUTTON_TEXT.SAVING);

            const response = await updateUserInfo(userInfo.id, firstname.trim(), middlename.trim(), lastname.trim());
            handleToast(response.message, 'success');
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            // Reload settings page?
            setButtonText(BUTTON_TEXT.SAVE);
            getUserInfo(user.id)
                .then((user_info) => {
                    if (user_info) {
                        setUserInfo(user_info);
                    }
                })
                .catch((err) => {
                    console.log("Error while getting user info: ", err)
                })
        }
    }

    const isUserInfoChanged = () => {
        if (userInfo) {
            return (
                userInfo.firstname !== firstname ||
                userInfo.middlename !== middlename ||
                userInfo.lastname !== lastname
            )
        }
    };

    return (
        <MainContainer>
            <EditFaceImagesModal
                show={showEditFaces}
                onClose={toggleEditFaces}
                faceImages={[{id: 1}]}
            />
            <ContentContainer
                header={<MainBreadcrumbs />}
            >
                <div className='settings-container'>
                    <div className='settings-section'>
                        <div className='settings-section-left-area'>
                            <SectionHeader
                                title={"User Settings"}
                            />
                            <div className='user-info-container'>
                                <div className='user-default-profile-div'>
                                    <img
                                        src={user.image}
                                        className='fade-in'
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className='infos'>
                                    <div className='fs-2' style={{ fontWeight: '600' }}>{getUserFullname()}</div>
                                    <div className='fs-6 mb-3' style={{ fontWeight: '400' }}>{user.email}</div>

                                    <button
                                        className='main-button'
                                        onClick={toggleEditFaces}
                                        style={{ padding: '5px 15px' }}
                                    >
                                        <MdEdit size={16} />
                                        <span className='ms-1'>Update Face Images</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='settings-section-right-area'>
                            <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>First Name</div>
                            <input
                                name='firstname'
                                type='text'
                                placeholder={'Firstname'}
                                value={firstname}
                                onChange={handleChange}
                                className="form-control"
                                style={{ maxWidth: '500px' }}
                            />
                            <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>Middle Name</div>
                            <input
                                name='middlename'
                                type='text'
                                placeholder={'Middlename ( leave blank if none )'}
                                value={middlename}
                                onChange={handleChange}
                                className="form-control"
                                style={{ maxWidth: '500px' }}
                            />
                            <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>Last Name</div>
                            <input
                                name='lastname'
                                type='text'
                                placeholder={'Lastname'}
                                value={lastname}
                                onChange={handleChange}
                                className="form-control"
                                style={{ maxWidth: '500px' }}
                            />

                            <button
                                className='main-button mt-5 mb-3'
                                disabled={buttonText === BUTTON_TEXT.SAVING || !isUserInfoChanged()}
                                onClick={handleSaveChanges}
                            >
                                {buttonText === BUTTON_TEXT.SAVING && <Spinner size='sm' variant="light" />}
                                <span className='text-white ms-2'>{buttonText}</span>
                            </button>
                        </div>
                    </div>
                </div>

            </ContentContainer>
        </MainContainer>
    );
};

export default SettingsPage;
