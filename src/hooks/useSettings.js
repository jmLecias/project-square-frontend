import { createContext, useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

const SettingsContext = createContext();

const BUTTON_TEXT = {
    SAVE: 'Save changes',
    SAVING: 'Saving changes...',
};

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const SettingsProvider = ({ children }) => {

    const [reload, setReload] = useState(0);

    const [userInfo, setUserInfo] = useState(null);

    const [showTimeout, setShowTimeout] = useState(false);
    const [showNoInfo, setShowNoInfo] = useState(false);

    const [state, setState] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
    });

    const { firstname, middlename, lastname } = state;


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

    const getUserInfo = async (userID) => {
        const response = await square_api.get(`/identity/get/${userID}`);

        if (response.status === 200) {
            return response.data.user_info
        } else {
            return null
        }
    };

    // const toggleCreateLocation = () => updateState({ showCreateLocation: !showCreateLocation });
    const triggerReloadSettings = () => setReload(reload + 1);

    const value = useMemo(
        () => ({
            updateState,
            handleChange,
            handleToast,
            firstname,
            middlename,
            lastname,
            BUTTON_TEXT,
            userInfo,
            setUserInfo,
            getUserInfo,
            reload,
            triggerReloadSettings,
            showNoInfo,
            setShowNoInfo,
            showTimeout,
            setShowTimeout
        }),
        [state, userInfo, reload, showNoInfo, showTimeout]
    );
    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
    return useContext(SettingsContext);
};