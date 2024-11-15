import React, { useEffect, useRef } from "react";

const RTSPStream = ({ streamUrl }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:300/api/stream?url=${streamUrl}`);
        const video = videoRef.current;
        const mediaSource = new MediaSource();
        let sourceBuffer;

        // When the MediaSource is ready, create the source buffer for video
        mediaSource.addEventListener("sourceopen", () => {
            sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');
        });

        // Set the MediaSource URL as the video source
        video.src = URL.createObjectURL(mediaSource);

        ws.onopen = () => {
            console.log("WebSocket connection established.");
        };

        ws.onmessage = (event) => {
            // Make sure we only append data if the sourceBuffer is available
            if (sourceBuffer && !sourceBuffer.updating) {
                sourceBuffer.appendBuffer(event.data);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => {
            // Clean up WebSocket and MediaSource when the component unmounts
            if (ws) {
                ws.close();
            }
            if (mediaSource) {
                mediaSource.endOfStream();
            }
        };
    }, [streamUrl]);

    return <video ref={videoRef} controls autoPlay />;
};

export default RTSPStream;
