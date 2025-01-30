import { createSelector } from "@ngrx/store";
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
)