import axios from "axios";
import { CartResponse } from "../models/response/cart/cartResponse"
import { BaseService } from "./base.service";
import { DeleteCartResponse } from "../models/response/cart/deleteCartResponse";


export class CartService extends BaseService {


    async createCart(token: string): Promise<CartResponse> {

        const url: string = `${this.getBaseUrl()}/api/cart`;

        try {
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData: CartResponse = response.data;
            responseData.status = response.status;
            if (response.data && response.data.message === 'Cart already created for the user') {
                console.warn("Cart is already created for this user.");
            }
            return responseData;

        } catch (error: any) {
            console.error("Error creating cart:", error);
            throw new Error("Failed to create cart: " + error.message);
        }
    }


    async deleteCart(token: string, cartId: string): Promise<DeleteCartResponse> {
        const url: string = `${this.getBaseUrl()}/api/cart/${cartId}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData: DeleteCartResponse = response.data;
            responseData.status = response.status;
            if (response.data && response.data.message === "Cart already deleted") {
                console.warn("Cart is already deleted.");
            }
            return responseData;

        } catch (error: any) {
            console.error("Error deleting cart:", error);
            throw new Error("Failed to delete cart: " + error.message);

        }
    }


    async getCart(token: string): Promise<CartResponse> {
        const url: string = `${this.getBaseUrl()}/api/cart`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.message === "No cart found") {
                console.warn("No cart found.");
            }

            const responseData: CartResponse = response.data;
            responseData.status = response.status;
            return responseData;
        } catch (error: any) {
            console.error("Error getting cart:", error);
            throw new Error("Failed to get cart: " + error.message);
        }
    }
}