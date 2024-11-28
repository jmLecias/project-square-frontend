import { createContext, useContext, useMemo, useState, useEffect } from "react";

import { FaSquare } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";

import { toast } from 'react-toastify';

import { square_stream_api } from "../api/square_api";

const FeedsContext = createContext();

const ICON_SIZE = 25;

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

const GRIDS = [
    { name: "one", icon: <FaSquare size={ICON_SIZE} /> },
    { name: "two", icon: <IoGrid size={ICON_SIZE} /> },
    { name: "three", icon: <BsGrid3X3GapFill size={ICON_SIZE} /> },
];

const BUTTON_TEXT = {
    ADD: 'Add',
    ADDING: 'Adding...',
};

export const FeedsProvider = ({ children }) => {

    const [state, setState] = useState({
        gridDims: { width: 0, height: 0 },
        grid: 0,
        inputName: '',
        rtspUrl: '',
        cameraType: null,
    });

    const [feeds, setFeeds] = useState([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);

    const [showCameraModal, setShowCameraModal] = useState(false);
    const [capturedCameras, setCapturedCameras] = useState([]);
    const [currentCamera, setCurrentCamera] = useState(null);


    const { grid, gridDims } = state;
    const { inputName, rtspUrl, cameraType } = state;

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            inputErrors: {
                ...prevState.inputErrors,
                [field]: '',
            },
        }));
    };

    const onGridChangeClick = () => {
        if (grid === GRIDS.length - 1) {
            updateState({ grid: 0 });
        } else {
            updateState({ grid: grid + 1 });
        }
    };

    // rtsp_urls = {
    //     "camera_1": "rtsp://CAPSTONE:@CAPSTONE2@192.168.1.7:554/live/ch00_0",
    //     "camera_2": "rtsp://CAPSTONE:@CAPSTONE2@192.168.1.8:554/live/ch00_0"
    // }

    const streamCameras = async (cameras) => {
        try {
            const payload = {
                cameras: cameras.map((camera) => ({
                    camera_id: camera.id,
                    rtsp_url: camera.rtsp_url,
                    location_id: camera.location_id,
                    group_id: camera.group_id,
                    camera_type_id: camera.type_id,
                })),
            };

            const response = await square_stream_api.post('/stream_cameras', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.cameras.length > 0) {
                setCapturedCameras(response.data.cameras);
            }

            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const toggleCameraModal = () => setShowCameraModal(!showCameraModal);
    const handleCameraClick = (index) => setCurrentCamera(index);

    useEffect(() => {
        console.log(state);
        console.log(feeds);
    }, [state, feeds]);

    const value = useMemo(
        () => ({
            gridDims,
            grid,
            inputName,
            rtspUrl,
            cameraType,
            updateState,
            handleToast,
            handleChange,
            GRIDS,
            ICON_SIZE,
            onGridChangeClick,
            feeds,
            setFeeds,
            streamCameras,
            toggleCameraModal,
            showCameraModal,
            BUTTON_TEXT,
            capturedCameras,
            setCapturedCameras,
            currentCamera,
            handleCameraClick
        }),
        [state, feeds, showCameraModal, capturedCameras, currentCamera]
    );
    return <FeedsContext.Provider value={value}>{children}</FeedsContext.Provider>;
};

export const useFeeds = () => {
    return useContext(FeedsContext);
};