import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBanners, updateBanner } from '../api/banner';

export const getAllBannerAsync = createAsyncThunk('getAllBannerAsync', async (filter, { rejectWithValue }) => {
    try {
        const banners = await getBanners(filter);
        return banners;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateBannerAsync = createAsyncThunk('updateBannerAsync', async ({ _id, data }, { rejectWithValue }) => {
    try {
        const banner = await updateBanner(_id, data);
        return banner;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const BannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banners: [],
        value: {},
    },
    reducers: {},
    extraReducers: {
        [getAllBannerAsync.fulfilled.type]: (state, action) => {
            state.banners = action.payload.data;
        },
        [updateBannerAsync.fulfilled.type]: (state, action) => {
            state.banners = state.banners.map((banner) => {
                if (banner._id !== action.payload.data._id) return banner;
                return action.payload.data;
            });
        },
    },
});

export default BannerSlice.reducer;
