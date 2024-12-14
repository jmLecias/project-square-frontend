import { createContext, useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';

import square_api from "../api/square_api";

const GroupContext = createContext();

const BUTTON_TEXT = {
    CREATE: 'Create',
    CREATING: 'Creating...',
    JOIN: 'Join',
    JOINING: 'Joining...',
    DELETE: 'Delete',
    DELETING: 'Deleting...'
};

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

export const GroupProvider = ({ children }) => {
    
    const [reload, setReload] = useState(0);

    const [state, setState] = useState({
        createdGroups: [],
        joinedGroups: [],
        inputCode: null,
        inputName: null,
        newInputName: null,
        deleteInputName: null,
        inputErrors: {
            inputCode: '',
            inputName: '',
        },
        showCreateGroup: false,
        showJoinGroup: false,
        showDeleteGroup: false,
    });

    const { inputCode, inputName, inputErrors, newInputName, deleteInputName } = state;
    const { joinedGroups, createdGroups } = state;
    const { showCreateGroup, showJoinGroup, showDeleteGroup } = state;


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

    const getCreatedGroups = async (user_id) => {
        const response = await square_api.get(`/groups/created-groups/${user_id}`);
        const freshCreatedGroups = response.data.created_groups;
        updateState({ createdGroups: freshCreatedGroups });
    };

    const getJoinedGroups = async (user_id) => {
        const response = await square_api.get(`/groups/joined-groups/${user_id}`);
        const freshJoinedGroups = response.data.joined_groups;
        updateState({ joinedGroups: freshJoinedGroups });
    };

    const createGroup = async (group_name, user_id, startTime, endTime) => {
        const credentials = {
            group_name: group_name,
            user_id: user_id,
            start_time: startTime,
            end_time: endTime
        }
        const response = await square_api.post('/groups/create', credentials);

        if (response.status === 201) { // 201 = CREATED
            return response.data.group;
        } else {
            return false;
        }
    };

    const joinGroup = async (group_code, user_id) => {
        const credentials = {
            group_code: group_code,
            user_id: user_id
        }
        const response = await square_api.post('/groups/join', credentials);

        if (response.status === 200) { // 200 = OK
            return response.data.group;
        } else {
            return false;
        }
    };

    const updateGroup = async (group_id, new_group_name, startTime, endTime) => {
        const credentials = {
            group_id: group_id,
            new_group_name: new_group_name,
            start_time: startTime,
            end_time: endTime

        }
        const response = await square_api.post('/groups/update', credentials);

        if (response.status === 200) { // 200 = OK
            return true;
        } else {
            return false;
        }
    };


    const deleteGroup = async (group_id, group_name, user_id) => {
        const credentials = {
            group_id: group_id,
            group_name: group_name,
            user_id: user_id,
        }
        const response = await square_api.post('/groups/delete', credentials);

        if (response.status === 200) { // 200 = OK
            return true;
        } else {
            return false;
        }
    };

    const toggleCreateGroup = () => updateState({ showCreateGroup: !showCreateGroup });
    const toggleJoinGroup = () => updateState({ showJoinGroup: !showJoinGroup });
    const toggleDeleteGroup = () => updateState({ showDeleteGroup: !showDeleteGroup });

    const triggerReloadGroups = () => setReload(reload + 1);

    const value = useMemo(
        () => ({
            updateState,
            handleChange,
            handleToast,
            inputCode,
            inputName,
            inputErrors,
            BUTTON_TEXT,
            createGroup,
            joinGroup,
            deleteGroup,
            getCreatedGroups,
            getJoinedGroups,
            createdGroups,
            joinedGroups,
            showCreateGroup,
            showJoinGroup,
            toggleCreateGroup,
            toggleJoinGroup,
            reload,
            triggerReloadGroups,
            newInputName,
            updateGroup,
            showDeleteGroup,
            toggleDeleteGroup,
            deleteInputName
        }),
        [state, reload]
    );
    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export const useGroup = () => {
    return useContext(GroupContext);
};