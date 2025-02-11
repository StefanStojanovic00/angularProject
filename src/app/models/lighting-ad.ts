import { Category } from "./category";
import { User } from "./user";


export interface lightingAd
{
    id:string;
    title:string;
    description: string;
    brand: string;
    price: number;
    gallery: string[];
    category: Category;
    createdBy?: User;
    isSaved?: boolean;
}