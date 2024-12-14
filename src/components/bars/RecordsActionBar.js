import React from 'react';

import { FaListUl } from "react-icons/fa6";
import { useRecords } from '../../hooks/useRecords';
import { DatePicker } from 'rsuite';

const RecordsActionBar = ({ title, isOwner, location }) => {

    const { 
        currentDate,
        onDateChange
    } = useRecords();

    return (
        <div className='records-action-bar w-100'>
            <div className='d-flex align-items-center' style={{ overflow: 'hidden' }}>
                <FaListUl size={20} />
                <div className='fs-6 ms-2 fw-bold text-truncate'>{title}</div>
            </div>
            <div className='d-flex align-items-center'>
                <div className='me-2'>Filter date: </div>
                <DatePicker 
                    size='sm' 
                    value={currentDate}
                    onChange={onDateChange}
                />
            </div>
        </div>
    );
}

export default RecordsActionBar;
