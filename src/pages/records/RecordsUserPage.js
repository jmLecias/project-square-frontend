import React, { useEffect } from 'react';

import MainContainer from '../../components/containers/MainContainer';
import ContentContainer from '../../components/containers/ContentContainer';
import MainHeader from '../../components/headers/MainHeader';

import RecordsUserDetectionsList from '../../components/lists/RecordsUserDetectionsList';
import RecordsSelectionPanel from '../../components/lists/RecordsSelectionPanel';
import { useRecords } from '../../hooks/useRecords';

const RecordsUserPage = () => {
    const {setCurrentDate} = useRecords();

    useEffect(() => {
        return () => {
            setCurrentDate(null);
        }
    }, []);

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

export default RecordsUserPage;
