import apiClient from "./client";

const getCinemas = async () => {
    return await apiClient.get('cinemas');
};

const getCinemaMovies = async (cinemaId: string) => {
    return await apiClient.get(`cinemas/${cinemaId}/movies`);
};

export {
    getCinemaMovies, getCinemas
};

