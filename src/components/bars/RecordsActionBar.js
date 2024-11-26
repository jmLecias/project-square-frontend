import React from 'react';

import { FaListUl } from "react-icons/fa6";
import { PiExportBold } from "react-icons/pi";

const RecordsActionBar = ({ title }) => {

    return (
        <div className='records-action-bar'>
            <div className='d-flex align-items-center'>
                <FaListUl size={20} />
                <div className='fs-6 ms-2 fw-bold'>{title}</div>
            </div>
            <div>
                <button
                    className='main-button'
                    onClick={() => {}}
                    style={{ padding: '5px 10px', borderRadius: '9px' }}
                >
                    <PiExportBold className='me-2' size={20} />
                    Export
                </button>
            </div>
        </div>
    );
}

export default RecordsActionBar;
