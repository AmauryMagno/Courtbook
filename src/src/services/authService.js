import api from "./api";
const BASE_URL = "https://real-dodos-invent.loca.lt";

export const login = async (param) => {
    try {
        return await api.post(`${BASE_URL}/login`, param).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const register = async (param) => {
    try {
        return await api.post(`${BASE_URL}/register`, param).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const searchCourts = async () => {
    try {
        return await api.get(`${BASE_URL}/courts`).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const searchReservations = async () => {
    try {
        return await api.get(`${BASE_URL}/reservations`).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createReservation = async (reservationData) => {
    try {
        return await api.post(`${BASE_URL}/reservations`, reservationData).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateReservation = async (reservationData, id) => {
    try {
        return await api.put(`${BASE_URL}/reservations/${id}`, reservationData).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

