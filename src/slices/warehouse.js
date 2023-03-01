import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWarehouseByShowroomId, updateWarehouseByMaterials } from '../api/warehouse';

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

export const updateWarehouseByMaterialsAsync = createAsyncThunk('updateWarehouseByMaterialsAsync', async (data) => {
    try {
        const res = await updateWarehouseByMaterials(data);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

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
        [updateWarehouseByMaterialsAsync.fulfilled]: (state, action) => {
            const newMaterials = state.materials.value.map((material) => {
                const id = material.materialId._id;
                const materialUpdate = action.payload.materials.find((item) => item.materialId === id);
                return {
                    ...material,
                    quantity: materialUpdate ? material.quantity - materialUpdate.qty : material.quantity,
                };
            });
            state.materials.value = newMaterials;
        },
    },
});

export default WarehouseSlice.reducer;
