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
  console.log('radIM');
 
  function getFromUserStore():User |null {
    let user: User | null = null;
      
    store.select(selectUser).subscribe((user2) => {
          user = user2.user;  
          console.log('auth',user);
        });
    
    /*  store.subscribe((st)=>{
        user=st.user.user;
        console.log('auth',user);
      })*/
      
      return user;
  }

  const user: User | null = getFromUserStore();
  if(token)
  {
    if(jwtHelper.isTokenExpired(token))
    {
      console.log('uso 1');
      router.navigate(['login']);
      return false;
    }
    if(!user)
      {
        console.log('uso 2');
        router.navigate(['login']);
    
        return false;
      }
    
      if(authorizedRole!==user.type && user.type!=Role.Admin)
      {
        console.log('uso 3');
        router.navigate(['login']);
    
        return false;
      }
      console.log('uso 4');
      return true;
  } else{
    console.log('uso 5');
    router.navigate(['login']);

        return false;
      }  
  
};




