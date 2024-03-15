import { faker } from "@faker-js/faker";
import { AuthService } from "../services/auth.service"
import { CartItemService } from "../services/cart.item.service";
import { CartService } from "../services/cart.service";
import { ProductService } from "../services/product.service";
import { GetProductListResponse, Product } from "../models/response/product/getProductList.response";
import { CartResponse } from "../models/response/cart/cartResponse";
import { AddItemToCartRequest } from "../models/request/cartItems/addItemToCartRequest";
import { AddItemToCartResponse } from "../models/response/cartItems/addItemToCartResponse";
import { expect } from "chai";
import { UpdateItemToCartResponse } from "../models/response/cartItems/updateItemToCartResponse";



describe('Cart Items API', () => {

    let authService: AuthService;
    let cartService: CartService;
    let cartItemService: CartItemService;
    let productService: ProductService;
    let getProductListResponse: GetProductListResponse;
    let cartResponse: CartResponse;
    let accessToken: string;
    let product: Product;
    let quantity: number;

    before(async () => {
        authService = new AuthService();
        cartService = new CartService();
        cartItemService = new CartItemService();
        productService = new ProductService();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const signUpResponse = await authService.signup({ email, password });
        accessToken = signUpResponse.data.session.access_token;

        //get Product
        getProductListResponse = await productService.getProducts(accessToken);
        product = getProductListResponse.products[0];
        //create cart
        cartResponse = await cartService.createCart(accessToken);
    })


    it('Add item to the cart', async () => {
        quantity = 10;
        const cartId = cartResponse.cart_id;
        // Add product to cart
           const addItemToCartRequest: AddItemToCartRequest = {
            product_id: product.id,
            quantity: quantity
        };

        const addItemToCartResponse : AddItemToCartResponse = await cartItemService.addItemToCart(accessToken, addItemToCartRequest, cartId);

        expect(addItemToCartResponse.status).to.equal(201);
        expect(addItemToCartResponse.cart_id).to.equal(cartId);
        expect(addItemToCartResponse.product_id).to.be.equal(product.id);
        expect(addItemToCartResponse.quantity).to.be.equal(quantity);

    })

    it('update item to the cart', async() => {

        let quantity: number = 10;
        const cartId = cartResponse.cart_id;
        // Add product to cart
           const addItemToCartRequest: AddItemToCartRequest = {
            product_id: product.id,
            quantity: quantity
        };

        const addItemToCartResponse : AddItemToCartResponse = await cartItemService.addItemToCart(accessToken, addItemToCartRequest, cartId);


        quantity = 15;
        const cartItemId: string = addItemToCartResponse.cart_item_id;
        const updateItemRequestBody: AddItemToCartRequest = {
            product_id: product.id,
            quantity: quantity
        };

        const updateItemToCartResponse : UpdateItemToCartResponse = await cartItemService.updateItemToCart(accessToken, updateItemRequestBody, cartId, cartItemId);

        expect(updateItemToCartResponse.status).to.equal(200);
        expect(updateItemToCartResponse.cart_id).to.be.equal(cartId);
        expect(updateItemToCartResponse.product_id).to.be.equal(product.id);
        expect(updateItemToCartResponse.quantity).to.be.equal(quantity);

    })

})