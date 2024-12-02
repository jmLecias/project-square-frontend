import React, { useEffect, useState, useRef } from "react";
import { Loader } from 'rsuite';

import RecognizingLoadingItem from "../../components/items/RecognizingLoadingItem";
import RecognizedItem from "../../components/items/RecognizedItem";
import UnknownItem from "../../components/items/UnknownItem";
import DetectingLoadingItem from "../../components/items/DetectingLoadingItem";

import { useFeeds } from "../../hooks/useFeeds";
import { useRecognize } from "../../hooks/useRecognize";


const LocationDetectionList = ({ detections, onScrollBottom }) => {
    const { gridDims } = useFeeds();
    const { isScanning } = useRecognize();
    const listRef = useRef(null);

    const handleScroll = () => {
        const element = listRef.current;
        if (element) {
            const isScrolledToBottom =
                Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1;

            if (isScrolledToBottom) {
                console.log("Scrolled to the bottom!");
                // onScrollBottom();
            }
        }
    };

    const renderDetections = () => {
        return detections.slice().reverse().map((detection) => {
            if (detection.status === "Detected") {
                return <RecognizingLoadingItem key={detection.id} id={detection.id} />;
            }
            if (detection.status === "Recognized") {
                return <RecognizedItem key={detection.id} id={detection.id} />;
            }
            if (detection.status === "Unknown") {
                return <UnknownItem key={detection.id} id={detection.id} />;
            }
            return null;
        });
    };

    return (
        <div
            ref={listRef}
            onScroll={handleScroll}
            className='list-container custom-scrollbar-hidden' 
            style={{ height: `${gridDims.height}px` }}
        >
            <div className="list-container-header">
                <div className='fw-bold unselectable mb-2'>Detections Today</div>
            </div>
            <div style={{ padding: '1rem' }}>
                {isScanning && (<DetectingLoadingItem />)}
                {(detections.length === 0 && !isScanning) && (
                    <div className="w-100">
                        <span className="fs-6 opacity-50">
                            Make sure that faces are visible to the camera.
                        </span>
                    </div>
                )}
                {renderDetections()}
            </div>
            <div className="list-container-footer-fade" />
        </div>
    );
};

export default LocationDetectionList;
