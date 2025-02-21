import { categoryReducer } from "./store/category/category.reducer"
import { userReducer } from "./store/user/user.reducer"
import { lightingAdReducer } from "./store/lighting-ad/lighting-ad.reducer"
import { provideState } from "@ngrx/store"


export const appStateProviders = [
    provideState({ name:'user', reducer: userReducer }),
    provideState({ name: 'category', reducer: categoryReducer }),
    provideState({ name:'lightingAd',reducer: lightingAdReducer }),

  ];