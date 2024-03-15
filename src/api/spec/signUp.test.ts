import { expect } from 'chai';
import { AuthService } from '../services/auth.service';
import { SignUpRequest } from '../models/request/signUp/signUpRequest';
import { SignUpResponse } from '../models/response/signUp/signUpResponse';

describe('Signup API Test', () => {

    let authService: AuthService;

    before(() => {
        authService = new AuthService();
    });

    it('should be able to sign up', async () => {

        const randomPart = Math.random().toString(36).substring(2, 6);
        const email = `test${randomPart}@gmail.com`;

        const request: SignUpRequest = {
            email,
            password: 'sdfsdfsdfsddf'
        };

        try {
            const response: SignUpResponse = await authService.signup(request);
            console.log('Response:', response.data);

            expect(response.status).to.equal(201);
            expect(response.data.user.email).to.equal(request.email);

        } catch (error: any) {
            console.error('Error:', error.message);
            throw error;
        }
    });
});

