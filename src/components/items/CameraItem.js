import React, { useRef, useCallback } from 'react';
import { Popover, Whisper, Button, Dropdown } from 'rsuite';

import { useFeeds } from '../../hooks/useFeeds';

const CameraItem = ({ camera }) => {
    const ref = useRef();
    const { capturedCameras, handleCameraClick, currentCamera, feeds, setFeeds } = useFeeds();

    const handleSelectMenu = useCallback(
        (eventKey, event) => {
            if (eventKey >= 1 && eventKey <= 9) {
                const newFeeds = [...feeds];
                newFeeds[eventKey - 1] = currentCamera;
                setFeeds(newFeeds);
            }
            if (eventKey === 10) {
                const newFeeds = [...feeds];
                const index = feeds.findIndex(feed => feed === currentCamera);
                newFeeds[index] = null;
                setFeeds(newFeeds);
            }

            ref.current.close();
        },
        [currentCamera, feeds, ref]
    );

    const isDisabled = !capturedCameras.includes(camera.id);
    const isViewing = feeds.includes(camera.id);

    const MenuPopover = React.forwardRef(({ camera, isDisabled, isViewing, onSelect, ...rest }, ref) => (
        <Popover ref={ref} {...rest} full>
            <Dropdown.Menu onSelect={onSelect} style={{ width: '150px' }}>
                <Dropdown.Item>
                    <div className='fw-bold text-truncate'>{camera.name}</div>
                    <div className='small mt-1'>{camera.type}</div>
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

                        <div
                            className='opacity-75 text-truncate'
                            style={{ fontSize: '12px' }}
                        >{camera.type}</div>
                    </div>
                </div>
            </div>
        </Whisper>
    )
}

export default CameraItem;