import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBanner, getBanners, removeBannerByIds, updateBanner } from '../api/banner';

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

export const removeBannerByIdsAsync = createAsyncThunk('removeBannerByIdsAsync', async (ids, { rejectWithValue }) => {
    try {
        const banners = await removeBannerByIds(ids);
        return banners;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createBannerAsync = createAsyncThunk('createBannerAsync', async (data, { rejectWithValue }) => {
    try {
        const banner = await createBanner(data);
        return banner;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const BannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banners: {
            values: [],
            errors: null,
            loading: false,
        },
        bannerUpdate: {
            values: {},
            errors: null,
            loading: false,
        },
        bannersRemove: {
            errors: null,
            message: null,
            dataDeleted: null,
        },
        create: {
            errors: null,
            message: null,
            loadding: false,
            status: null,
        },
    },
    reducers: {},
    extraReducers: {
        [getAllBannerAsync.rejected.type]: (state, action) => {
            state.banners.loading = false;
        },
        [getAllBannerAsync.pending.type]: (state, action) => {
            state.banners.loading = true;
        },
        [getAllBannerAsync.fulfilled.type]: (state, action) => {
            state.banners.loading = false;
            state.banners.values = action.payload.data;
        },
        [updateBannerAsync.fulfilled.type]: (state, action) => {
            state.banners.values = state.banners.values.map((banner) => {
                if (banner._id !== action.payload.data._id) return banner;
                return action.payload.data;
            });
        },
        [removeBannerByIdsAsync.fulfilled.type]: (state, action) => {
            if (action.payload.data.dataDeleted) {
                state.bannersRemove.dataDeleted = action.payload.data.dataDeleted;
            }
            state.banners.values = state.banners.values.filter((banner) => {
                return !action.payload.data.ids.includes(banner._id);
            });
        },
        [createBannerAsync.rejected.type]: (state, action) => {
            state.create.status = 'error';
        },
        [createBannerAsync.pending.type]: (state, action) => {
            state.create.status = 'error';
            state.create.loadding = true;
        },
        [createBannerAsync.fulfilled.type]: (state, action) => {
            state.create.loadding = false;
            state.create.message = 'Thêm thành công';
            state.banners.values.push(action.payload.data);
        },
    },
});

export default BannerSlice.reducer;
