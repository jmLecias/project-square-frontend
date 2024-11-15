import React from 'react';
import HlsFeed from '../components/feeds/HlsFeed';
import RtspFeed from '../components/feeds/RtspFeed';
import WebRtcFeed from '../components/feeds/WebRtcFeed';

// rtsp://CAPSTONE:@CAPSTONE2@192.168.254.104:554/live/ch00_0

const StreamTest = () => {

    return (
        <div className="main-container" >
            {/* <RtspFeed streamUrl={"rtsp://CAPSTONE:@CAPSTONE2@192.168.254.105:554/live/ch00_0"} /> */}
            {/* <WebRtcFeed /> */}
            {/* <HlsFeed streamUrl={"http://localhost:5000/stream"} /> */}
        </div>
    );
}

export default StreamTest;
