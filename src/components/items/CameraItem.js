import React, { useRef, useCallback, useState, useEffect } from 'react';
import { streamerBaseUrl } from '../../api/square_api';
import { Popover, Whisper, Button, Dropdown } from 'rsuite';

import { useFeeds } from '../../hooks/useFeeds';
import { useLocation } from '../../hooks/useLocation';

const CameraItem = ({ camera }) => {
    const ref = useRef();
    const {
        capturedCameras,
        handleCameraClick,
        currentCamera,
        feeds,
        setFeeds,
        handleToast,
        deleteCamera,
        toggleCameraModal,
        setEditCamera
    } = useFeeds();
    const {
        triggerReloadLocation
    } = useLocation();

    const [bandwidth, setBandwidth] = useState(null);

    useEffect(() => {
        if (camera) {
            const eventSource = new EventSource(streamerBaseUrl + '/bandwidth_usage/' + camera.id);

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
    }, [camera]);

    const handleSelectMenu = useCallback(
        (eventKey, event) => {
            if (eventKey >= 1 && eventKey <= 9) {
                const newFeeds = [...feeds];
                newFeeds[eventKey - 1] = currentCamera;
                setFeeds(newFeeds);
            }
            if (eventKey === 10) { // Disabling camera stream on feed
                const newFeeds = [...feeds];
                const index = feeds.findIndex(feed => feed === currentCamera);
                newFeeds[index] = null;
                setFeeds(newFeeds);
            }

            if (eventKey === 11) {  // Editing camera details
                setEditCamera(camera);
                toggleCameraModal();
            }

            if (eventKey === 12) { // Deleting camera details
                deleteCamera(camera.id)
                    .then((res) => {
                        handleToast(res.message, 'info')
                    })
                    .catch((e) => {
                        console.log("Error while deleting camera: ", e);
                    })
                    .finally(() => {
                        triggerReloadLocation(); // Reloads the location page
                    })
            }

            ref.current.close();
        },
        [currentCamera, feeds, ref]
    );

    const isDisabled = (capturedCameras) ? !capturedCameras.includes(camera.id) : null;
    const isUnavailable = capturedCameras.length > 0 && !capturedCameras.includes(camera.id);
    const isViewing = feeds.includes(camera.id);

    const MenuPopover = React.forwardRef(({ camera, isDisabled, isViewing, onSelect, ...rest }, ref) => (
        <Popover ref={ref} {...rest} full>
            <Dropdown.Menu onSelect={onSelect} style={{ width: '150px' }}>
                <Dropdown.Item>
                    <div className='fw-bold text-truncate' title={camera.rtsp_url}>{camera.name}</div>
                </Dropdown.Item>
                <Dropdown.Separator />
                {(!isDisabled && !isViewing) && (
                    <>
                        <Dropdown.Item eventKey={1} disabled={feeds[0] !== null}>View on slot 1</Dropdown.Item>
                        <Dropdown.Item eventKey={2} disabled={feeds[1] !== null}>View on slot 2</Dropdown.Item>
                        <Dropdown.Item eventKey={3} disabled={feeds[2] !== null}>View on slot 3</Dropdown.Item>
                        <Dropdown.Item eventKey={4} disabled={feeds[3] !== null}>View on slot 4</Dropdown.Item>
                        <Dropdown.Item eventKey={5} disabled={feeds[4] !== null}>View on slot 5</Dropdown.Item>
                        <Dropdown.Item eventKey={6} disabled={feeds[5] !== null}>View on slot 6</Dropdown.Item>
                        <Dropdown.Item eventKey={7} disabled={feeds[6] !== null}>View on slot 7</Dropdown.Item>
                        <Dropdown.Item eventKey={8} disabled={feeds[7] !== null}>View on slot 8</Dropdown.Item>
                        <Dropdown.Item eventKey={9} disabled={feeds[8] !== null}>View on slot 9</Dropdown.Item>
                    </>
                )}
                {(isUnavailable && (
                    <Dropdown.Item>Unavailable</Dropdown.Item>
                ))}
                {(isViewing && (
                    <Dropdown.Item eventKey={10}>Disable</Dropdown.Item>
                ))}
                <Dropdown.Separator />
                <Dropdown.Item eventKey={11}>Edit</Dropdown.Item>
                <Dropdown.Item eventKey={12}>
                    <div style={{ color: 'red' }}>Delete</div>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    ));

    return (
        <Whisper
            placement="topStart"
            controlId="control-id-with-dropdown"
            trigger="click"
            ref={ref}
            speaker={<MenuPopover onSelect={handleSelectMenu} camera={camera} isDisabled={isDisabled} isViewing={isViewing} />}
        >
            <div
                className='camera-item'
                onClick={() => { handleCameraClick(camera.id) }}
                style={{
                    opacity: `${isDisabled || isViewing ? '0.6' : '1'}`,
                    cursor: `${isDisabled || isViewing ? 'not-allowed' : 'pointer'}`,
                    border: `${currentCamera === camera.id ? '2px solid var(--primary-color-light)' : ''}`,
                }}
                title={
                    isDisabled ? 'Initialize first' : isViewing ? 'Already viewing' : 'Choose slot to stream'
                }
            >
                <div className='d-flex align-items-center'>
                    <div >
                        <div
                            className='fw-bold text-truncate'
                        >{camera.name}</div>

                        {(bandwidth >= 0 && !isDisabled) && (
                            <div
                                className='opacity-75 text-truncate'
                                style={{ fontSize: '12px' }}
                            >
                                {/* bandwidth in Bits per second Divide by 1,000,000 for Megabits per second */}
                                {(bandwidth / 1000000).toFixed(2)} Mbps
                            </div>
                        )}
                        {isDisabled && (
                            <div
                                className='opacity-75 text-truncate'
                                style={{ fontSize: '12px' }}
                            >
                                Not Initialized
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Whisper>
    )
}

export default CameraItem;