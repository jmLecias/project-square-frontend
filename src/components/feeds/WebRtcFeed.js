// WebRTCComponent.js
import React, { useEffect, useRef } from 'react';

function WebRtcFeed() {
    const ws = useRef(null); // WebSocket reference
    const pc = useRef(null); // PeerConnection reference

    // Initialize WebSocket and WebRTC connection on mount
    useEffect(() => {
        // Step 1: Connect to WebSocket signaling server
        ws.current = new WebSocket('ws://localhost:8765'); // Adjust the URL if needed

        ws.current.onopen = () => {
            console.log("Connected to WebSocket signaling server");
        };

        ws.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            console.log("Received message:", message);

            // Step 3: Handle incoming SDP offers/answers and ICE candidates
            if (message.type === "offer") {
                await pc.current.setRemoteDescription(new RTCSessionDescription(message));
                const answer = await pc.current.createAnswer();
                await pc.current.setLocalDescription(answer);
                ws.current.send(JSON.stringify(pc.current.localDescription));
            } else if (message.type === "answer") {
                await pc.current.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === "ice-candidate" && message.candidate) {
                await pc.current.addIceCandidate(new RTCIceCandidate(message.candidate));
            }
        };

        // Step 2: Initialize PeerConnection
        initializePeerConnection();

        return () => {
            // Cleanup WebSocket and PeerConnection on unmount
            if (ws.current) ws.current.close();
            if (pc.current) pc.current.close();
        };
    }, []);

    const initializePeerConnection = () => {
        pc.current = new RTCPeerConnection({
            iceServers: [
                { 
                    urls: "stun:stun.l.google.com:19302" 
                },
                // {
                //     urls: "relay1.expressturn.com:3478",  // TURN server URL
                //     username: "efCUNKFDLU0J2ZJIGA",           // TURN server username (if any)
                //     credential: "gL4nHvOiGy3YdwP8"  
                // }
            ] // STUN server
        });

        // Log ICE connection state changes
        pc.current.oniceconnectionstatechange = () => {
            console.log("ICE Connection State:", pc.current.iceConnectionState);
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                // Add video and audio tracks to the peer connection
                stream.getTracks().forEach(track => {
                    pc.current.addTrack(track, stream);
                });

                // Now, create an offer, which will include the media sections
                return pc.current.createOffer();
            })

        // Step 4: Send ICE candidates to the server
        pc.current.onicecandidate = (event) => {
            if (event.candidate) {
                ws.current.send(JSON.stringify({
                    type: "ice-candidate",
                    candidate: event.candidate
                }));
            }
        };

        // Handle incoming media streams (placeholder, to be implemented with RTSP stream in step 3)
        pc.current.ontrack = (event) => {
            const [stream] = event.streams;
            document.getElementById("video").srcObject = stream;
        };
    };

    // Step 5: Create SDP offer when initiating connection
    const createOffer = async () => {
        const offer = await pc.current.createOffer();
        console.log(offer);
        await pc.current.setLocalDescription(offer);
        ws.current.send(JSON.stringify(offer));
    };

    return (
        <div>
            <h2>WebRTC with Python Signaling Server</h2>
            <video id="video" autoPlay playsInline></video>
            <button onClick={createOffer}>Start Connection</button>
        </div>
    );
}

export default WebRtcFeed;
