import { ProductAction, ProductState,ProductActionTypes } from "./types";

const initialState:ProductState={
    current_page:0,
    last_page:0,
    total:0,
    product:[]
}

export const prodReducer=(state=initialState, action : ProductAction ): ProductState =>{

    switch(action.type){
        case ProductActionTypes.SET_DATA_PRODUCT:
            return{
                ...state,
                current_page:action.payload.current_page,
                last_page:action.payload.last_page,
                total: action.payload.total,
                product:action.payload.product
            };  
            default:
                return state;      
    }
}