import axios from "axios";
import { BaseService } from "./base.service";
import { GetProductListResponse } from "../models/response/product/getProductList.response";
import { GetProductResponseById } from "../models/response/product/getProductById.response";




export class ProductService extends BaseService {


    async getProducts(accessToken: string, limit?: number, page?: number): Promise<GetProductListResponse> {
        const url: string = `${this.getBaseUrl()}/api/products`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: { limit, page }
            })
            const getProductListResponse: GetProductListResponse = {
                status: response.status,
                statusText: response.statusText,
                products: response.data.products
            }
            return getProductListResponse;
        } catch (error: any) {
            console.error("Error get products :", error);
            throw new Error("Failed to get products: " + error.message);

        }
    }

    async getProductById(accessToken: string, productId: string): Promise<GetProductResponseById> {

        const url: string = `${this.getBaseUrl()}/api/products/${productId}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const getProductResponseById: GetProductResponseById = {
                status: response.status,
                statusText: response.statusText,
                product: response.data.product
            }
            return getProductResponseById;

        } catch (error: any) {
            console.error("Error deleting cart:", error);
            throw new Error("Failed to delete cart: " + error.message);
        }
    }


    
}