import { createAction, createFeatureSelector, createSelector, State } from "@ngrx/store";

import { UserState } from "./user.reducer";


/*export const FeatureKey = 'UserState';
export const selectUserState = createFeatureSelector<UserState>(FeatureKey);
export const selectUser = createSelector(selectUserState, (state) => state);*/

/*export const selectUser=createSelector(
    (state:AppState) => state.user,
    (state)=>state.user
)*/

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserFeature,
    (userState) => userState
);


