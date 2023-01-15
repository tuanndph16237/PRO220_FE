import {
    configureStore
} from '@reduxjs/toolkit';
import BannerReducer from '../slices/banner';
import ShowroomReduce from '../slices/showroom';
import UserReducer from '../slices/user';
import OrderSlice from '../slices/order';
import MaterialReducer from '../slices/material';
const store = configureStore({
    reducer: {
        banner: BannerReducer,
        user: UserReducer,
        order: OrderSlice,
        showroom: ShowroomReduce,
        material: MaterialReducer
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;