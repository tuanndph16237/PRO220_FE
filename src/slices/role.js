import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { createRole, getPermission, getRole, createPermission } from '../api/permission';
import { NOTIFICATION_TYPE } from '../constants/status';
import { Notification } from '../utils/notifications';

export const getAllRoleAsync = createAsyncThunk('getAllRoleAsync', async (values, { rejectWithValue }) => {
    try {
        const data = await getRole();
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const CreateRoleAsync = createAsyncThunk('CreateRoleAsync', async (values, { rejectWithValue }) => {
    try {
        const { data } = await createRole(values);
        if (data) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm thành công!');
        }
        const valuess = _.omit(data, ['updatedAt', 'permissions', 'createdAt', '__v']);
        return {
            name: valuess.name,
            id: valuess._id,
        };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getPermissions = createAsyncThunk('getPermissions', async (values, { rejectWithValue }) => {
    try {
        const { data } = await getPermission();
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const CreatePermissions = createAsyncThunk('CreatePermissions', async (values, { rejectWithValue }) => {
    try {
        const { data } = await createPermission(values);
        if (data) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm thành công!');
        }
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    loading: true,
    valueRole: [],
    valuePermission: [],
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllRoleAsync.pending.type]: (state, action) => {
            state.loading = false;
        },
        [getAllRoleAsync.fulfilled.type]: (state, action) => {
            state.valueRole = action.payload.data;
        },
        [CreateRoleAsync.fulfilled.type]: (state, action) => {
            state.valueRole = [...state.valueRole, action.payload];
        },
        [getPermissions.pending.type]: (state, action) => {
            state.loading = false;
        },
        [getPermissions.fulfilled.type]: (state, action) => {
            state.valuePermission = action.payload;
        },
        [CreatePermissions.fulfilled.type]: (state, action) => {
            state.valuePermission = action.payload;
        },
    },
});

export default roleSlice.reducer;
