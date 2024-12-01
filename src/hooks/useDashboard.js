import { createContext, useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

const DashboardContext = createContext();

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const DashboardProvider = ({ children }) => {
    
    const [reload, setReload] = useState(0);

    const [state, setState] = useState({
        createdGroups: [],
        joinedGroups: [],
    });

    const [originImg, setOriginImg] = useState(null);

    const { joinedGroups, createdGroups } = state;


    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const handleToast = (message, type) => {
        toast[type](message, TOAST_CONFIG);
    };

    const getDashboardData = async (user_id) => {
        const response = await square_api.get(`/auth/dashboard-data/${user_id}`);
        return response.data
    };

    const triggerReloadDashboard = () => setReload(reload + 1);
    const handleDetectionClick = (origin) => setOriginImg(origin); 

    const value = useMemo(
        () => ({
            updateState,
            handleToast,
            getDashboardData,
            createdGroups,
            joinedGroups,
            reload,
            triggerReloadDashboard,
            originImg,
            setOriginImg,
            handleDetectionClick
        }),
        [state, originImg, reload]
    );
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
    return useContext(DashboardContext);
};