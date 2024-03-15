import { BaseResponse } from "../base/base.response";



export interface DeleteCartResponse extends BaseResponse {
    cart_id: string,
    message: string
}