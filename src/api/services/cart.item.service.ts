import axios from "axios";
import { AddItemToCartRequest } from "../models/request/cartItems/addItemToCartRequest";
import { AddItemToCartResponse } from "../models/response/cartItems/addItemToCartResponse";
import { BaseService } from "./base.service";
import { UpdateItemToCartResponse } from "../models/response/cartItems/updateItemToCartResponse";


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

    async updateItemToCart(accessToken: string, request: AddItemToCartRequest, cartId: string, cartItemId: string): Promise<UpdateItemToCartResponse> {
        const url: string = `${this.getBaseUrl()}/api/cart/${cartId}/items/${cartItemId}`;

        try {
            const response = await axios.put(url, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const updateItemToCartResponse: UpdateItemToCartResponse = response.data as UpdateItemToCartResponse;
            updateItemToCartResponse.status = response.status;
            return updateItemToCartResponse;


        } catch (error: any) {
            console.error("Error updating item to cart:", error);
            throw new Error("Failed to update item to cart: " + error.message);
        }

    }

}