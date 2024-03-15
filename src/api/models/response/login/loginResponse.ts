import { BaseResponse } from "../base/base.response";


export interface LoginResponse extends BaseResponse{
    status: number;
    data: Data;
}

export interface Data {
    user: User;
    session: Session;
}

export interface Session {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: User;
}

export interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: Date;
    phone: string;
    confirmed_at: Date;
    last_sign_in_at: Date;
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    identities: Identity[];
    created_at: Date;
    updated_at: Date;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

export interface Identity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: IdentityData;
    provider: string;
    last_sign_in_at: Date;
    created_at: Date;
    updated_at: Date;
    email: string;
}

export interface IdentityData {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
}

export interface UserMetadata {
}

