import { createContext, useContext, useMemo} from "react";
import StorageService from "../services/StorageService";
import square_api from "../api/square_api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const ss = new StorageService();

    var user = ss.getItem('user');

    if (user) {
        user = JSON.parse(user);
    }


    const login = async (credentials) => {
        const response = await square_api.post('/auth/login', credentials);

        if (response.status === 200) {
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));

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

    // const loginGoogle = async () => {
    //     window.open('http://localhost:5000/auth/login/google');
        
    //     // const response = await square_api.post('/auth/login/google', {
    //     //     withCredentials: true,
    //     //     headers: {
    //     //         'Access-Control-Allow-Origin': '*'
    //     //     }
    //     // });

    //     // if (response.status === 200) {
    //     //     const user = response.data.user;

    //     //     ss.storeItem('user', JSON.stringify(user));

    //     //     return true;
    //     // } else {
    //     //     return false;
    //     // }
    // };



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
            // loginGoogle,
            me,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};