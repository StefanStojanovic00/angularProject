import { CategoryState } from "./store/category/category.reducer";
import { UserState } from "./store/user/user.reducer";

export interface AppState{
    user:UserState;
    category: CategoryState;
}