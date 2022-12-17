import { configureStore } from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import UserReducer from '../slices/user';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        user: UserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
