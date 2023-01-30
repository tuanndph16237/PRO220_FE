import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/auth';
import jwtDecode from 'jwt-decode';

export const loginAsync = createAsyncThunk('user/login', async (values, { rejectWithValue }) => {
    try {
        const { data } = await login(values);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    loading: false,
    currentUser: {
        values: {},
        accessToken: '',
    },
    isLogged: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state, action) {
            state.currentUser.values = {};
            state.currentUser.accessToken = '';
            state.isLogged = false;
        },
        saveUserValues(state, action) {
            state.currentUser.values = action.payload;
            state.isLogged = true;
        },
    },
    extraReducers: {
        [loginAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [loginAsync.pending.type]: (state, action) => {
            state.loading = true;
        },
        [loginAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            if (action.payload.message) {
                state.error = action.payload.message;
            } else {
                state.currentUser.values = jwtDecode(action.payload.accessToken);
                state.currentUser.accessToken = action.payload.accessToken;
                state.error = '';
                state.isLogged = true;
            }
        },
    },
});

export const { logout, saveUserValues } = userSlice.actions;
export default userSlice.reducer;
