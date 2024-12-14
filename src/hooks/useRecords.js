import { createContext, useContext, useMemo, useState } from "react";

import square_api from "../api/square_api";
import { toFilename } from "../services/DateFormatService";
import { useGroup } from "./useGroup";

const RecordsContext = createContext();

export const RecordsProvider = ({ children }) => {
    const { handleToast } = useGroup();

    const [currentDate, setCurrentDate] = useState(null);

    const getUserRecords = async (user_id, page, per_page,) => {
        const payload = {
            user_id: user_id,
            page: page,
            per_page: per_page,
            date: currentDate,
        }
        const response = await square_api.post('/records/user-records', payload);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const getLocationRecordsInfo = async (location_id) => {
        const response = await square_api.get('/locations/location-records-info/' + location_id);

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
            per_page: per_page,
            date: currentDate,
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
            per_page: per_page,
            date: currentDate,
        }
        const response = await square_api.post('/records/location-user-records', payload);

        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    };

    const exportAttendanceExcel = async (location) => {
        try {
            const response = await square_api.get('/records/download-attendance/' + location.id, {
                responseType: 'blob', // Handle binary data
            });

            if (response.status === 200) {
                const now = new Date();
                const blob = response.data;
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Attendance-${location.name}-${toFilename(now)}`;
                document.body.appendChild(link);
                link.click();
                link.remove();

                handleToast("Downloading...", 'info')
            } else {
                handleToast("response", 'error')
            }
        } catch (error) {
            console.log(error)
            handleToast("No data to export", 'error')
        }
    };

    const onDateChange = (date) => {
        setCurrentDate(date)
    };


    const value = useMemo(
        () => ({
            currentDate,
            setCurrentDate,
            onDateChange,
            getUserRecords,
            getLocationRecords,
            getLocationRecordsInfo,
            getLocationUserRecords,
            exportAttendanceExcel
        }),
        [currentDate]
    );
    return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
};

export const useRecords = () => {
    return useContext(RecordsContext);
};