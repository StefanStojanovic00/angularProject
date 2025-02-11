import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as LActions from './lighting-ad.actions';
import { lightingAd } from '../../models/lighting-ad';
import * as UserActions from '../user/user.actions';



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
    }),
    on(LActions.loadOneAdSuccess,(state:lightingAdState,{ad})=>{
        return adapter.setOne(ad,state);
    }),
    on(LActions.loadSavedAdsSuccess,(state:lightingAdState,{ads})=>{
        return adapter.setAll(ads,state);
    }),
    on(UserActions.toggleSaveSuccess, (state: lightingAdState, { adId }) => {
        return adapter.updateOne(
          {
            id: adId,
            changes: {
              ...state.entities[adId],
              isSaved: !state.entities[adId]?.isSaved,
            },
          },
          state
        );
    }),
    on(LActions.searchAdsSuccess,(state:lightingAdState,{ads})=>
    {
      return adapter.setAll(ads,state);
    }),
    on(LActions.updateAdSeccess, (state:lightingAdState,{ad})=>{
      return adapter.updateOne(
        {
          id: ad.id,
            changes: {
              title: ad.title,
              description: ad.description,
              brand: ad.brand,
              price: ad.price,
              gallery: ad.gallery,
            },
          },state
      );
    }),
  );