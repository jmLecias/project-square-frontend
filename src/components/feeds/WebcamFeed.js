import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useRecognize } from '../../hooks/useRecognize';

const WebcamFeed = ({ onDetectChange, videoRef }) => {
    const canvasRef = useRef(null);
    const { isScanning } = useRecognize();
    const [detected, setDetected] = useState(0);

    useEffect(() => {
        onDetectChange(detected);
    }, [detected, onDetectChange]);

    const loadModels = async () => {
        try {
            await faceapi.loadSsdMobilenetv1Model('/weights');
            console.log('SSD Mobilenet V1 model loaded successfully');
        } catch (error) {
            console.error('Error loading SSD Mobilenet V1 model:', error);
        }
    };

    const resizeCanvas = () => {
        if (videoRef.current && canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            console.log(`Canvas size: ${canvasRef.current.width}x${canvasRef.current.height}`);
        }
    };

    const startVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
                audio: false
            });
            videoRef.current.srcObject = stream;

            videoRef.current.onloadedmetadata = () => {
                resizeCanvas();
            };
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    const detectFaces = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        try {
            const detections = await faceapi.detectAllFaces(videoRef.current);
            if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
                console.warn("Invalid video dimensions. Skipping face detection.");
                return;
            }

            const resizedDetections = faceapi.resizeResults(detections, {
                width: canvasRef.current.width,
                height: canvasRef.current.height,
            });

            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            faceapi.draw.drawDetections(canvasRef.current, resizedDetections, {
                boxColor: 'red',
                lineWidth: 2
            });

            setDetected(detections.length);
        } catch (error) {
            console.error('Error during face detection:', error);
        }
    };

    useEffect(() => {
        let intervalId;

        const initializeFaceDetection = async () => {
            await loadModels();
            await startVideoStream();
            intervalId = setInterval(detectFaces, 1000);
        };

        initializeFaceDetection();
        // if (!isScanning) {
        //     initializeFaceDetection();
        // } else if (intervalId) {
        //     clearInterval(intervalId);
        // }

        return () => {
            clearInterval(intervalId);
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="video-feed">
            <video ref={videoRef} autoPlay playsInline muted />
            <canvas id="device-canvas" style={{ display: 'none' }}></canvas>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    );
};

export default WebcamFeed;