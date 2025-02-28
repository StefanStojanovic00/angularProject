
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

export const selectAdById = (id: number) => createSelector(selectAdsFeature, (ads) => {
    return ads.entities[id];
  });
