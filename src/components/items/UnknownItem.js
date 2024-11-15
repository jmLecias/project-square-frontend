import React from 'react';
import { faceApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

const UnknownItem = ({ detected, datetime }) => {
    return (
        <div className='queue-item box-shadow mb-2 fade-in'>
            <div className='d-flex align-items-center'>
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={faceApiBaseUrl + "/face/detected-face/" + detected  }
                        alt={`input image`}
                    /> 
                </div>
                <FaArrowRight size={24} />
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={"/images/unknown.jpg"}
                        alt={`database image`}
                    />
                </div>
            </div>
            <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='fs-6 fw-bold text-truncate'
                >Unknown Face</span>
                <span
                    className='small opacity-75 text-truncate'
                >{datetime}</span>
            </div>
        </div>
    )
}

export default UnknownItem;