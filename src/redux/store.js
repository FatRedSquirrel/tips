import {configureStore} from '@reduxjs/toolkit';
import waitersReducer from "./slices/waiters";
import mainFieldsReducer from "./slices/mainFields";
import feteReducer from "./slices/fete";
import modalReducer from "./slices/modal";
import authReducer from "./slices/auth";
import warningReducer from "./slices/warning";

const store = configureStore({
    reducer: {
        waiters: waitersReducer,
        mainFields: mainFieldsReducer,
        fete: feteReducer,
        modal: modalReducer,
        auth: authReducer,
        warning: warningReducer
    }
})

export default store;