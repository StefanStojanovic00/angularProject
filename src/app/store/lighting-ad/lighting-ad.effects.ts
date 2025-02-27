import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LightingAdService } from "../../services/lightingAd/lighting-ad.service";
import * as LActions from './lighting-ad.actions';
import { catchError, map, mergeMap, of, retry } from "rxjs";
import { lightingAd } from "../../models/lighting-ad";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { merge } from "jquery";


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
    mergeMap(({ formData }) =>
      this.LightingAdService.create(formData).pipe(
        map((lAd) => {
          this.snackBar.open('Vaš oglas je uspešno kreiran!', 'Uredu', {
            duration: 5000,
          });
          this.router.navigate([`gun-ad-details/${lAd.id}`], {
            replaceUrl: true,
          });
          return LActions.createAdSuccess({ ad: lAd });
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
              console.log('uso');
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


      loadOneAd$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LActions.loadOneAd),
          mergeMap(({adId}) =>
            this.LightingAdService.getOne(adId).pipe(
              map((ad: lightingAd) => {
                return LActions.loadOneAdSuccess({ ad });
              }),
              catchError(({ error }) => {
                return of({ type: error.message  });
              })
            )
          )
        )
      );

      loadSavedAd$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LActions.loadSavedAds),
          mergeMap(() =>
            this.LightingAdService.getByUserSaved().pipe(
              map((ads: lightingAd[]) => {
                return LActions.loadSavedAdsSuccess({ ads });
              }),
              catchError(({ error }) => {
                return of({  type: error.message });
              })
            )
          )
        )
      );

    searchAd$= createEffect(()=>
    this.actions$.pipe(
      ofType(LActions.searchedAds),
      mergeMap(({input,categoryId})=>
      this.LightingAdService.getBySearch(input,categoryId).pipe(
        map((ads:lightingAd[])=>{
          return LActions.searchAdsSuccess({ads});
        }),
        catchError(({ error }) => {
          return of({  type: error.message });
        })       
      ),
        
      ))
    );

    updateAd$=createEffect(()=>
      this.actions$.pipe(
        ofType(LActions.updateAd),
        mergeMap((action)=>
        this.LightingAdService.update(action.formData).pipe(
          map((ad)=>{
            if(ad)
            {
              this.router.navigate(['lighting-ad-details/'+ad.id],{replaceUrl:true});
              this.snackBar.open('Izmenjen oglas','Ok',{duration:5000});
              
            }
            return LActions.updateAdSeccess({ad:ad});
          }),
          catchError(({ error }) => {
            this.snackBar.open('Greška na strani servera', 'Zatvori', {
              duration: 5000,
            });
            return of({  type: error.message });
          }) 
        ))
      )
      
    )


    adminDleteAd$=createEffect(()=>
    this.actions$.pipe(ofType(LActions.adminDeleteAd),
    mergeMap(({adId})=>{
      const id:number=adId;
      return this.LightingAdService.adminDelete(adId).pipe(
        map((res)=>{
          if(res.success)
          {
            this.snackBar.open('Oglas je obrisan','Zatvori',{duration:5000,});
            this.router.navigate(['home'],{replaceUrl:true});
          }
          return LActions.adminDeleteAdSuccess({adId:id});
        })
      )
    }),catchError(({ error }) => {
      this.snackBar.open('Greška na strani servera', 'Zatvori', {
        duration: 5000,
      });
      return of({  type: error.message });
    }))
    );



    
}