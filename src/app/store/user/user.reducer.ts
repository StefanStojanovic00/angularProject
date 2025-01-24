import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import * as UserActions from './user.actions';


export interface UserState{
    user: User |null;
    access_token:string;
}

export const initialStateL:UserState={
    user:null,
    access_token:'',
};

export const userReducer=createReducer(
    initialStateL,
    on(UserActions.loginSuccess, (state, action) => ({
        ...state,
        user: action.data.user,
        access_token: action.data.access_token,
      }))
);