import { createAction, props } from '@ngrx/store';
import { LoginUser, RegisterUser } from '../../models/user';



export const loginUser=createAction(
    'loginUser',
    props<{email:string;password:string}>()
);


export const loginSuccess=createAction(
    'loginSuccess',
    props<{data:LoginUser}>()
)

export const loginFailure= createAction(
    'loginFailure',
    props<{error:string}>()
);

export const registerUser=createAction(
    'registerUser',
    props<{registerData:RegisterUser}>()
)

export const registerSuccess = createAction('registerSuccess');
export const registerFailure = createAction('registerFailure');
export const logoutUser = createAction('logoutUser');