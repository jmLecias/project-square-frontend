import React from 'react';

import { FaListUl } from "react-icons/fa6";

const RecordsActionBar = ({ title }) => {

    return (
        <div className='records-action-bar'>
            <div className='d-flex align-items-center'>
                <FaListUl size={20} />
                <div className='fs-6 ms-2 fw-bold'>{title}</div>
            </div>
            <div>
                {/* Joined group selection */}
            </div>
        </div>
    );
}

export default RecordsActionBar;
