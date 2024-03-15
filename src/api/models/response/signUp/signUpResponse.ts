import { BaseResponse } from "../base/base.response";

export interface SignUpResponse extends BaseResponse {
    data: Data;
}
interface Data {
    user: User;
    session: Session;
}
interface Session {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: User;
}
interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    last_sign_in_at: string;
    app_metadata: Appmetadata;
    user_metadata: Usermetadata;
    identities: Identity[];
    created_at: string;
    updated_at: string;
}
interface Identity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: Identitydata;
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
}
interface Identitydata {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
}
interface Usermetadata {
}
interface Appmetadata {
    provider: string;
    providers: string[];
}