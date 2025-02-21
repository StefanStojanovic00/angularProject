import { createAction, createFeatureSelector, createSelector, State } from "@ngrx/store";

import { UserState } from "./user.reducer";

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserFeature,
    (userState) => userState
);


