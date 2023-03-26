import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com/';

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
}

export const createUser = (userData) => {
  return axios.post(`${API_BASE_URL}/users`, userData);
}

export const getUserById = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
}

export const updateUserById = (userId, userData) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, userData);
}

export const deleteUserById = (userId) => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`);
}
