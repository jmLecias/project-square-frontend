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
        status: null,
        detections: null,
        datetime: null,
        verifiedFaces: [],
    });

    const { isScanning, status, detections, datetime, verifiedFaces } = scanState;

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


    const captureDeviceFrame = async () => {
        const video = videoRef.current;
        const canvas = document.getElementById("device-canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                canvas.toBlob(resolve, 'image/jpeg');
            });
        });
    };

    // const captureDeviceFrame = async () => {
    //     const imageSrc = videoRef.current.getScreenshot();
    //     const base64String = imageSrc.split(",")[1];

    //     const imageBlob = await base64ToBlob(base64String);

    //     return imageBlob;
    // };

    const handleScan = async () => {
        const newDate = new Date();

        try {
            const deviceImageBlob = await captureDeviceFrame();

            // const detectTaskId = await detectFaces(deviceImageBlob, newDate);
            // const detectedFaces = await checkDetectResults(detectTaskId);
            // const { recognizeTaskId, date } = await recognizeFaces(detectedFaces, newDate);
            // await checkRecognizeResults(recognizeTaskId, date);

            const recognizeTaskId = await recognizeFaces(deviceImageBlob, newDate);
            await checkRecognizeResults(recognizeTaskId);

        } catch (error) {
            handleToast(error.message, 'error');
        } finally {
            updateScanState({
                isScanning: false,
                status: null,
            }); // Users can now logout
        }
    };

    const recognizeFaces = async (deviceImgBlob, datetime) => {
        updateScanState({
            isScanning: true,
            status: SCAN_STATUS.DETECTING,
            detections: null,
            datetime: null,
        });

        const captureData = new FormData();
        captureData.append('capturedFrames', deviceImgBlob, toFilename(datetime) + "_dvcam.png");
        captureData.append('datetime', datetime);

        const response = await square_api.post('/face/recognize-faces', captureData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const jobId = response.data.job_id;
        return jobId;
    };

    const checkRecognizeResults = async (recognizeTaskId, timeout = 5000) => {
        if (!recognizeTaskId) return;
        const endTime = Date.now() + timeout;

        while (Date.now() < endTime) {
            try {
                const response = await square_api.post(`/face/task-result/${recognizeTaskId}`);

                if (response.data.state === "SUCCESS") {
                    const recognizeResults = response.data.result;

                    updateScanState({
                        verifiedFaces: [...verifiedFaces, ...recognizeResults],
                    });

                    break;
                }
                if (response.data.state === "FAILURE") {
                    throw new Error("Recognition task failed...");
                }
            } catch (error) {
                console.error(`Error checking recognize status ${recognizeTaskId}:`, error);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, TIMEOUT));
        }
    };

    // const recognizeFaces = async (faces, date) => {
    //     const formattedDate = toDisplayText(date);

    //     updateScanState({ status: SCAN_STATUS.RECOGNIZING });

    //     const payload = {
    //         faces: faces,
    //         datetime: formattedDate
    //     };

    //     const response = await square_api.post('/face/recognize-faces', JSON.stringify(payload), {
    //         headers: { 'Content-Type': 'application/json' },
    //     });

    //     const jobId = response.data.job_id;

    //     const res = {
    //         recognizeTaskId: jobId,
    //         date: date,
    //     }
    //     return res;
    // };


    // const checkRecognizeResults = async (recognizeTaskId, date) => {
    //     if (!recognizeTaskId) return;
    //     while (true) {
    //         try {
    //             const response = await square_api.post(`/face/task-result/${recognizeTaskId}`);

    //             if (response.data.state === "SUCCESS") {
    //                 const recognizeResults = response.data.result;

    //                 // const formattedDate = toDisplayText(date);

    //                 // const seenIds = new Set(verifiedFaces.map(face => face.identity || 'unknown'));
    //                 // const unseenIds = recognizeResults.filter(face => !seenIds.has(face.identity));

    //                 updateScanState({
    //                     verifiedFaces: [...verifiedFaces, ...recognizeResults],
    //                 });

    //                 if (!recognizeResults.some(face => face.identity)) {
    //                     throw new Error("No faces were recognized");
    //                 }

    //                 // handleToast(`${recognizeResults.filter(face => face.identity).length} face(s) were recognized`, 'info');

    //                 break;
    //             }
    //             if (response.data.state === "FAILURE") {
    //                 throw new Error("Recognition task failed...");
    //             }
    //         } catch (error) {
    //             console.error(`Error checking recognize status ${recognizeTaskId}:`, error);
    //             break;
    //         }
    //         await new Promise(resolve => setTimeout(resolve, TIMEOUT));
    //     }
    // };


    const value = useMemo(
        () => ({
            updateScanState,
            detectFaces,
            recognizeFaces,
            handleToast,
            isScanning,
            status,
            datetime,
            detections,
            verifiedFaces,
            SCAN_STATUS,
            checkDetectResults,
            checkRecognizeResults,
            getImageUrl,
            handleScan,
            videoRef
        }),
        [scanState]
    );
    return <RecognizeContext.Provider value={value}>{children}</RecognizeContext.Provider>;
};

export const useRecognize = () => {
    return useContext(RecognizeContext);
};