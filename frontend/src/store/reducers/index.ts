import {combineReducers} from "redux";


export const rootReducer = combineReducers({
    // log: authReducer,
    // prod:prodReducer
})

export type RootState = ReturnType<typeof rootReducer>