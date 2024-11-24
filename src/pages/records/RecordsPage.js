import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import RecordsIndex from './RecordsIndex';

const RecordsPage = ({ content }) => {
    const { id } = useParams();
    let isFetching = false;

    const [owner, setOwner] = useState(null);
    const [group, setGroup] = useState(null);
    const [locations, setLocations] = useState([]);
    const [members, setMembers] = useState([]);
    const [notFound, setNotFound] = useState(false);

    return (
        <>
            <MainContainer>
                <ContentContainer
                    header={<MainBreadcrumbs />}
                >
                    <RecordsIndex/>
                </ContentContainer>
            </MainContainer>
        </>
    );
}

export default RecordsPage;
