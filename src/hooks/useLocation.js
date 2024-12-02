import { createContext, useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

const LocationContext = createContext();

const BUTTON_TEXT = {
    CREATE: 'Create',
    CREATING: 'Creating...',
};

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const LocationProvider = ({ children }) => {

    const [reload, setReload] = useState(0);

    const [state, setState] = useState({
        inputName: null,
        inputErrors: {
            inputName: ''
        },
        showCreateLocation: false,
    });


    const { inputName, inputErrors } = state;
    const { showCreateLocation } = state;


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

    const getGroupLocations = async (group_id) => {
        const response = await square_api.get(`/groups/group-locations/${group_id}`);
        const freshGroupLocations = response.data;

        return freshGroupLocations;
    };

    const getLocationCameras = async (location_id) => {
        const response = await square_api.get(`/locations/location-cameras/${location_id}`);
        const freshLocationCameras = response.data;

        return freshLocationCameras;
    };

    const getLocationDetections = async (location_id, page) => {
        const payload = {
            location_id: location_id,
            page: page,
        }
        const response = await square_api.post(`/locations/location-detections`, payload);
        const freshLocationDetections = response.data;

        return freshLocationDetections;
    };

    const createLocation = async (location_name, group_id) => {
        const credentials = {
            location_name: location_name,
            group_id: group_id
        }
        const response = await square_api.post('/locations/create', credentials);

        if (response.status === 201) { // 201 = CREATED
            return response.data.location;
        } else {
            return false;
        }
    };

    const deleteLocation = async (location_id, owner_password) => {
        const credentials = {
            location_id: location_id,
            owner_password: owner_password
        }
        const response = await square_api.post('/locations/delete', credentials);

        if (response.status === 200) { // 200 = OK
            return true;
        } else {
            return false;
        }
    };

    const toggleCreateLocation = () => updateState({ showCreateLocation: !showCreateLocation });
    const triggerReloadLocation = () => setReload(reload + 1);

    const value = useMemo(
        () => ({
            updateState,
            handleChange,
            handleToast,
            inputName,
            inputErrors,
            BUTTON_TEXT,
            createLocation,
            deleteLocation ,
            getGroupLocations,
            showCreateLocation,
            toggleCreateLocation,
            reload,
            triggerReloadLocation,
            getLocationCameras,
            getLocationDetections
        }),
        [state, reload]
    );
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocation = () => {
    return useContext(LocationContext);
};