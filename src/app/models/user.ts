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

export interface RegisterUser{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}