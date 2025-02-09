import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LightingAdService } from "../../services/lightingAd/lighting-ad.service";
import * as LActions from './lighting-ad.actions';
import { catchError, map, mergeMap, of, retry } from "rxjs";
import { lightingAd } from "../../models/lighting-ad";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";


@Injectable()
export class lightingAdEffects
{
    LightingAdService = inject(LightingAdService); 
    actions$=inject(Actions);
    snackBar=inject(MatSnackBar);
    router=inject(Router);

    loadAd$= createEffect(()=>
        this.actions$.pipe(
            ofType(LActions.loadAds),
            mergeMap(()=> this.LightingAdService.getAll().pipe(
                map((ads:lightingAd[])=>
                {
                   return LActions.loadAdsSuccess({ads});
                }),
                catchError(({error})=>{
                    return of({type:'err'});
                })
            )  )
                
        )
    )

    createAd$= createEffect(()=>
    this.actions$.pipe(ofType(LActions.createAd),
mergeMap((action)=> this.LightingAdService.create(action.formData).pipe(
    map((res)=>{
        console.log(res);
        if(res)
        {
            this.router.navigate(['home']);
            this.snackBar.open(
                'Uspesno kreiran oglas',
                'Uredu',
                { duration: 5000 }
            );
        }
        return LActions.createAdSuccess();
    }),
    catchError(({error})=>{
        console.log(error.message);
        this.snackBar.open(
          'Greška na strani servera',
          'Zatvori',
          { duration: 5000 }
        );
        return of({type:'err'});
    })
))));


    loadMyAd$= createEffect(()=>
    this.actions$.pipe(
        ofType(LActions.loadMyAds),
        mergeMap(()=>
        this.LightingAdService.getByUser().pipe(
            map((ads:lightingAd[])=>{
                return LActions.loadMyAdsSuccess({ads});
            }),
            catchError(({error})=>
            {
                return of({type:error.message});
            })
        ))
    ))

    deleteAd$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LActions.deleteAd),
          mergeMap((action) => {
            const id: number = action.adId;
            return this.LightingAdService.delete(action.adId).pipe(
              map((res) => {
                if (res.success) {
                  this.snackBar.open('Obrisan oglas.', 'Zatvori', {duration: 5000,});
                }
                this.router.navigate(['home'], { replaceUrl: true });
                return LActions.deleteAdsSuccess({ adId: id });
              }),
              catchError(({ error }) => {
                this.snackBar.open(error.message, 'Zatvori', {
                  duration: 5000,
                });
                return of({ type: error.message });
              })
            );
          })
        )
      );
    
}