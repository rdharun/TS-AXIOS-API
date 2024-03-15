import axios from 'axios';

import { SignUpRequest } from '../models/request/signUp/signUpRequest';
import { SignUpResponse } from '../models/response/signUp/signUpResponse';

import { BaseService } from './base.service';



export class AuthService extends BaseService {

    async signup(request: SignUpRequest): Promise<SignUpResponse> {

        const url: string = `${this.getBaseUrl()}/api/auth/signup`;

        try {
            const response = await axios.post(url, request);

            const signUpResponse: SignUpResponse = response.data;
            signUpResponse.status = response.status;
            return signUpResponse;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }

}





