import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LightingAdService } from "../../services/lightingAd/lighting-ad.service";
import * as LActions from './lighting-ad.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { lightingAd } from "../../models/lighting-ad";


@Injectable()
export class lightingAdEffects
{
    LightingAdService = inject(LightingAdService); 
    actions$=inject(Actions);

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
    
}