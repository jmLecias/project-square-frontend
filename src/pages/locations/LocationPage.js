import React, { useEffect, useState } from 'react';
import { squareApiBaseUrl } from '../../api/square_api';
import { io } from 'socket.io-client';

import MainContainer from '../../components/containers/MainContainer';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';
import ContentContainer from '../../components/containers/ContentContainer';

import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import CameraFeed from '../../components/feeds/CameraFeed';

import FeedsActionBar from '../../components/bars/FeedsActionBar';
import CameraItem from '../../components/items/CameraItem';
import LocationDetectionList from './LocatonDetectionList';
import SectionHeader from './../../components/headers/SectionHeader';

import CameraModal from '../../components/modals/CameraModal';
import LocationModal from '../../components/modals/LocationModal';

import { useParams } from 'react-router-dom';
import { useRecognize } from '../../hooks/useRecognize';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useFeeds } from '../../hooks/useFeeds';
import { useLocation } from '../../hooks/useLocation';


const CAMERAS = [
    { name: "Camera 1", ip: "192.168.254.106" },
    { name: "Camera 2", ip: "192.168.254.107" },
];

const LocationPage = () => {
    const { id } = useParams();
    let isFetching = false;

    const [group, setGroup] = useState(null);
    const [location, setLocation] = useState(null);
    const [cameras, setCameras] = useState([]);
    const [detections, setDetections] = useState([]);

    const [detectionsPage, setDetectionsPage] = useState(1);
    const [isFetchingDetections, setIsFetchingDetections] = useState(false);

    const { setBreadcrumbs, clearBreadcrumbs } = useBreadcrumbs();
    const {
        // isScanning,
        // videoRef,
        isScanningOff,
        handleToast
    } = useRecognize();
    const {
        GRIDS,
        grid,
        updateState,
        feeds,
        toggleCameraModal,
        showCameraModal,
        editCamera
    } = useFeeds();
    const {
        reload,
        getLocationCameras,
        getLocationDetections,
        toggleCreateLocation,
        showCreateLocation,
        editLocation,
        setEditLocation,
    } = useLocation();

    const fetchDetections = async (pageNumber) => {
        setIsFetchingDetections(true);

        getLocationDetections(id, pageNumber).then((res) => {
            if (pageNumber === 1) {
                setDetections(res.detections);
            } else {
                setDetections((prev) => [...prev, ...res.detections]);
            }
            setDetectionsPage(pageNumber);
        }).catch((e) => {
            console.log("Error while getting location detection" + e);
        }).finally(() => {
            setIsFetchingDetections(false);
        })
    };

    const fetchMoreDetections = async () => {
        const nextPage = detectionsPage + 1;
        await fetchDetections(nextPage);
    };

    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getLocationCameras(id).then((res) => {
                setGroup(res.group);
                setLocation(res.location);
                setCameras(res.cameras);
                setDetections(res.detections);
                handleBreadcrumbs(res.group, res.location);
                isFetching = false;

                // Initial face detections
                // fetchDetections(1);
            }).catch((e) => {
                console.log("Error while getting location cameras data: " + e);
                isFetching = false;
            });
        }

        return () => {
            setGroup(null);
            setLocation(null);
            setCameras([]);
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

                if (data.id) {
                    setDetections((prevDetections) => {
                        const detectionId = parseInt(data.id);
                        const detectionExists = prevDetections.some((d) => d.id === detectionId);

                        if (detectionExists) {
                            return prevDetections.map((d) =>
                                d.id === detectionId ? { ...d, ...data } : d
                            );
                        }

                        return [...prevDetections, { ...data, id: detectionId }];
                    });
                } else {
                    isScanningOff(); // Stop scanning animation, when no faces detected
                    handleToast('No faces were detected!', 'error')
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

    const handleEditLocationClick = () => {
        setEditLocation(location);
        toggleCreateLocation();
    }

    const renderCameras = () => {
        return (
            cameras.map((camera, index) => {
                return (
                    <CameraItem
                        key={index}
                        camera={camera}
                    />
                )
            })
        );
    };

    const renderFeeds = () => {
        return (
            feeds.map((feed, index) => {
                return (
                    <CameraFeed
                        key={index}
                        index={index}
                        feed={feed}
                    />
                )
            })
        );
    };

    return (
        <MainContainer>
            <LocationModal
                show={showCreateLocation}
                onClose={toggleCreateLocation}
                group={group}
                location={editLocation}
            />

            <CameraModal
                show={showCameraModal}
                onClose={toggleCameraModal}
                camera={editCamera}
                location={location}
            />

            <ContentContainer
                header={<MainBreadcrumbs />}
            >
                <div className='location-container'>
                    <div className='location-live-area custom-scrollbar-hidden' >
                        <div className={`feeds-grid ${GRIDS[grid].name}`} style={{ marginBottom: '1rem' }}>
                            {renderFeeds()}
                        </div>
                        <FeedsActionBar location={location} group={group} cameras={cameras} />
                    </div>

                    <div className='location-cameras-area'>
                        <SectionHeader
                            title={"Cameras"}
                            actions={
                                <>
                                    <button
                                        className='main-button'
                                        onClick={toggleCameraModal}
                                        style={{ padding: '8px 15px' }}
                                    >
                                        <AiOutlineVideoCameraAdd className='me-2' size={20} />
                                        Add Camera
                                    </button>
                                </>
                            }
                        />
                        <div className='cameras-grid-display'>
                            {renderCameras()}
                            {cameras.length === 0 && (
                                <div>No cameras added yet</div>
                            )}
                        </div>
                    </div>

                    <div className='location-list-area custom-scrollbar-hidden'>
                        <LocationDetectionList
                            detections={detections}
                            onScrollBottom={() => fetchMoreDetections()}
                        />
                        <div 
                            className='location-edit-container'
                            onClick={handleEditLocationClick}
                        >   
                            <IoSettingsSharp size={25} className='me-2'/>
                            Location Settings
                            <FaChevronRight className="float-end opacity-50" size={20} />
                        </div>
                    </div>
                </div>

            </ContentContainer>
        </MainContainer>
    );
}

export default LocationPage;
