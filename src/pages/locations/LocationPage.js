import React, { useEffect, useState } from 'react';
import { squareApiBaseUrl } from '../../api/square_api';
import { io } from 'socket.io-client';

import MainContainer from '../../components/containers/MainContainer';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';
import ContentContainer from '../../components/containers/ContentContainer';

import WebcamFeed from '../../components/feeds/WebcamFeed';
import RtspFeed from '../../components/feeds/RtspFeed';

import FeedsActionBar from '../../components/bars/FeedsActionBar';
import CameraItem from '../../components/items/CameraItem';
import LocationDetectionList from './LocatonDetectionList';

import { useParams } from 'react-router-dom';
import { useRecognize } from '../../hooks/useRecognize';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useFeeds } from '../../hooks/useFeeds';
import { useLocation } from '../../hooks/useLocation';


const CAMERAS = [
    { name: "Camera 1", ip: "192.168.254.106" },
    { name: "Camera 2", ip: "192.168.254.107" },
    { name: "Camera 3", ip: "192.168.254.108" },
    { name: "Camera 1", ip: "192.168.254.106" },
    { name: "Camera 2", ip: "192.168.254.107" },
    { name: "Camera 3", ip: "192.168.254.108" },
];

const LocationPage = () => {
    const { id } = useParams();
    let isFetching = false;

    const [group, setGroup] = useState(null);
    const [location, setLocation] = useState(null);
    // const [cameras, setCameras] = useState(CAMERAS);
    const [detections, setDetections] = useState([]);

    const { setBreadcrumbs, clearBreadcrumbs } = useBreadcrumbs();
    const {
        // isScanning,
        // handleScan,
        handleToast,
        videoRef
    } = useRecognize();
    const {
        GRIDS,
        grid,
        gridDims,
        updateState,
        renderEmptySlots
    } = useFeeds();
    const {
        reload,
        getLocationCameras
    } = useLocation();



    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getLocationCameras(id).then((res) => {
                setGroup(res.group);
                setLocation(res.location);
                // setCameras(res.cameras);
                setDetections(res.detections);
                handleBreadcrumbs(res.group, res.location);
                isFetching = false;
            }).catch((e) => {
                console.log("Error while getting location cameras data: " + e);
                isFetching = false;
            });
        }

        return () => {
            setGroup(null);
            setLocation(null);
            // setCameras([]);
            setDetections([]);
        };
    }, [id, reload]);


    useEffect(() => {
        if (location) {
            const eventSource = new EventSource(squareApiBaseUrl + '/face/events');

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                // Check if the detection is for the current location
                const isRelevantLocation = data.location_id === location.id.toString();
                if (!isRelevantLocation) return;

                setDetections((prevDetections) => {
                    const detectionId = parseInt(data.id); // Ensure ID is a number
                    const detectionExists = prevDetections.some((d) => d.id === detectionId);

                    if (detectionExists) {
                        // Update the existing detection with new data
                        return prevDetections.map((d) =>
                            d.id === detectionId ? { ...d, ...data } : d
                        );
                    }

                    // Add the new detection
                    return [...prevDetections, { ...data, id: detectionId }];
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
    }, [location]);

    useEffect(() => {
        let observer = null;
        const feedsGrid = document.querySelector('.feeds-grid');

        if (feedsGrid) {
            const observer = new ResizeObserver(entries => {
                requestAnimationFrame(() => {
                    for (let entry of entries) {
                        const height = entry.contentRect.height;
                        const width = entry.contentRect.width;
                        updateState({
                            gridDims: {
                                width: width,
                                height: height
                            }
                        });
                    }
                });
            });
            observer.observe(feedsGrid);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    const handleBreadcrumbs = (group, location) => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Groups", link: "/groups" },
            { label: group.name, link: "/groups/" + group.id },
            { label: location.name, link: "/locations/" + location.id },
        ]);
    };


    // const handleDetectChange = (detected) => {
    //     // Only starts scan when detections changes and greater than 0
    //     // Only starts when a previous scan ends
    //     // To prevent loop call to BACKEND
    //     if (
    //         detected > 0 && !isScanning
    //     ) {
    //         // handleScan(); // Start detection and recognition
    //     }
    // };

    const renderCameras = () => {
        return (
            CAMERAS.map((camera, index) => {
                return (
                    <CameraItem
                        key={index}
                        camera={camera}
                    />
                )
            })
        );
    };

    return (
        <MainContainer>
            <ContentContainer
                header={<MainBreadcrumbs />}
            >
                <div className='location-container'>
                    <div className='location-live-area custom-scrollbar-hidden' >
                        <div className={`feeds-grid ${GRIDS[grid].name}`} style={{ marginBottom: '1rem' }}>
                            <WebcamFeed
                                videoRef={videoRef}
                            />
                            {/* <RtspFeed/> */}
                            {renderEmptySlots()}
                        </div>
                        <FeedsActionBar location={location} group={group} />
                    </div>

                    <div className='location-cameras-area'>
                        <div className='fw-bold unselectable mb-3'>Cameras</div>
                        <div className='cameras-grid-display'>
                            {renderCameras()}
                        </div>
                    </div>

                    <div className='location-list-area custom-scrollbar-hidden'>
                        <LocationDetectionList detections={detections} />
                    </div>
                </div>

            </ContentContainer>
        </MainContainer>
    );
}

export default LocationPage;
