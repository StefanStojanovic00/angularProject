import { createAction, props } from "@ngrx/store";
import { lightingAd } from "../../models/lighting-ad";


export const loadAds=createAction('loadAds');

export const loadAdsSuccess=createAction(
    'loadAdsSuccess',
    props<{ads:lightingAd[]}>()
);

export const createAd=createAction('createAd', props<{formData:FormData}>());

export const createAdSuccess=createAction('createAdSuccess');

export const loadMyAds = createAction('loadMyAds');
export const loadMyAdsSuccess = createAction(
  'loadMyAdsSuccess',
  props<{ ads: lightingAd[] }>()
);



export const deleteAd = createAction(
  'deleteAd',
  props<{ adId:number  }>()
);
export const deleteAdsSuccess = createAction(
  'deleteAdsSuccess',
  props<{ adId:number  }>()
);
