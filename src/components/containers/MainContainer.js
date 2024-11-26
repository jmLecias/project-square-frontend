import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import MainSidebar from '../sidebars/MainSidebar';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';

import { useAuth } from '../../hooks/useAuth';
import { useIdentity } from '../../hooks/useIdentity';
import { useGroup } from '../../hooks/useGroup';
import { useSidebar } from '../../hooks/useSidebar';

const MainContainer = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);

    const { setIsNarrow } = useSidebar();
    const {
        showCreateGroup,
        showJoinGroup,
        toggleCreateGroup,
        toggleJoinGroup,
    } = useGroup();
    const { user, logout } = useAuth();
    const { getIdentity, identity } = useIdentity();

    let isFetching = false;

    useEffect(() => {

        if (!isFetching && !identity) {
            isFetching = true;
            getIdentity(user.id)
                .then((userInfo) => {
                    isFetching = false;
                })
                .catch((err) => {
                    isFetching = false;
                    // OR MAYBE SHOW A MODAL FOR
                    logout().then(() => {
                        window.location.replace(`/auth/register/identity/` + user.id);
                    });
                    console.log(err);
                })
        }

        const handleResize = () => {
            setWidth(window.innerWidth);
            if (window.innerWidth < 800) {
                setIsNarrow(true);
            } else {
                setIsNarrow(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [identity]);

    return (
        <div className="main-container">
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