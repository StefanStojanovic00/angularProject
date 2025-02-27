import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { getToken, getUser } from './user-context';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  inject } from '@angular/core';
import { Role } from '../enum/role';
import { select, State, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { firstValueFrom, take } from 'rxjs';
import { selectUser } from '../store/user/user.selector';



export const AuthGuard: CanActivateFn = async (route:ActivatedRouteSnapshot, state) => {
  
  const router = inject(Router);
  const token: string | null = getToken();
  
  const authorizedRole = route.data['role'];
  const jwtHelper=new JwtHelperService();
  const store= inject(Store<AppState>);

 
  function getFromUserStore():User |null {
    let user: User | null = null;
      
    store.select(selectUser).subscribe((user2) => {
          user = user2.user;  

        });
    
 
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
    
      if(authorizedRole!==user.type && user.type!=Role.Admin)
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




