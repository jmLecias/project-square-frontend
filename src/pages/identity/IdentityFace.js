import React, { useEffect } from 'react';

import { LuScanFace } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

import ImageDropzone from '../../components/dropzones/ImageDropzone';

import { useIdentity } from '../../hooks/useIdentity';

const IdentityFace = () => {

    const {
        toggleCamera,
        faces,
        facePreviews,
        currentIndex,
        handleFaceImageclick,
        updateState,
        useCamera,
        capturePhoto,
        CAN_PROCEED_FACE,
        CAN_PROCEED_VERIFY,
        onStepNextClick,
        onStepBackClick,
        setCurrentStep,
        deletePhoto
    } = useIdentity();

    useEffect(() => {
        if (!CAN_PROCEED_FACE) {
            setCurrentStep(0);
        }   
    }, []);

    const handleImageDrop = (images) => {
        const slotsToEnd = 5 - currentIndex;
        const slots = (images.length <= slotsToEnd) ? images.length : slotsToEnd;

        const newFaces = [
            ...faces.slice(0, currentIndex),
            ...images.slice(0, slots),
            ...faces.slice(currentIndex + slots)
        ];

        const newPreviews = [
            ...newFaces.map((face) => (face) ? URL.createObjectURL(face) : null),
        ];

        updateState({ faces: newFaces, facePreviews: newPreviews });
    }

    const FaceImage = ({ width, index }) => {
        const isActive = (currentIndex === index) ? 'active' : '';
        const hasSrc = (facePreviews[index]) ? 'with-source' : '';
        return (
            <div
                className={`identity-face-div ${isActive} ${hasSrc}`}
                style={{ width: `${width}` }}
                onClick={() => handleFaceImageclick(index)}
            >
                <img src={facePreviews[index]} />
                {hasSrc && ( <IoClose size={20} className='face-image-close-btn' onClick={() => deletePhoto(index)}/>)}
            </div>
        )
    };


    return (
        <>
            <div className='step-header-area'>
                <div className='fs-6'>Step 2 out of 4</div>
                <div className='step-title' >Face Images</div>
            </div>
            <div className='step-left-area'>
                <div className='face-selection-grid'>
                    <div className='face-selection-default-area'>
                        <div className='fs-6 mb-2' style={{ fontWeight: '600' }}>Default profile</div>
                        <FaceImage width={'100%'} index={0} />
                    </div>
                    <div className='face-selection-reminders-area'>
                        <div className='fs-6 mb-2'>Reminders:</div>
                        <ul className='w-100'>
                            <li className='small mb-2'>Only one face in the image</li>
                            <li className='small mb-2'>Center your face</li>
                            <li className='small mb-2'>Include different angles</li>
                            <li className='small mb-2'>Eyeglasses are fine, but no tinted or face-covering accessories</li>
                        </ul>
                    </div>
                    <div className='face-selection-others-area'>
                        <div className='fs-6 mb-2 mt-4' style={{ fontWeight: '600' }}>Other face images</div>
                        <div className='face-grid-display'>
                            <FaceImage width={'100%'} index={1} />
                            <FaceImage width={'100%'} index={2} />
                            <FaceImage width={'100%'} index={3} />
                            <FaceImage width={'100%'} index={4} />
                        </div>
                    </div>
                </div>

                <div className='d-flex align-items-center mt-5'>
                    <button
                        className='main-button me-4'
                        onClick={onStepBackClick}
                    >
                        Back
                    </button>
                    <button
                        className='main-button'
                        disabled={!CAN_PROCEED_VERIFY}
                        onClick={onStepNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='step-right-area'>
                <ImageDropzone onImageDrop={handleImageDrop} initialImage={facePreviews[currentIndex]} index={currentIndex} />
                {!useCamera && (
                    <button className="main-button rounded mt-3" onClick={toggleCamera}>Use Camera</button>
                )}
                {useCamera && (
                    <div className='camera-actions-container'>
                        <button className="main-button rounded" onClick={toggleCamera}>Browse</button>
                        <button className="main-button rounded" onClick={() => { capturePhoto() }}>Capture</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default IdentityFace;
