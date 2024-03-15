
import { CartService } from "../services/cart.service";
import { expect } from "chai";
import { AuthService } from "../services/auth.service";
import { faker } from "@faker-js/faker";


describe('Cart API', () => {

    let authService: AuthService;
    let cartService: CartService
    let accessToken: string;

    before(async () => {
        authService = new AuthService();
        cartService = new CartService();

        const email = faker.internet.email();
        const password = faker.internet.password();

        const signUpResponse = await authService.signup({ email, password });
        accessToken = signUpResponse.data.session.access_token;

    })


    it('should able to create, get, and delete the cart', async () => {
        try {
            if (!accessToken) {
                throw new Error('Access token is not available');
            }
            const createCartResponse = await cartService.createCart(accessToken);
            expect(createCartResponse.status).to.equal(201);
            expect(createCartResponse.cart_id).to.not.be.undefined;

            const getCartResponse = await cartService.getCart(accessToken);
            expect(getCartResponse.status).to.equal(200);
            expect(getCartResponse.cart_id).to.not.be.undefined;

            let cartId: string = getCartResponse.cart_id;

            const deleteCartResponse = await cartService.deleteCart(accessToken, cartId);
            expect(deleteCartResponse.status).to.equal(200);
            expect(deleteCartResponse.message).to.equal('Cart deleted')


        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    })


})