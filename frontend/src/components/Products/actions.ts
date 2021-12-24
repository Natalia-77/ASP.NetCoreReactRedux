
import {
    ProductActionTypes,
    ISearchProduct,
    ProductAction,
    IResponseDataFromProduct,
    ProductDataModel,
    IFetchProductErrorResponse
} from "./types";
import { Dispatch } from "react";
import http_common from "../../service/http_common";
import axios, { AxiosError } from "axios";

export const ProductFetchActions = (datas: ISearchProduct) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const responce = await http_common.get<IResponseDataFromProduct>("Prod",
            {
                params:datas
            });
            const { result } = responce.data;
            console.log(responce.data);

            var result_data: ProductDataModel = {
                current_page: result.current_page,
                last_page: result.last_page,
                total: result.total,
                product: result.data

            };
            dispatch({
                type: ProductActionTypes.SET_DATA_PRODUCT,
                payload: result_data
            });

            return Promise.resolve(result.data);
        }
        catch (errors) {
            if (axios.isAxiosError(errors)) {

                const servererror = errors as AxiosError<IFetchProductErrorResponse>;
                if (servererror && servererror.response) {
                    dispatch({
                        type: ProductActionTypes.FETCH_ERROR,
                        payload: servererror.response.data.errors
                    })
                    return Promise.reject(servererror.response.data);
                }
            }
            return Promise.reject(errors);
        }
    }
}
