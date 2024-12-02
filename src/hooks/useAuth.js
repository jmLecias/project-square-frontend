import { createContext, useContext, useMemo } from "react";
import StorageService from "../services/StorageService";
import square_api from "../api/square_api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const ss = new StorageService();

    var user = ss.getItem('user');

    if (user) {
        user = JSON.parse(user);
    }

    const isSessionExpired = () => {
        const now = new Date().getTime();
        const timeoutOn = parseInt(ss.getItem('timeout_on'), 10);
        return now >= timeoutOn;
    };


    const login = async (credentials) => {
        const response = await square_api.post('/auth/login', credentials);
        
        if (response.status === 200) {
            const user = response.data.user;
            
            const now = new Date();
            const timeoutTimestamp = now.getTime() + user.session_timeout * 1000; 

            ss.storeItem('user', JSON.stringify(user));
            ss.storeItem('timeout_on', timeoutTimestamp.toString()); 

            return user;
        } else {
            return null;
        }
    };

    const register = async (credentials) => {
        const response = await square_api.post('/auth/register', credentials);

        if (response.status === 201) { // 201 = CREATED
            const user = response.data.user;

            return user;
        } else {
            return null;
        }
    };

    const logout = async () => {
        const response = await square_api.post('/auth/logout');

        ss.removeItem('user');

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    };

    const me = async () => {
        const response = await square_api.post('/me');

        if (response.status === 200) {
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));

            return response;
        } else {
            return response;
        }
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout,
            me,
            isSessionExpired
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};