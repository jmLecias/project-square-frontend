import React from 'react';

import RecordsDetectionsList from '../../components/lists/RecordsDetectionsList';
import RecordsActionBar from '../../components/bars/RecordsActionBar';
import RecordsSelectionPanel from '../../components/lists/RecordsSelectionPanel';

const RecordsIndex = () => {

    return (
        <div className='records-container'>
            <div className='records-left-area'>
                <RecordsActionBar title={"Your records"} />
                <RecordsDetectionsList />
            </div>
            <div className='records-right-area'>
                <RecordsSelectionPanel />
            </div>
        </div>
    );
};

export default RecordsIndex;
