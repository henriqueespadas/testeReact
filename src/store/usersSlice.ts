import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from "axios";
import { User } from '../types';

export interface UserState {
    users: User[];
    selectedUser: User | null;
    isLoading: boolean;
    error: string | null;
}

interface UpdateResponse {
  message: string;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
};

export interface UpdateSuccessResponse {
  message: string;
}

export interface UpdateFailureResponse {
  error: string;
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersStart(state) {
            state.isLoading = true;
        },
        getUsersSuccess(state, action: PayloadAction<User[]>) {
            state.isLoading = false;
            state.users = action.payload;
        },
        getUsersFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateUserStart(state) {
            state.isLoading = true;
        },
        updateUserSuccess(state, action: PayloadAction<UpdateResponse>) {
            state.isLoading = false;
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        createUserStart(state) {
            state.isLoading = true;
        },
        createUserSuccess(state, action: PayloadAction<AxiosResponse<any>>) {
            state.isLoading = false;
            state.users.push(action.payload.data); // Use the `data` property of the response object as the payload
        },
        createUserFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,

} = usersSlice.actions;

export default usersSlice.reducer;

