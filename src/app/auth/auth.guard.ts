import { CanActivateFn, Router, RouterEvent } from '@angular/router';
import { getToken, getUser } from './user-context';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  inject } from '@angular/core';
import { Role } from '../enum/role';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';



export const AuthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const token: string | null = getToken();
  
  const authorizedRole = route.data['role'];
  const jwtHelper=new JwtHelperService();
  const store= inject(Store<AppState>);

 
  function getFromUserStore():User |null {
    let user: User | null = null;

      store.subscribe((st)=>{
        user=st.user.user;
      })
      return user;
  }

  const user: User | null = getFromUserStore();

  if(token)
  {
    if(jwtHelper.isTokenExpired(token))
    {
      router.navigate(['login']);
      return false;
    }
    if(!user)
      {
        router.navigate(['login']);
    
        return false;
      }
    
      if(authorizedRole!==user.role && user.role!=Role.Admin)
      {
        router.navigate(['login']);
    
        return false;
      }
      return true;
  } else{
    router.navigate(['login']);
    
        return false;
      }  
  
  


  
};




