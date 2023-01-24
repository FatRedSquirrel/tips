import {configureStore} from '@reduxjs/toolkit';
import {waitersReducer} from "./slices/waiters";

const store = configureStore({
    reducer: {
        waiters: waitersReducer
    }
})

export default store;