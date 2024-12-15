import React, { useState, useEffect } from "react";
import { streamerBaseUrl } from '../../api/square_api';

import { useFeeds } from "../../hooks/useFeeds";

const CameraFeed = ({ feed, index }) => {

    const {
        grid,
        currentCamera
    } = useFeeds();

    const [bandwidth, setBandwidth] = useState(null);

    useEffect(() => {
        if (feed) {
            const eventSource = new EventSource(streamerBaseUrl + '/bandwidth_usage/' + feed);

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data >= 0) {
                    setBandwidth(parseFloat(data));
                }
            };

            eventSource.onerror = () => {
                console.error("SSE Connection failed");
                eventSource.close();
            };

            return () => {
                eventSource.close()
            };
        }
    }, [feed]);

    const isVisible = ((grid + 1) * (grid + 1) >= (index + 1)) ? '' : 'none';
    return (
        <div
            className="video-feed"
            style={{
                fontSize: '12px',
                display: `${isVisible}`,
                border: `${currentCamera === feed ? '2px solid var(--primary-color-light)' : ''}`,
            }}
        >
            {!feed && (
                <div>No camera</div>
            )}
            {feed && (
                <img src={"http://localhost:5000/video_feed/" + feed} />
            )}
            {feed && (
                <div
                    style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                >
                    {/* bandwidth in Bits per second Divide by 1,000,000 for Megabits per second */}
                    {(bandwidth / 1000000).toFixed(2)} Mbps
                </div>
            )}
        </div>
    );
};

export default CameraFeed;
