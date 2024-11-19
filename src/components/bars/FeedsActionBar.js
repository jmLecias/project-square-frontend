import React from 'react';

import { TbCaptureFilled } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";

import { useFeeds } from '../../hooks/useFeeds';
import { useRecognize } from '../../hooks/useRecognize';

const FeedsActionBar = ({location, group}) => {
    const {
        grid,
        GRIDS,
        onGridChangeClick,
        ICON_SIZE
    } = useFeeds();
    const {
        handleScan,
    } = useRecognize();

    return (
        <div className='action-bar-container'>
            <div
                className='action-icons'
                title='Pause'
                onClick={() => {}}
            >
                <FaRegCirclePause size={ICON_SIZE + 2} />
            </div>
            <div
                className='action-icons'
                title='Detect'
                onClick={() => {
                    handleScan(location.id, group.id);
                }}
            >
                <TbCaptureFilled size={ICON_SIZE + 2} />
            </div>
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
