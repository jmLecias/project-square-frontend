import React, { useEffect, useState } from 'react';
import { squareApiBaseUrl } from '../../api/square_api';

import { FaArrowRight } from "react-icons/fa";

import { useIdentity } from '../../hooks/useIdentity';

const RecognizedItem = ({ unique_key, detected, datetime }) => {
    const { getIdentityImage } = useIdentity();

    const [img, setImg] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        getIdentityImage(unique_key).then((identity) => {
            setImg(identity.url);
            setName(identity.name); 
        });
    }, []);
    const id_split = unique_key.split("/");
    const identity = id_split[id_split.length - 1];


    return (
        <div className='queue-item box-shadow mb-2 fade-in'>
            <div className='d-flex align-items-center' style={{ width: 'fit-content' }}>
                <div
                    className='square-item-cover my-auto'
                    style={{ width: '60px', borderRadius: '5px' }}
                >
                    <img
                        src={squareApiBaseUrl + "/face/detected-face/" + detected}
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
                    style={{fontSize: '1.1  rem'}}
                    title={name}
                    >{name}</span>

                <span
                    className='item-date opacity-75 text-truncate'
                    style={{fontSize: '12px'}}
                >{datetime}</span>
            </div>
        </div>
    )
}

export default RecognizedItem;