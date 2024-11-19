import React, { useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { squareApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

import DetectingLoadingItem from './DetectingLoadingItem';

import { useRecognize } from '../../hooks/useRecognize';

const RecognizingLoadingItem = ({ id }) => {
    const { getDetection, isScanningOff } = useRecognize();

    const [detection, setDetection] = useState(null);

    useEffect(() => {
        getDetection(id).then((res) => {
            setDetection(res);
            isScanningOff(); // Turn off isScanning
        });
    }, [id]);

    return detection && (
        <div className='loading-recognition-item animate-wave mb-2'>
            <div className='d-flex align-items-center' style={{ width: 'fit-content' }}>
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={squareApiBaseUrl + "/face/detected-face/" + encodeURIComponent(detection.detected_path)}
                        alt={`input image`}
                    />
                </div>
                <FaArrowRight className='opacity-50' size={24} />
                <div
                    className='loading-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                </div>
            </div>
            <div className='ms-3 w-100 d-flex flex-column'>
                <Placeholder className='w-25 mb-1' />
                <Placeholder className='w-75 mb-1' />
                <Placeholder className='w-50' />
            </div>
        </div>
    )
}

export default RecognizingLoadingItem;