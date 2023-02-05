import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWarehouseByShowroomId } from '../api/warehouse';

export const getMaterialsWarehouseAsync = createAsyncThunk(
    'getMaterialsWarehouseAsync',
    async (showroomId, { rejectWithValue }) => {
        try {
            const { data: warehouse } = await getWarehouseByShowroomId(showroomId);
            return warehouse;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const WarehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        materials: {
            loading: false,
            value: {},
            errors: false,
        },
    },
    extraReducers: {
        [getMaterialsWarehouseAsync.pending]: (state, action) => {
            state.materials.errors = false;
            state.materials.loading = true;
        },
        [getMaterialsWarehouseAsync.rejected]: (state, action) => {
            console.log('getMaterialsWarehouseAsync-errors,', action);
            state.materials.loading = false;
            state.materials.errors = true;
        },
        [getMaterialsWarehouseAsync.fulfilled]: (state, action) => {
            state.materials.loading = false;
            state.materials.value = action.payload.handleData;
        },
    },
});

export default WarehouseSlice.reducer;
