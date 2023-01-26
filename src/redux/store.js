import {configureStore} from '@reduxjs/toolkit';
import waitersReducer from "./slices/waiters";
import mainFieldsReducer from "./slices/mainFields";
import feteReducer from "./slices/fete";
import authReducer from "./slices/auth";
import warningReducer from "./slices/warning";
import darkModeReducer from "./slices/darkMode";

const store = configureStore({
    reducer: {
        waiters: waitersReducer,
        mainFields: mainFieldsReducer,
        fete: feteReducer,
        auth: authReducer,
        warning: warningReducer,
        darkMode: darkModeReducer
    }
})

export default store;