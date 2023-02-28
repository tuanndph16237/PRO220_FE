import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { createRole, getRole, updateRolePermission } from '../api/permission';
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
const initialState = {
    loading: true,
    valueRole: [],
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
    },
});

export default roleSlice.reducer;
