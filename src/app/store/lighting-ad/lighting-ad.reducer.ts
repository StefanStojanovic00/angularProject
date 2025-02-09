import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as LActions from './lighting-ad.actions';
import { lightingAd } from '../../models/lighting-ad';





export interface lightingAdState extends EntityState<lightingAd>
{
    category: string | null;
    loading:boolean;
}

export const adapter: EntityAdapter<lightingAd> = createEntityAdapter<lightingAd>();

export const initialState: lightingAdState = adapter.getInitialState({
    // additional entity state properties
    category: null,
    loading:false,
  });


export const lightingAdReducer= createReducer(
   initialState,
    on(LActions.loadAds,(state)=>({
        ...state,
        loading:true,
    })),
    on(LActions.loadAdsSuccess,(state:lightingAdState,{ads})=>{
        return adapter.setAll(ads,{...state,loading:false});
    }),
    on(LActions.loadMyAdsSuccess,(state:lightingAdState,{ads})=>{
        return adapter.setAll(ads,state);
    }),
    on(LActions.deleteAdsSuccess, (state:lightingAdState,{adId})=>
    {
        return adapter.removeOne(adId,state);
    })
  );