import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import * as UserActions from './user.actions';


export interface UserState{
    user: User |null;
    access_token:string;
    loading: boolean;
}

export const initialStateL:UserState={
    user:null,
    access_token:'',
    loading:false
};

export const userReducer=createReducer(
    initialStateL,
    on(UserActions.loginSuccess, (state, action) => ({
        ...state,
        user: action.data.user,
        access_token: action.data.access_token,
        loading:false
      })),
    on(UserActions.loginUser,(state,action)=>({
        ...state,
        loading:true,
    })),
    on(UserActions.loginFailure,(state,action)=>({
        user:null,
        access_token:'',
        loading:false
    })),
    on(UserActions.logoutUser, ()=>({
        user:null,
        access_token:'',
        loading:false
    })),
    on(UserActions.loginFailure, ()=>(
        {
            user:null,
            access_token:'',
            loading:false,
        }
    )),
    on(UserActions.registerSuccess, (state)=>({
        ...state,
        loading:true
    })),
    on(UserActions.registerSuccess, (state) => ({
        ...state,
        loading: false,
      })),
      on(UserActions.registerFailure, (state) => ({
        ...state,
        loading: false,
      }))
);

