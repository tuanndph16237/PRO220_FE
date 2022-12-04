import { configureStore } from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
