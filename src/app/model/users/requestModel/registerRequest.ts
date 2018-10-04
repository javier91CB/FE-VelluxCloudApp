export class RegisterRequest {
    userId: string;
    userName: string;
    nickName: string;
    firstName: string;
    lastName: string;
    password: string;
    claims: Array<string>;
    schedule: Array<string>;
    bornDate: string;
    position: string;
    country: string;
    city: string;
    idPlace: string;
    isActive: boolean;
}
