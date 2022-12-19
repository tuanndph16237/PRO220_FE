import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBanner, getBanners, removeBannerByIds, updateBanner } from '../api/banner';
import { NOTIFICATION_TYPE } from '../constants/status';

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
        bannersRemove: {
            errors: null,
            message: null,
            dataDeleted: null,
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
        [updateBannerAsync.rejected.type]: (state, action) => {
            state.update.loading = false;
        },
        [updateBannerAsync.pending.type]: (state, action) => {
            state.update.loading = true;
        },
        [updateBannerAsync.fulfilled.type]: (state, action) => {
            state.update.loading = false;
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
            state.create.message = 'Thêm thất bại';
            state.create.status = NOTIFICATION_TYPE.ERROR;
        },
        [createBannerAsync.pending.type]: (state, action) => {
            state.create.loading = true;
        },
        [createBannerAsync.fulfilled.type]: (state, action) => {
            state.create.status = NOTIFICATION_TYPE.SUCCESS;
            state.create.loading = false;
            state.create.message = 'Thêm thành công';
            state.banners.values.push(action.payload.data);
        },
    },
});

export default BannerSlice.reducer;
