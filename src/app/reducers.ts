import { combineReducers } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";
import { lightingAdReducer } from "./store/lighting-ad/lighting-ad.reducer";
import { categoryReducer } from "./store/category/category.reducer";

export const reducers= combineReducers({
    user:userReducer,
    lightingAd:lightingAdReducer,
    category:categoryReducer,
})