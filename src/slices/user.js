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
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state, action) {
            (state.currentUser.values = {}), (state.currentUser.accessToken = '');
        },
        saveUserValues(state, action) {
            state.currentUser.values = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state, action) => {
            (state.loading = true), (state.error = ''), (state.currentUser.accessToken = '');
        });
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (action.payload.message) {
                (state.error = action.payload.message), (state.currentUser.accessToken = ''), (state.loading = false);
            } else {
                state.currentUser.values = jwtDecode(action.payload.accessToken);
                (state.loading = false),
                    (state.currentUser.accessToken = action.payload.accessToken),
                    (state.error = '');
            }
        });
    },
});

export const { logout, saveUserValues } = userSlice.actions;
export default userSlice.reducer;
