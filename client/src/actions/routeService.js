import axios from 'axios';
import { url } from '../constants/urls'; 

// All POST routes
export const routePostCall = async (payload, modelType, action) => {
    const response = await axios.post(`${url(modelType, action)}`, payload);
    return response.data;
}

// All GET routes
export const routeGetCall = async (modelType, action) => {
    const response = await axios.get(`${url(modelType, action)}`);
    return response.data;
}