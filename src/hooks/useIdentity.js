import { createContext, useContext, useMemo, useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';
import StorageService from "../services/StorageService";

import square_api from "../api/square_api";

const IdentityContext = createContext();

const TIMEOUT = 500;

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const IdentityProvider = ({ children }) => {
    const ss = new StorageService();
    const webcamRef = useRef(null);

    const [uploadFinished, setUploadFinished] = useState(false);

    const [useCamera, setUseCamera] = useState(false);
    const [useRear, setUseRear] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const [state, setState] = useState({
        identity: null,
        faces: [null, null, null, null, null],
        facePreviews: [null, null, null, null, null],
        firstName: '',
        middleName: '',
        lastName: '',
        inputErrors: {
            firstName: '',
            middleInitial: '',
            lastName: '',
        },
    });

    const { firstName, middleName, lastName } = state;
    const { faces, facePreviews, identity } = state;

    const CAN_PROCEED_FACE = (
        firstName !== '' &&
        lastName !== ''
    );

    const CAN_PROCEED_VERIFY = (
        firstName !== '' &&
        lastName !== '' &&
        faces[0] !== null
    );

    const IDENTITY_PAGES = {
        INFO: `/auth/register/identity`,
        FACE: `/auth/register/identity/face`,
        VERIFY: `/auth/register/identity/verify`,
        UPLOAD: `/auth/register/identity/upload`,
    };

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            inputErrors: {
                ...prevState.inputErrors,
                [field]: '',
            },
        }));
    };

    const getIdentity = async (userID) => {
        const response = await square_api.get(`/identity/get/${userID}`);

        if (response.status === 200) {
            updateState({ identity: response.data.user_info });
            return response.data.user_info
        } else {
            ss.removeItem('user');
            return null
        }
    };

    const getIdentityImage = async (unique_key) => {
        const response = await square_api.get(`/identity/get-image/${unique_key}`);

        return response.data.identity
    };

    const uploadIdentity = async (user_id) => {
        const identityData = new FormData();
        identityData.append('first_name', firstName);
        identityData.append('middle_name', middleName);
        identityData.append('last_name', lastName);
        identityData.append('user_id', user_id);

        faces.map((face, index) => {
            if (face !== null) {
                const fileName = lastName + "_" + index + ".jpg";
                identityData.append('faceImages', face, fileName);
            }
        });

        const response = await square_api.post('/identity/upload', identityData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const jobId = response.data.job_id;
        return jobId;
    };

    const checkUploadIdentity = async (uploadTaskId) => {
        while (true) {
            try {
                const response = await square_api.get(`/identity/upload-result/${uploadTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const uploadedImages = response.data.result;

                    return uploadedImages;
                }
                if (response.data.state === "FAILURE") {
                    throw new Error("Identity upload task failed...");
                }
            } catch (error) {
                console.error(`Error checking identity upload status ${uploadTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, TIMEOUT));
        }
    };

    const saveFaceEmbeddings = async (face_image_path, unique_key) => {
        const payload = {
            face_image_path: face_image_path,
            unique_key: unique_key
        };

        const response = await square_api.post('/identity/save-embeddings', payload);
        const jobId = response.data.job_id;

        return jobId;
    };

    const checkSaveFaceEmbeddings = async (saveEmbeddingsTaskId) => {
        while (true) {
            try {
                const response = await square_api.get(`/identity/upload-result/${saveEmbeddingsTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const successMessage = response.data.result;

                    return successMessage;
                }
                if (response.data.state === "FAILURE") {
                    throw new Error("Save face embeddings task failed...");
                }
            } catch (error) {
                console.error(`Error checking save face embeddings status ${saveEmbeddingsTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, TIMEOUT * 4));
        }
    };

    const base64ToBlob = (base64Data, contentType = "image/jpeg") => {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const capturePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64String = imageSrc.split(",")[1];

        const imageBlob = await base64ToBlob(base64String);

        const newFaces = state.faces;
        newFaces[currentIndex] = imageBlob;

        const newFacePreviews = [
            ...newFaces.map((face) => (face) ? URL.createObjectURL(face) : null),
        ]

        updateState({ faces: newFaces, facePreviews: newFacePreviews });

        if (currentIndex !== faces.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    const deletePhoto = async (index) => {
        const newFaces = state.faces;
        newFaces[index] = null;

        const newFacePreviews = [
            ...newFaces.map((face) => (face) ? URL.createObjectURL(face) : null),
        ]

        updateState({ faces: newFaces, facePreviews: newFacePreviews });
    }

    const onStepBackClick = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const onStepNextClick = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleFaceImageclick = (index) => setCurrentIndex(index);
    const toggleCamera = () => setUseCamera(!useCamera);
    const toggleFlipped = () => setIsFlipped(!isFlipped);
    const toggleRear = () => setUseRear(!useRear);

    const value = useMemo(
        () => ({
            identity,
            updateState,
            handleChange,
            handleToast,
            toggleCamera,
            useCamera,
            firstName,
            middleName,
            lastName,
            faces,
            currentIndex,
            handleFaceImageclick,
            facePreviews,
            webcamRef,
            capturePhoto,
            IDENTITY_PAGES,
            CAN_PROCEED_FACE,
            CAN_PROCEED_VERIFY,
            uploadIdentity,
            checkUploadIdentity,
            saveFaceEmbeddings,
            checkSaveFaceEmbeddings,
            getIdentity,
            getIdentityImage,
            currentStep,
            setCurrentStep,
            onStepBackClick,
            onStepNextClick,
            deletePhoto,
            isFlipped,
            toggleFlipped,
            useRear,
            toggleRear,
            uploadFinished,
            setUploadFinished,
        }),
        [state, useCamera, currentIndex, currentStep, isFlipped, useRear, uploadFinished]
    );
    return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
};

export const useIdentity = () => {
    return useContext(IdentityContext);
};