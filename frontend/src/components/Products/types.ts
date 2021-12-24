
export enum ProductActionTypes {
    FETCH_ERROR = "FETCH_ERROR",
    SET_DATA_PRODUCT = "SET_DATA_PRODUCT"
}

// модель сутності продукту.
export interface IProductModel {
    id: number,
    name: string,
    description: string
}

//дані,по яким буде здійснюватись пошук.
export interface ISearchProduct {
    page?: string | number,
    name?: string | null
}

// дані продукту,що повертаються.
export interface IResponseServer {
    current_page: number,
    last_page: number,
    total: number,
    data: Array<IProductModel>
}

// state продукту.
export interface ProductState {
    current_page: number,
    last_page: number,
    total: number,
    product: Array<IProductModel>
}

//проміжна модель,для передачі даних про продукт в редьюсер.
export interface ProductDataModel {
    current_page: number,
    last_page: number,
    total: number,
    product: Array<IProductModel>
}

//all datas to product.
export interface IResponseDataFromProduct {
    result: IResponseServer
}

export interface IFetchProductErrorResponse {
    errors:string 
}

export interface SetDataProductAction {
    type: ProductActionTypes.SET_DATA_PRODUCT;
    payload: ProductDataModel
}
export interface FetchErrorsAction {
    type: ProductActionTypes.FETCH_ERROR;
    payload: string
  }


export type ProductAction = SetDataProductAction | FetchErrorsAction;
