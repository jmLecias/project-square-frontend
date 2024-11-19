import React, { useEffect, useState } from "react";

import AttendanceList from "../../components/lists/AttendanceList";
import RecognizingLoadingItem from "../../components/items/RecognizingLoadingItem";
import RecognizedItem from "../../components/items/RecognizedItem";
import UnknownItem from "../../components/items/UnknownItem";
import DetectingLoadingItem from "../../components/items/DetectingLoadingItem";

import { useFeeds } from "../../hooks/useFeeds";
import { useRecognize } from "../../hooks/useRecognize";


const LocationDetectionList = ({ detections }) => {
    const { gridDims } = useFeeds();
    const { isScanning } = useRecognize();

    const DetectionTypes = ({ type }) => {
        return (
            <div className="detection-type">
                {type}
            </div>
        )
    }

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
        <div className='list-container custom-scrollbar-hidden' style={{ height: `${gridDims.height}px` }}>
            <div className="list-container-header">
                <div className='fw-bold unselectable mb-2'>Detections</div>
                <div className="detection-types-flex">
                    <DetectionTypes type="All" />
                    <DetectionTypes type="Inbound" />
                    <DetectionTypes type="Outbound" />
                    <DetectionTypes type="Unknown" />
                </div>
            </div>
            <div style={{ padding: '1rem' }}>
                {isScanning && (<DetectingLoadingItem />)}
                {renderDetections()}
            </div>
            <div className="list-container-footer-fade" />
        </div>
    );
};

export default LocationDetectionList;
