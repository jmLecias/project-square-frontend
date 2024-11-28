import React from 'react';

import { TbCaptureFilled } from "react-icons/tb";
import { FaRegPlayCircle } from "react-icons/fa";

import { useFeeds } from '../../hooks/useFeeds';
import { useRecognize } from '../../hooks/useRecognize';

const FeedsActionBar = ({ location, group, cameras }) => {
    const {
        grid,
        GRIDS,
        onGridChangeClick,
        ICON_SIZE,
        streamCameras,
        handleToast
    } = useFeeds();
    const {
        handleScan,
    } = useRecognize();

    return (
        <div className='action-bar-container'>
            <div
                className='action-icons'
                title='Initialize Cameras'
                onClick={() => {
                    streamCameras(cameras)
                        .then((res) => {
                            handleToast(res.message, 'info');
                        })
                        .catch((e) => {
                            handleToast("Error while initializing cameras. \n Make sure to run the streamer app locally!", 'error');
                        })
                }}
            >
                <FaRegPlayCircle size={ICON_SIZE + 2} />
            </div>
            {/* <div
                className='action-icons'
                title='Detect'
                onClick={() => {
                    // handleScan(location.id, group.id);
                }}
            >
                <TbCaptureFilled size={ICON_SIZE + 2} />
            </div> */}
            <div
                className='action-icons'
                title='Grid Layout'
                onClick={onGridChangeClick}
            >
                {GRIDS[grid].icon}
            </div>
        </div>
    );
}

export default FeedsActionBar;
