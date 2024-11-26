import { createContext, useContext, useMemo, useState } from "react";

import square_api from "../api/square_api";

const RecordsContext = createContext();

export const RecordsProvider = ({ children }) => {

    const getUserRecords = async (user_id, page, per_page) => {
        const payload = {
            user_id: user_id,
            page: page,
            per_page: per_page
        }
        const response = await square_api.post('/records/user-records', payload);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const getLocationRecordsInfo = async (location_id) => {
        const response = await square_api.get('/locations/location-records-info/'+location_id);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const getLocationRecords = async (location_id, page, per_page) => {
        const payload = {
            location_id: location_id,
            page: page,
            per_page: per_page
        }
        const response = await square_api.post('/records/location-records', payload);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const getLocationUserRecords = async (location_id, user_id, page, per_page) => {
        const payload = {
            location_id: location_id,
            user_id: user_id,
            page: page,
            per_page: per_page
        }
        const response = await square_api.post('/records/location-user-records', payload);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const value = useMemo(
        () => ({
            getUserRecords,
            getLocationRecords,
            getLocationRecordsInfo,
            getLocationUserRecords
        }),
        []
    );
    return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};

export const useRecords = () => {
    return useContext(RecordsContext);
};