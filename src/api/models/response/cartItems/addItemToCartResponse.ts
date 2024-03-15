import { BaseResponse } from "../base/base.response";




export interface AddItemToCartResponse extends BaseResponse {
    cart_item_id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    price: number;
}