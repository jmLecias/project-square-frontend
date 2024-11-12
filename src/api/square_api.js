import axios from 'axios';

let serverIp = ''; //IP OF ELASTIC EC2
// serverIp = '172.26.127.26';
// serverIp = '192.168.254.102';
serverIp = '192.168.1.4';
// serverIp = '192.168.137.224';
const flaskURL = `http://${((serverIp !== '') ? serverIp : 'localhost')}:5000`;
const squareApiBaseUrl = flaskURL;

const square_api = axios.create({
    baseURL: squareApiBaseUrl,
});


square_api.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

square_api.interceptors.response.use(
    response => response,
    async error => {
        return Promise.reject(error);
    }
);

export default square_api;
export { squareApiBaseUrl as faceApiBaseUrl, serverIp };
