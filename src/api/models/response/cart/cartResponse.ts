import { BaseResponse } from "../base/base.response";


export interface CartResponse extends BaseResponse {
    cart_id: string;
    user_id: string;
    created_at: Date;
}
