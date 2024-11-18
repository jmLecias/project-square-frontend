import React from 'react';
import { useRecognize } from '../../hooks/useRecognize';
import RecognizedItem from '../items/RecognizedItem';
import RecognizingLoadingItem from '../items/RecognizingLoadingItem';
import DetectingLoadingItem from '../items/DetectingLoadingItem';
import UnknownItem from '../items/UnknownItem';

const AttendanceList = () => {
    const { isScanning, detections, verifiedFaces } = useRecognize();

    const renderRecognized = () => {
        return verifiedFaces.slice().reverse().map((face) => {
            if (face.identity !== null) {
                return (
                    <RecognizedItem
                        key={face.datetime}
                        unique_key={face.identity}
                        detected={face.detected}
                        datetime={face.datetime}
                    />
                );
            } else {
                return (
                    <UnknownItem
                        key={face.datetime}
                        detected={face.detected}
                        datetime={face.datetime}
                    />
                );
            }
        });
    };

    const renderDetected = () => {
        return detections.map((face, index) => (
            <RecognizingLoadingItem key={index} detected={face.face_id} />
        ));
    };

    const renderList = () => {
        if (verifiedFaces.length === 0) {
            if (isScanning) {
                return !detections ? (
                    // First detection start, loading items
                    <>
                        <DetectingLoadingItem />
                        <DetectingLoadingItem />
                        <DetectingLoadingItem />
                    </>
                ) : (
                    // First recognition start, showing list of detected
                    <>
                        {renderDetected()}
                    </>
                );
            } else {
                // Initial state with no recognition or detection
                return (
                    <div className="w-100">
                        <span className="fs-6 opacity-50">
                            Make sure that faces are visible to the camera.
                        </span>
                    </div>
                );
            }
        } else {
            if (isScanning) {
                return !detections ? (
                    // Subsequent detection start, with recognized list below
                    <>
                        <DetectingLoadingItem />
                        {renderRecognized()}
                    </>
                ) : (
                    // Subsequent recognition start, detected list with recognized below
                    <>
                        {renderDetected()}
                        {renderRecognized()}
                    </>
                );
            } else {
                // Detection and recognition end, list of recognized and unknown items
                return <>{renderRecognized()}</>;
            }
        }
    };

    return <>{renderList()}</>;
};

export default AttendanceList;
