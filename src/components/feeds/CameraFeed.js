import React, { useState, useEffect } from "react";
import { streamerBaseUrl } from '../../api/square_api';

import RealtimeLineGraph from "../graphs/RealtimeLineGraph";

import { useFeeds } from "../../hooks/useFeeds";

const CameraFeed = ({ feed, index }) => {

    const {
        grid,
        currentCamera
    } = useFeeds();

    const [bandwidth, setBandwidth] = useState(null);
    const [graphData, setGraphData] = useState({
        timestamps: [],
        data: []
    });

    useEffect(() => {
        if (feed) {
            const eventSource = new EventSource(streamerBaseUrl + '/bandwidth_usage/' + feed);

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data >= 0) {
                    setBandwidth(parseFloat(data));
                }

                const currentTime = new Date().toLocaleTimeString(); // Get current time as hh:mm:ss

                setGraphData((prevData) => {
                    const updatedTimestamps = [...prevData.timestamps, currentTime];
                    const updatedData = [...prevData.data, (data / 1000000).toFixed(2)];

                    // Keep only the last 10 data points (or any limit you want)
                    const maxPoints = 60;
                    return {
                        timestamps: updatedTimestamps.slice(-maxPoints),
                        data: updatedData.slice(-maxPoints),
                    };
                });
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
                    className="fs-5 fw-b feed-bandwidth"
                >
                    {/* bandwidth in Bits per second Divide by 1,000,000 for Megabits per second */}
                    {(bandwidth / 1000000).toFixed(2)} Mbps
                </div>
            )}
            {(graphData.data.length !== 0) && (
                // CSS HERE
                <div 
                    className="fs-5 fw-b w-100 h-75 feed-chart"
                >
                    <RealtimeLineGraph data={graphData} />
                </div>
            )}
        </div>
    );
};

export default CameraFeed;
