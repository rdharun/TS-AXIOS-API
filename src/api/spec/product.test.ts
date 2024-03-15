import { faker } from "@faker-js/faker";
import { AuthService } from "../services/auth.service"
import { ProductService } from "../services/product.service";
import { GetProductListResponse } from "../models/response/product/getProductList.response";
import { expect } from "chai";
import { GetProductResponseById } from "../models/response/product/getProductById.response";

describe('Products API', () => {

    let authService: AuthService;
    let productService: ProductService;
    let accessToken: string;
    before(async () => {
        authService = new AuthService();
        productService = new ProductService();

        const email = faker.internet.email();
        const password = faker.internet.password();

        const signUpResponse = await authService.signup({ email, password });
        accessToken = signUpResponse.data.session.access_token;

    })

    it('should able to get all the products', async () => {

        const getProductListResponse: GetProductListResponse = await productService.getProducts(accessToken);
        console.log(getProductListResponse.products);

        expect(getProductListResponse.status, "Invalid status code").to.be.equal(200);
        expect(getProductListResponse.products.length).to.equal(20);

    });

    it('should able to get the product by id', async () => {
        const getProductListResponse: GetProductListResponse = await productService.getProducts(accessToken);

        const productNameToFind = "Smartphone";

        const product = getProductListResponse.products.find(product => product.name === productNameToFind);

        if (!product) {
            throw new Error(`Product with name "${productNameToFind}" not found`);
        }

        const productId = product.id;

        const getProductResponseById: GetProductResponseById = await productService.getProductById(accessToken, productId);

        expect(getProductResponseById.status, "Invalid status code").to.be.equal(200);
        expect(getProductResponseById.product.id).to.be.equal(product.id);
        expect(getProductResponseById.product.name).to.be.equal(product.name);

    })


    it('should able to get all the products by using query params', async () => {

        const limit: number = 2;
        const page: number = 4;

        const getProductListResponse: GetProductListResponse = await productService.getProducts(accessToken, limit, page);
        expect(getProductListResponse.status).to.equal(200)
        expect(getProductListResponse.products.length).to.equal(2);

    })

})