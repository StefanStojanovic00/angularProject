import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { LoginUser } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/*
comment why use inject insted constructor :D
Try to use inject() instead of constructor Injecrion
I remember reading about this somewhere in the doc or a GH thread... could not find the post with a quick search at this moment 😅

The root cause is (as i remember) that inject function is scope aware in every case while constructor injection mixes up scopes between different calling modules when standalone api is used.
  */
@Injectable()
export class UserEffects {
  
  //constructor(private actions: Actions, private userService: UserService) {}
  userService = inject(UserService); 
  actions$=inject(Actions);
  snackBar=inject(MatSnackBar);
  router=inject(Router);

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((data:LoginUser) => {
            localStorage.setItem('token', data.access_token);
            this.router.navigate(['home']);

            return UserActions.loginSuccess({ data });
          }),
          catchError(() => {
            this.snackBar.open(
              'Email adresa ili lozinka nisu validni.',
              'Zatvori',
              { duration: 5000 }
            );
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );
}