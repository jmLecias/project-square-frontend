import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import MainSidebar from '../sidebars/MainSidebar';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';
import OriginImageModal from '../modals/OriginImageModal';
import NoInfoModal from '../modals/NoInfoModal';
import SessionTimeoutModal from '../modals/SessionTimeoutModal';

import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../hooks/useGroup';
import { useDashboard } from '../../hooks/useDashboard';
import { useSettings } from '../../hooks/useSettings';

const MainContainer = ({ children }) => {
    const {
        showCreateGroup,
        showJoinGroup,
        toggleCreateGroup,
        toggleJoinGroup,
    } = useGroup();
    const { user, isSessionExpired } = useAuth();
    const {
        getUserInfo,
        userInfo,
        setUserInfo,
        showNoInfo,
        setShowNoInfo,
        showTimeout,
        setShowTimeout
    } = useSettings();
    const { originImg, setOriginImg } = useDashboard();

    let isFetching = false;

    useEffect(() => {
        if (isSessionExpired()) {
            setShowTimeout(true);
        }

        if (!isFetching && !userInfo) {
            isFetching = true;
            getUserInfo(user.id)
                .then((user_info) => {
                    if (user_info) {
                        setUserInfo(user_info);
                    }
                })
                .catch((err) => {
                    setShowNoInfo(true); // Show no info modal when no user_info yet
                })
                .finally(() => {
                    isFetching = false;
                });
        }
    }, []);

    return (
        <div className="main-container">
            <SessionTimeoutModal
                show={showTimeout}
            />

            <NoInfoModal
                show={showNoInfo}
            />

            <OriginImageModal
                show={originImg}
                onClose={() => setOriginImg(null)}
            />

            <CreateGroupModal
                show={showCreateGroup}
                onClose={toggleCreateGroup}
            />

            <JoinGroupModal
                show={showJoinGroup}
                onClose={toggleJoinGroup}
            />

            <ToastContainer limit={1} />

            <MainSidebar />

            <div className='content-area'>
                {children}
            </div>
        </div>
    )
}

export default MainContainer;