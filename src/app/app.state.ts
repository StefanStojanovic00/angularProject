import { CategoryState } from "./store/category/category.reducer";
import { lightingAdState } from "./store/lighting-ad/lighting-ad.reducer";
import { UserState } from "./store/user/user.reducer";


export interface AppState{
    user:UserState;
    category: CategoryState;
    lightAd: lightingAdState;
}