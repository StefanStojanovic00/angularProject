import { createAction, props } from '@ngrx/store';
import { LoginUser } from '../../models/user';



export const loginUser=createAction(
    'loginUser',
    props<{email:string;password:string}>()
);


export const loginSuccess=createAction(
    'loginSuccess',
    props<{data:LoginUser}>()
)