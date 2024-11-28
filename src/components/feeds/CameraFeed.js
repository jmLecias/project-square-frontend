import React from "react";

import { useFeeds } from "../../hooks/useFeeds";

const CameraFeed = ({feed, index}) => {

    const {
        grid,
        currentCamera
    } = useFeeds();

    const isVisible = ((grid+1) * (grid+1) >= (index+1))? '' : 'none';
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
                <img src={"http://localhost:5000/video_feed/"+feed} />
            )}
        </div>
    );
};

export default CameraFeed;
