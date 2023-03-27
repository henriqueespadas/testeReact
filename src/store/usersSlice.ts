import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {User, CreateUserPayload, UpdateUserPayload} from '../types/userTypes';
import {updateUser, deleteUser, fetchUsers, createUser} from '../api/userApi';
import axios from "axios";

interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null,
};

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
    console.log("Fetching users");

    try {
        const data = await fetchUsers();
        console.log("API response data:", data);

        data.forEach((user: User | undefined, index: number) => {
            if (!user) {
                console.log(`Undefined user at index ${index}:`, user);
            }
        });

        const filteredData = data.filter((user: User | undefined) => user);
        console.log("Filtered data:", filteredData);
        return filteredData as User[];
    } catch (error) {
        console.error("Error in fetchUsersAsync:", error);
        throw error;
    }
});


export const createUserAsync = createAsyncThunk('user/createUser', async (payload: CreateUserPayload) => {
    try {
        console.log("CreateUserAsync payload:", payload);
        const usersResponse = await axios.get<User[]>('https://fakestoreapi.com/users');
        const users = usersResponse.data;
        const newUserId = Math.max(...users.map((user: User) => user.id)) + 1;
        const fullPayload = {
            ...payload,
            id: newUserId,
            address: {
                ...payload.address,
                street: payload.address.street,
                city: payload.address.city,
                zipcode: payload.address.zipcode,
                number: payload.address.number,
                geo: {
                    lat: payload.address.geo.lat,
                    long: payload.address.geo.long,
                },
            },
        };

        console.log("Payload antes de enviar para a API:", fullPayload);

        const response = await createUser(fullPayload); // Use createUser aqui

        console.log("Resposta da API:", response);

        const createdUser: User = {
            ...fullPayload,
            id: response.id || newUserId,
            address: {
                street: fullPayload.address.street,
                city: fullPayload.address.city,
                zipcode: fullPayload.address.zipcode,
                number: fullPayload.address.number,
                geolocation: {
                    lat: fullPayload.address.geo.lat,
                    long: fullPayload.address.geo.long,
                },
            },
        };
        return createdUser;
    } catch (error) {
        console.error("Error in createUserAsync:", error);
        throw error;
    }
});


export const updateUserAsync = createAsyncThunk('user/updateUser', async (payload: UpdateUserPayload) => {
    return await updateUser(payload);
});


export const deleteUserAsync = createAsyncThunk('user/deleteUser', async (userId: number) => {
    await deleteUser(userId);
    return userId;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                console.log('Fulfilled action payload:', action.payload);
                console.log('passei');
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload);
                if (index !== -1) {
                    state.users.splice(index, 1);
                }
            });
    },
});

export default usersSlice.reducer;
