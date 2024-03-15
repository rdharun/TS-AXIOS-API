import { BaseResponse } from "../base/base.response";


export interface GetProductListResponse extends BaseResponse {
    products: Product[];
}

export interface Product {
    created_at: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    id: string,
    category_id: string
}
