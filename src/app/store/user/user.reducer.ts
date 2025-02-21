import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import * as UserActions from './user.actions';
import { getToken, getUser } from "../../auth/user-context";


export interface UserState{
    user: User |null;
    access_token:string | null;
    loading: boolean;
}

export const initialState:UserState={
    user:getUser(),
    access_token:getToken(),
    loading:false,
};

export const userReducer=createReducer(
    initialState,
    on(UserActions.loginUser, (state) => ({
        ...state,
        loading: true,
      })),
      on(UserActions.logoutUser, () => ({
        user: null,
        access_token: null,
        loading: false,
      })),
      on(UserActions.loginSuccess, (state, { data }) => ({
        user: data.user,
        access_token: data.access_token,
        loading: false,
      })),
      on(UserActions.loginFailure, () => ({
        user: null,
        access_token: null,
        loading: false,
      })),
      on(UserActions.registerSuccess, (state) => ({
        ...state,
        loading: true,
      })),
      on(UserActions.registerSuccess, (state) => ({
        ...state,
        loading: false,
      })),
      on(UserActions.registerFailure, (state) => ({
        ...state,
        loading: false,
      })),
      on(UserActions.userEditSuccess, (state, { user }) => ({
        ...state,
        user: user,
      }))
);

