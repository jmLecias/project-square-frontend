import React, { useEffect } from 'react';

import { FaUserGroup } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import MainContainer from '../../components/containers/MainContainer';
import MainHeader from '../../components/headers/MainHeader';
import ContentContainer from '../../components/containers/ContentContainer';

import GroupItem from '../../components/items/GroupItem';
import SectionHeader from '../../components/headers/SectionHeader';

import { useGroup } from '../../hooks/useGroup';
import { useAuth } from '../../hooks/useAuth';

const GroupsPage = () => {
    const { user } = useAuth();

    let isFetching = false;
    const {
        joinedGroups,
        createdGroups,
        getCreatedGroups,
        getJoinedGroups,
        toggleCreateGroup,
        toggleJoinGroup,
        reload
    } = useGroup();


    useEffect(() => {
        if (
            !isFetching &&
            user
        ) {
            isFetching = true;
            try {
                getJoinedGroups(user.id).then(() => { isFetching = false; });
                getCreatedGroups(user.id).then(() => { isFetching = false; });
            } catch (error) {
                console.error(error);
            }
        }
    }, [user, reload]);


    const renderJoinedGroups = () => {
        return joinedGroups.map((group, index) => {
            return (
                <GroupItem
                    group={group}
                    key={index}
                />
            )
        });
    };

    const renderCreatedGroups = () => {
        return createdGroups.map((group, index) => {
            return (
                <GroupItem
                    key={index}
                    group={group}
                />
            )
        });
    };

    return (
        <MainContainer>
            <ContentContainer
                header={<MainHeader text={"Groups"} />}
            >
                <div className='groups-joined-area'>
                    <div className='groups-section'>
                        <SectionHeader
                            icon={<IoIosArrowDown className='me-2' size={25} />}
                            title={"Joined Groups"}
                            actions={
                                <>
                                    <button
                                        className='main-button group-action'
                                        onClick={toggleJoinGroup}
                                        style={{ padding: '10px 18px', borderRadius: '12px' }}
                                    >
                                        Join group
                                        <FaUserGroup className='ms-2' size={20} />
                                    </button>
                                </>
                            }
                        />
                        {joinedGroups.length === 0 && (
                            <div className=''>
                                No groups joined yet
                            </div>
                        )}
                        {joinedGroups.length > 0 && (
                            <div className='groups-grid-display'>
                                {renderJoinedGroups()}
                            </div>
                        )}
                    </div>
                </div>
                <div className='groups-created-area'>
                    <div className='groups-section'>
                        <SectionHeader
                            icon={<IoIosArrowDown className='me-2' size={25} />}
                            title={"Created Groups"}
                            actions={
                                <>
                                    <button
                                        className='main-button group-action'
                                        onClick={toggleCreateGroup}
                                        style={{ padding: '10px 18px', borderRadius: '12px' }}
                                    >
                                        Create group
                                        <FaUserPlus className='ms-2' size={20} />
                                    </button>
                                </>
                            }
                        />
                        {createdGroups.length === 0 && (
                            <div className=''>
                                No groups created yet
                            </div>
                        )}
                        {createdGroups.length > 0 && (
                            <div className='groups-grid-display'>
                                {renderCreatedGroups()}
                            </div>
                        )}
                    </div>
                </div>
            </ContentContainer>
        </MainContainer>
    );
}

export default GroupsPage;
