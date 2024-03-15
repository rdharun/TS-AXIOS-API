import { expect } from 'chai';
import { LoginResponse } from '../models/response/login/loginResponse';
import { LoginService } from '../services/login.service';
import loginTestData from '../resources/login.json';


describe('Login API Test', () => {

    let loginService: LoginService;

    before(() => {
        loginService = new LoginService();
    })

    it('should be able to login', async () => {
        try {
            const response: LoginResponse = await loginService.login(loginTestData);
            console.log('Response:', response.data);

            expect(response.status).to.equal(200);
            expect(response.data.user.email).to.equal(loginTestData.email);

        } catch (error: any) {
            console.error('Error:', error.message);
            throw error;
        }
    });
});

