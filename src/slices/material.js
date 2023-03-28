import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMaterial, getMaterials, updateMaterial } from '../api/material';
import { NOTIFICATION_TYPE } from '../constants/status';

export const getAllMaterialAsync = createAsyncThunk('getAllMaterialAsync', async(filter, { rejectWithValue }) => {
    try {
        const materials = await getMaterials(filter);
        return materials;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateMaterialAsync = createAsyncThunk(
    'updateMaterialAsync',
    async({ _id, data }, { rejectWithValue }) => {
        try {
            const material = await updateMaterial(_id, data);
            return material;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const createMaterialAsync = createAsyncThunk('createMaterialAsync', async(data, { rejectWithValue }) => {
    try {
        const material = await createMaterial(data);
        return material;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const MaterialSlice = createSlice({
    name: 'material',
    initialState: {
        materials: {
            values: [],
            errors: null,
            loading: false,
        },
        update: {
            errors: null,
            message: null,
            loading: false,
            status: null,
        },
        create: {
            errors: null,
            message: null,
            loading: false,
            status: null,
        },
    },
    reducers: {},
    extraReducers: {
        [updateMaterialAsync.rejected.type]: (state, action) => {
            state.update.loading = false;
        },
        [updateMaterialAsync.pending.type]: (state, action) => {
            state.update.loading = true;
        },
        [updateMaterialAsync.fulfilled.type]: (state, action) => {
            state.update.loading = false;
            state.materials.values = state.materials.values.map((material) => {
                if (material._id !== action.payload.data._id) return material;
                return action.payload.data;
            });
        },

        [createMaterialAsync.rejected.type]: (state, action) => {
            state.create.message = 'Thêm thất bại';
            state.create.status = NOTIFICATION_TYPE.ERROR;
        },
        [createMaterialAsync.pending.type]: (state, action) => {
            state.create.loading = true;
        },
        [createMaterialAsync.fulfilled.type]: (state, action) => {
            state.create.status = NOTIFICATION_TYPE.SUCCESS;
            state.create.loading = false;
            state.create.message = 'Thêm thành công';
            state.materials.values.push(action.payload.data);
        },
    },
});

export default MaterialSlice.reducer;