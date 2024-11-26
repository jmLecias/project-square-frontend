import React from 'react';
import { useParams } from 'react-router-dom';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainHeader from '../../components/headers/MainHeader';

import RecordsUserDetectionsList from '../../components/lists/RecordsUserDetectionsList';
import RecordsSelectionPanel from '../../components/lists/RecordsSelectionPanel';

const RecordsLocationPage = () => {
    const { id } = useParams();
    let isFetching = false;

    const handleBreadcrumbs = (group) => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Records", link: "/records" },
            { label: group.name, link: "/records/created-group/" + group.id },
            { label: "User Name", link: "" },
        ]);
    };

    return (
        <MainContainer>
            <ContentContainer
                header={<MainHeader text={"Records"} />}
            >
                <div className='records-container'>
                    <div className='records-left-area'>
                        <RecordsUserDetectionsList />
                    </div>
                    <div className='records-right-area'>
                        <RecordsSelectionPanel />
                    </div>
                </div>
            </ContentContainer>
        </MainContainer>
    );
}

export default RecordsLocationPage;
