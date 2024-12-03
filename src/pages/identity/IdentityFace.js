import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { IoClose } from "react-icons/io5";

import ImageDropzone from '../../components/dropzones/ImageDropzone';

import { useIdentity } from '../../hooks/useIdentity';
import { useSettings } from '../../hooks/useSettings';
import { useAuth } from '../../hooks/useAuth';

const IdentityFace = ({ isUpdating, onClose }) => {
    const { user } = useAuth();
    const {
        handleToast,
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
        deletePhoto,
        updateFaces,
        checkUploadIdentity,
        saveFaceEmbeddings,
        checkSaveFaceEmbeddings
    } = useIdentity();
    const {
        setUserInfo,
        getUserInfo,
    } = useSettings();

    const [buttonText, setButtonText] = useState("Update Faces");

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

    const handleUpdateFaces = async () => {
        setButtonText("Updating Faces...")
        try {
            const uploadTaskId = await updateFaces(user.id);
            const uploadedImages = await checkUploadIdentity(uploadTaskId);

            for (const uploadedImage of uploadedImages) {
                const saveEmbeddingsTaskId = await saveFaceEmbeddings(uploadedImage.face_image_path, uploadedImage.unique_key);
                await checkSaveFaceEmbeddings(saveEmbeddingsTaskId);
            }
        } catch (e) {
            console.log("Error while updating faces: ", e)
        }
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
                {hasSrc && (<IoClose size={20} className='face-image-close-btn' onClick={() => deletePhoto(index)} />)}
            </div>
        )
    };


    return (
        <>
            {!isUpdating && (
                <div className='step-header-area'>
                    <div className='fs-6'>Step 2 out of 4</div>
                    <div className='step-title' >Face Images</div>
                </div>
            )}
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

                {!isUpdating && (
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
                )}
                {isUpdating && (
                    <button
                        className='main-button mt-5'
                        style={{ width: 'fit-content' }}
                        disabled={(!faces[0] && !faces[1] && !faces[2] && !faces[3] && !faces[4]) || buttonText === "Updating Faces..."}
                        onClick={() => {
                            handleUpdateFaces()
                                .then(() => {
                                    handleToast("Faces updated successfully!", "success");
                                    getUserInfo(user.id)
                                        .then((user_info) => {
                                            if (user_info) {
                                                setUserInfo(user_info);
                                                onClose();
                                            }
                                        })
                                        .catch((err) => {
                                            console.log("Error while getting user info: ", err)
                                        })
                                    setButtonText("Update Faces")
                                })
                        }}
                    >
                        {buttonText === "Updating Faces..." && <Spinner size='sm' variant="light" className='me-3'/>}
                        {buttonText}
                    </button>
                )}
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
