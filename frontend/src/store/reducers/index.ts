import {combineReducers} from "redux";
import {prodReducer} from '../../components/Products/reducer'

export const rootReducer = combineReducers({   
     prod:prodReducer
})

export type RootState = ReturnType<typeof rootReducer>