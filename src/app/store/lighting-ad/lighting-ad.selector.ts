/*import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { lightingAd } from '../../models/lighting-ad';

export const selectAdsFeature=createSelector(
    (state:AppState) => state.lightAd || { ids: [], entities: {} }, 
    (lightAd)=>lightAd
);

export const SelectAdsIds=createSelector(
    selectAdsFeature,
    (lightingAd)=> lightingAd.ids 
);

export const selectAdsList= createSelector(
    selectAdsFeature,
    (lightingAd)=>lightingAd.ids 
    .map((id)=>lightingAd.entities[id])
    .filter((lightingAd)=> lightingAd!=null)
    .map((lightingAd)=><lightingAd>lightingAd)
)*/

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lightingAdState } from "./lighting-ad.reducer";



export const selectAdsFeature = createFeatureSelector<lightingAdState>('lightingAd');

export const selectAdsIds = createSelector(
    selectAdsFeature,
    (lightingAd) => lightingAd.ids 
);

export const selectAdsList = createSelector(
    selectAdsFeature,
    (lightingAd) =>
        lightingAd.ids
            .map((id) => lightingAd.entities[id])
            .filter((ad) => ad != null) 
);
/*
export const selectAdById=(id:number)=>createSelector(
    selectAdsFeature,
    (ads)=> {return ads.entities[id];}
)*/
export const selectAdById = (id: number) => createSelector(selectAdsFeature, (ads) => {
    return ads.entities[id];
  });
