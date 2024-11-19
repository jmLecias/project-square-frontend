import { createContext, useContext, useMemo, useRef, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

import { toDisplayText, toFilename } from "../services/DateFormatService";


const RecognizeContext = createContext();

const TIMEOUT = 100;

const SCAN_STATUS = {
    DETECTING: 'detecting',
    RECOGNIZING: 'recognizing'
};

const TOAST_CONFIG = {
    autoClose: 2500,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const RecognizeProvider = ({ children }) => {
    const videoRef = useRef();

    const [scanState, setScanState] = useState({
        isScanning: false,
        verifiedFaces: [],
    });

    const { isScanning, verifiedFaces } = scanState;

    const updateScanState = (newState) => {
        setScanState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const getImageUrl = async (filename) => {
        try {
            const response = await square_api.get(`/bucket/get/${filename}`);
            return response.data.url
        } catch (e) {
            console.log("Error while getting image url" + e)
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

    // const captureFrame = () => {
    //     return new Promise((resolve, reject) => {
    //         const canvas = document.getElementById("stream-canvas");
    //         requestAnimationFrame(() => {
    //             canvas.toBlob(resolve, 'image/png');
    //         });
    //     });
    // };


    // const captureDeviceFrame = async () => {
    //     const video = videoRef.current;
    //     const canvas = document.getElementById("device-canvas");
    //     canvas.width = video.videoWidth;
    //     canvas.height = video.videoHeight;
    //     canvas.getContext('2d').drawImage(video, 0, 0);

    //     return new Promise((resolve) => {
    //         requestAnimationFrame(() => {
    //             canvas.toBlob(resolve, 'image/jpeg');
    //         });
    //     });
    // };

    const captureDeviceFrame = async () => {
        const imageSrc = videoRef.current.getScreenshot();
        const base64String = imageSrc.split(",")[1];

        const imageBlob = await base64ToBlob(base64String);

        return imageBlob;
    };

    const handleScan = async (locationId, groupId) => {
        const newDate = new Date();

        try {
            const deviceImageBlob = await captureDeviceFrame();

            await recognizeFaces(deviceImageBlob, newDate, locationId, groupId);
            // await checkRecognizeResults(recognizeTaskId);

        } catch (error) {
            handleToast(error.message, 'error');
        }
    };

    const recognizeFaces = async (deviceImgBlob, datetime, locationId, groupId) => {
        updateScanState({
            isScanning: true
        });

        const captureData = new FormData();
        captureData.append('capturedFrames', deviceImgBlob, toFilename(datetime) + "_dvcam.png");
        captureData.append('datetime', datetime.toISOString());
        captureData.append('location_id', locationId);
        captureData.append('group_id', groupId);

        const response = await square_api.post('/face/recognize-faces', captureData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const jobId = response.data.job_id;
        return jobId;
    };

    const getDetection = async (detectionId) => {
        try {
            const response = await square_api.get('/face/detection-record/'+detectionId)
            return response.data.detection;
        } catch (e) {
            console.log("Error while getting detection record", e)
        }
    };

    const isScanningOn = () => updateScanState({isScanning: true});
    const isScanningOff = () => updateScanState({isScanning: false});


    const value = useMemo(
        () => ({
            updateScanState,
            recognizeFaces,
            handleToast,
            isScanning,
            verifiedFaces,
            SCAN_STATUS,
            getImageUrl,
            handleScan,
            videoRef,
            getDetection,
            isScanningOn,
            isScanningOff
        }),
        [scanState]
    );
    return <RecognizeContext.Provider value={value}>{children}</RecognizeContext.Provider>;
};

export const useRecognize = () => {
    return useContext(RecognizeContext);
};