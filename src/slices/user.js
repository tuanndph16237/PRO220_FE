import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/login';
import jwtDecode from 'jwt-decode';

export const loginAsync = createAsyncThunk('user/login', async (values) => {
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
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state, action) => {
            (state.loading = true), (state.error = ''), (state.currentUser.accessToken = '');
        });
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (
                action.payload.message == 'email chưa tồn tại' ||
                action.payload.message == 'mật khẩu sai vui lòng nhập lại'
            ) {
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
