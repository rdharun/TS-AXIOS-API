import axios from "axios";
import { AddItemToCartRequest } from "../models/request/cartItems/addItemToCartRequest";
import { AddItemToCartResponse } from "../models/response/cartItems/addItemToCartResponse";
import { BaseService } from "./base.service";


export class CartItemService extends BaseService {


    async addItemToCart(accessToken: string, request: AddItemToCartRequest, cartId: string): Promise<AddItemToCartResponse> {

        const url: string = `${this.getBaseUrl()}/api/cart/${cartId}/items`;

        try {

            const response = await axios.post(url, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const addItemToCartResponse: AddItemToCartResponse = response.data as AddItemToCartResponse;
            addItemToCartResponse.status = response.status;
            return addItemToCartResponse;

        } catch (error: any) {
            console.error("Error adding item to cart:", error);
            throw new Error("Failed to add item to cart: " + error.message);
        }

    }

}