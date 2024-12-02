import React from 'react';

import { squareApiBaseUrl } from '../../api/square_api';

import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

const DashboardDetectionsList = ({ detections }) => {
    const navigate = useNavigate();

    const {handleDetectionClick} = useDashboard();

    const renderRecentDetections = () => {
        return (
            <>
                <div className='fs-6 p-3' style={{ fontWeight: '500' }}>Your recent detections</div>

                {detections.map((detection) => {
                    return (
                        <div
                            className='dashboard-detection-item'
                            key={detection.id}
                        >
                            <div
                                className='square-item-cover my-auto'
                                style={{ width: '60px', borderRadius: '5px', marginLeft: '1.5rem', cursor: 'zoom-in' }}
                                onClick={() => handleDetectionClick(detection.origin)}
                            >
                                <img
                                    src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(detection.detection)}
                                />
                            </div>
                            <div className='ms-4 d-flex flex-column justify-content-center'>
                                <span
                                    className='text-truncate'
                                    style={{ fontSize: '12px' }}
                                >{detection.group}</span>

                                <span
                                    className='fw-bold text-truncate'
                                    style={{ fontSize: '1.1rem' }}
                                >{detection.location}</span>

                                <span
                                    className=' opacity-75 text-truncate'
                                    style={{ fontSize: '12px' }}
                                >{detection.datetime}</span>
                            </div>

                        </div>

                    )
                })}

                <div
                    className='fs-6 p-3 text-center cursor-pointer opacity-75'
                    style={{ fontWeight: '500', textDecoration: 'underline' }}
                    onClick={() => navigate('/records')}
                >
                    View all your Detection Records
                </div>
            </>
        );
    };


    return (
        <>
            {renderRecentDetections()}
        </>
    )
}

export default DashboardDetectionsList;