import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; // Replace with your backend URL

export const signup = (userData) => {
  return axios.post(`${baseURL}/signup`, userData);
};

export const login = (userData) => {
  return axios.post(`${baseURL}/login`, userData);
};

export const logout = () => {
  return axios.post(`${baseURL}/logout`);
};
