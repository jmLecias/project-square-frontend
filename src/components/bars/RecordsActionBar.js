import React from 'react';

import { FaListUl } from "react-icons/fa6";
import { PiExportBold } from "react-icons/pi";
import { useRecords } from '../../hooks/useRecords';

const RecordsActionBar = ({ title, isOwner, location }) => {

    const { exportAttendanceExcel } = useRecords();

    return (
        <div className='records-action-bar w-100'>
            <div className='d-flex align-items-center' style={{ overflow: 'hidden' }}>
                <FaListUl size={20} />
                <div className='fs-6 ms-2 fw-bold text-truncate'>{title}</div>
            </div>
            <div>
                {isOwner && (
                    <button
                        className='main-button'
                        onClick={() => {
                            exportAttendanceExcel(location)
                        }}
                        style={{ padding: '5px 10px', borderRadius: '9px' }}
                    >
                        <PiExportBold className='me-2' size={20} />
                        Attendance Today
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecordsActionBar;
