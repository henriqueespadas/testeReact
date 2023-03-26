import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com/';

export const getUsers = (): Promise<AxiosResponse<any>> => {
  return axios.get(`${API_BASE_URL}/users`);
}

export const createUser = (userData: any): Promise<AxiosResponse<any>> => {
  return axios.post(`${API_BASE_URL}/users`, userData);
}

export const getUserById = (userId: number): Promise<AxiosResponse<any>> => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
}

export const updateUserById = (userId: number, userData: any): Promise<AxiosResponse<any>> => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, userData);
}

export const deleteUserById = (userId: number): Promise<AxiosResponse<any>> => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`);
}
