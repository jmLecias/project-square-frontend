import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import NotFoundPage from '../NotFoundPage';
import GroupHeaderLoading from '../../components/headers/GroupHeaderLoading';
import GroupPageLoading from './GroupPageLoading';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import GroupIndex from './GroupIndex';

import CreateLocationModal from '../../components/modals/CreateLocationModal';

import { useLocation } from '../../hooks/useLocation'
// import { useRecognize } from '../../hooks/useRecognize';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

const RecordsPage = ({ content }) => {
    const { id } = useParams();
    let isFetching = false;

    const [owner, setOwner] = useState(null);
    const [group, setGroup] = useState(null);
    const [locations, setLocations] = useState([]);
    const [members, setMembers] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const { setBreadcrumbs, clearBreadcrumbs, addBreadcrumb } = useBreadcrumbs();
    // const { getImageUrl } = useRecognize();

    const {
        getGroupLocations,
        toggleCreateLocation,
        reload,
        showCreateLocation,
        handleToast
    } = useLocation();

    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getGroupLocations(id)
                .then((res) => {
                    setOwner(res.owner);
                    setGroup(res.group);
                    setLocations(res.locations);
                    setMembers(res.members);
                    handleBreadcrumbs(res.group);
                })
                .catch((e) => {
                    handleToast(e.response.data.error, "error");
                    if (e.response.status === 404) setNotFound(true);
                })
                .finally(() => isFetching = false)
        }

        return () => {
            setGroup(null);
            setOwner(null);
            setLocations([]);
            setMembers([]);
            setNotFound(false);
        };
    }, [id, reload]);

    const handleBreadcrumbs = (group) => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Groups", link: "/groups" },
            { label: group.name, link: "/groups/" + group.id },
        ]);
    };


    return (
        <>
            <CreateLocationModal
                show={showCreateLocation}
                onClose={toggleCreateLocation}
                group={group}
            />

            <MainContainer>
                {!group && !notFound && (
                    <ContentContainer
                        header={ <GroupHeaderLoading />}
                    >
                        <GroupPageLoading />
                    </ContentContainer>
                )}
                {!group && notFound && (
                    <NotFoundPage content={"noGroup"} />
                )}
                {group && (
                    <ContentContainer
                        header={<MainBreadcrumbs />}
                    >
                        <div className={`group-locations-container fade-in`}>
                            {content === "index" && (<GroupIndex group={group} owner={owner} locations={locations} />)}
                        </div>
                    </ContentContainer>
                )}
            </MainContainer>
        </>
    );
}

export default RecordsPage;