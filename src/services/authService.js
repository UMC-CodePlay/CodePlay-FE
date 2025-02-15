import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://15.164.219.98.nip.io";

export const signup = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const refreshToken = async (email, refreshToken) => {
  return axios.post(
    `${API_BASE_URL}/auth/refresh?email=${email}`,
    {},
    { headers: { "Refresh-Token": refreshToken } }
  );
};
