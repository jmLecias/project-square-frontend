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

    const value = useMemo(
        () => ({
            getUserRecords
        }),
        []
    );
    return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};

export const useRecords = () => {
    return useContext(RecordsContext);
};