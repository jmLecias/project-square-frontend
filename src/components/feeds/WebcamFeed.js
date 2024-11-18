import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamFeed = ({ videoRef }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let intervalId;

        // const script = document.createElement('script');
        // script.src = '/face-api.min.js';
        // script.async = true;

        // script.onload = async () => {
        //     console.log('face-api.js loaded');

        //     const resizeCanvas = () => {
        //         if (videoRef.current && canvasRef.current) {
        //             canvasRef.current.width = videoRef.current.videoWidth;
        //             canvasRef.current.height = videoRef.current.videoHeight;
        //             console.log(`Canvas size: ${canvasRef.current.width}x${canvasRef.current.height}`);
        //         }
        //     };

        //     // Run the face detection logic
        //     const runDetection = async () => {
        //         const videoFeedEl = videoRef.current;
        //         console.log("Video element: " + videoFeedEl);

        //         // Set up canvas size and position
        //         const canvas = canvasRef.current;
        //         canvas.style.left = `${videoFeedEl.offsetLeft}px`;
        //         canvas.style.top = `${videoFeedEl.offsetTop}px`;
        //         canvas.width = videoFeedEl.width;
        //         canvas.height = videoFeedEl.height;

        //         console.log("Starting detection...")
        //         // Start face detection loop
        //         intervalId = setInterval(async () => {
        //             if (videoFeedEl) {
        //                 console.log("Detecting...")
        //                 // Detect faces in the video feed
        //                 let detections = await faceapi.detectAllFaces(videoFeedEl)

        //                 const ctx = canvas.getContext('2d');
        //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
        //                 ctx.strokeStyle = 'blue';
        //                 ctx.lineWidth = 2;

        //                 // Resize the detected faces to match the video feed
        //                 detections = faceapi.resizeResults(detections, {
        //                     width: 640,
        //                     height: 480,
        //                 });

        //                 detections.forEach(detection => {
        //                     const { x, y, width, height } = detection.box;
        //                     ctx.strokeRect(x, y, width, height);  // Draw only the bounding box without confidence
        //                 });
        //             }
        //         }, 1000); // Repeat detection every 200ms
        //     };


        //     // await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        // };

        // script.onerror = (error) => {
        //     console.error('Failed to load face-api.js:', error);
        // };

        // document.body.appendChild(script);

        const startVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                    audio: false
                });
                videoRef.current.srcObject = stream

                videoRef.current.onloadedmetadata = () => {
                    // resizeCanvas();
                    // runDetection(); // TEst
                };
                console.log("Video stream: " + stream);
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        startVideoStream();  // Wait for stream to start

        return () => {
            clearInterval(intervalId);
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            // document.body.removeChild(script);
        };
    }, [videoRef]);

    return (
        <div className="video-feed" style={{ position: 'relative' }}>
            <canvas id="device-canvas" style={{ display: 'none' }}></canvas>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, transform: 'scaleX(-1)' }} />
            <video ref={videoRef} id="video-feed" autoPlay playsInline muted style={{ objectFit: 'cover', transform: 'scaleX(-1)' }} />
        </div>
    );
};

export default WebcamFeed;
