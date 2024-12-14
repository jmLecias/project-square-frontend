import React, { useState, useEffect } from 'react';
import { Loader } from 'rsuite';
import { useParams } from 'react-router-dom';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import RecordsLocationDetectionsList from '../../components/lists/RecordsLocationDetectionsList';
import RecordsLocationUsersList from '../../components/lists/RecordsLocationUsersList';
import RecordsDailyList from './../../components/lists/RecordsDailyList';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useRecords } from '../../hooks/useRecords';
import { useAuth } from '../../hooks/useAuth';

const RecordsLocationPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { clearBreadcrumbs, setBreadcrumbs } = useBreadcrumbs();
    const { getLocationRecordsInfo, setCurrentDate } = useRecords();

    let isFetching = false;

    const [location, setLocation] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getLocationRecordsInfo(id)
                .then((res) => {
                    setLocation(res.location);
                    setUsers(res.users);
                    handleBreadcrumbs(res.location);
                })
                .catch((e) => {
                    console.log(e.response.data.error);
                })
                .finally(() => isFetching = false)
        }

        return () => {
            setLocation(null);
            setUsers([]);
            setCurrentDate(null);
        };
    }, [id]);

    const handleBreadcrumbs = (location) => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Records", link: "/records" },
            { label: location.name, link: "/records/location/" + location.id },
        ]);
    };

    return (
        <MainContainer>
            {(location && users) ? (
                <ContentContainer
                    header={<MainBreadcrumbs />}
                >
                    <div className='records-container'>
                        <div className='records-left-area'>
                            <RecordsLocationDetectionsList
                                location={location}
                                currentUser={currentUser}
                            />
                        </div>
                        <div className='records-right-area'>
                            {/* {(currentUser || location.owner_id !== user.id) && (
                                    <RecordsDailyList />
                                )} */}
                            {location.owner_id === user.id && (
                                <RecordsLocationUsersList
                                    users={users}
                                    onUserChange={(user) => setCurrentUser(user)}
                                    currentUser={currentUser}
                                    location={location}
                                />
                            )}
                        </div>
                    </div>
                </ContentContainer>
            ) : (
                <Loader center speed='slow' size='lg' />
            )}
        </MainContainer>
    );
}

export default RecordsLocationPage;
