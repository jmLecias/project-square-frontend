import React, { useEffect, useState } from 'react';
import { squareApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

import DetectingLoadingItem from './DetectingLoadingItem';

import { useIdentity } from '../../hooks/useIdentity';
import { useRecognize } from '../../hooks/useRecognize';

const RecognizedItem = ({ id }) => {
    const { getIdentityImage } = useIdentity();
    const { getDetection, isScanningOff} = useRecognize();

    const [img, setImg] = useState(null);
    const [detection, setDetection] = useState(null);

    useEffect(() => {
        getDetection(id).then((res) => {
            setDetection(res);

            getIdentityImage(res.identity).then((identity) => {
                setImg(identity.url);
            });

            isScanningOff(); // Turn off isScanning
        });
    }, [id]);



    return detection && (
        <div className='queue-item box-shadow mb-2 fade-in'>
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
                <FaArrowRight size={24} />
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={img}
                        alt={`database image`}
                    />
                </div>
            </div>
            <div className='details ms-2 d-flex flex-column justify-content-center'>

                <span
                    className='item-name fw-bold text-truncate'
                    style={{ fontSize: '1.1  rem' }}
                    title={detection.detected_name}
                >{detection.detected_name}</span>

                <span
                    className='item-date opacity-75 text-truncate'
                    style={{ fontSize: '12px' }}
                >{detection.datetime}</span>
            </div>
        </div>
    )
}

export default RecognizedItem;