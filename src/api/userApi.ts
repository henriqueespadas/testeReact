import axios, { AxiosError } from 'axios';
import {CreateUserPayload, UpdateUserPayload, User} from '../types/userTypes';

const API_BASE_URL = 'https://fakestoreapi.com';
const USERS_ENDPOINT = '/users';

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (payload: CreateUserPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${USERS_ENDPOINT}`, payload);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in createUser:', error);
    } else if (error && (error as AxiosError).response) {
      console.error('Error response:', (error as AxiosError).response);
    } else {
      console.error('Unknown error in createUser:', error);
    }
    throw error;
  }
};

export const updateUser = async (payload: UpdateUserPayload): Promise<User> => {
    try {
        const response = await axios.put(`${API_BASE_URL}${USERS_ENDPOINT}/${payload.id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUser = async (userId: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
    } catch (error) {
        throw error;
    }
};
