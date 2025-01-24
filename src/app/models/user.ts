import { Role } from "../enum/role";

export interface User
{
    id: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface LoginUser{
    user:User,
    access_token:string;
}