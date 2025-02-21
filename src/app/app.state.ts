import { ActionReducerMap } from "@ngrx/store";
import { categoryReducer, CategoryState } from "./store/category/category.reducer";
import { lightingAdReducer, lightingAdState } from "./store/lighting-ad/lighting-ad.reducer";
import { userReducer, UserState } from "./store/user/user.reducer";


export interface AppState{
    user: UserState;
    category: CategoryState;
    lightingAd: lightingAdState;
}


/*export const reducersS: ActionReducerMap<AppState> = {
        user:userReducer,
        lightingAd:lightingAdReducer,
        category:categoryReducer,
    
  };*/
  