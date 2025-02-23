import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, delay, switchMap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import * as UserActions from './user.actions';
import { LoginUser, User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { setToken, SetUser } from '../../auth/user-context';

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
      switchMap(({ email, password }) =>
        this.userService.login(email, password).pipe(   
                
          map((data: LoginUser) => {
          
            setToken(data.access_token);
            SetUser(data.user);
   
            this.router.navigate(['home'], { replaceUrl: true });
           
            return UserActions.loginSuccess({ data });
          }),
          catchError(({ error }) => {
            this.snackBar.open(
              error.message === 'Unauthorized'
                ? 'Email adresa ili lozinka nisu validni.'
                : 'Greška na strani servera.',
              'Zatvori',
              { duration: 5000 }
            );
            setToken(null);
            SetUser(null);
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );


  logoutUser$=createEffect(()=>
  this.actions$.pipe(ofType(UserActions.logoutUser),
    mergeMap(()=>{
      setToken(null);
      SetUser(null);
     
      

      this.router.navigate(['login'], { replaceUrl: true });
      return of(({type:'logged out'}))
    })));

    registerUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.registerUser),
        mergeMap(({ registerData }) =>
          this.userService.register(registerData).pipe(
            map(() => {
              this.snackBar.open('Uspešno registrovanje.', 'OK');
              this.router.navigate(['login'], { replaceUrl: true });
              return UserActions.registerSuccess();
            }),
            catchError(({ error }) => {
              this.snackBar.open(
                error.message === 'MissingFields'
                  ? 'Popunite sva polja.'
                  : error.message === 'EmailAlreadyExist'
                  ? 'Već postoji registrovan nalog sa tom email adresom.'
                  : 'Greška na strani servera',
                'Zatvori',
                { duration: 5000 }
              );
              return of(UserActions.registerFailure());
            })
          )
        )
      )
    );

    toggleSaved$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.toggleSaveAd),
        mergeMap(({ adId }) =>
          this.userService.toggleSave(adId).pipe(
            map(() => {
              return UserActions.toggleSaveSuccess({ adId: adId });
            }),
            catchError(() => {
              this.snackBar.open('Greška sa serverske strane', 'Zatvori', {
                duration: 5000,
              });
              return of({ type: 'error' });
            })
          )
        )
      )
    );


    editUser$ =createEffect(()=>
    
    this.actions$.pipe(ofType(UserActions.userEdit),
    mergeMap(({user})=>
    this.userService.editProfil(user).pipe(
      map((user2:User)=>{

        this.snackBar.open('Uspesno izmenjen profil','Ok', {duration:5000,});
        SetUser(user2);
        return UserActions.userEditSuccess({user:user2});
      }),
      catchError(({ error }) => {
        this.snackBar.open('Greška na strani servera', 'Zatvori', {
          duration: 3000,
        });
        return of({ type: error });
      })
    ))
    ))



}