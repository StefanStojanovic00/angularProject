import { User } from "./user";


export interface lightingAd
{
    id:string;
    title:string;
    description: string;
    brand: string;
    price: number;
    gallery: string[];
    categoryID:number;
    creator?: User;
}