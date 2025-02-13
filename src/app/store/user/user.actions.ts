import { createAction, props } from '@ngrx/store';
import { LoginUser, RegisterUser, User } from '../../models/user';



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

export const toggleSaveAd = createAction(
    'toggleSaveAd',
    props<{ adId: number }>()
  );
  export const toggleSaveSuccess = createAction(
    'toggleSaveSuccess',
    props<{ adId: number }>()
  );

export const userEdit= createAction(
    'userEdit',
    props<{user:FormData}>()
)
export const userEditSuccess= createAction(
    'userEditSuccess',
    props<{user:User}>()
)