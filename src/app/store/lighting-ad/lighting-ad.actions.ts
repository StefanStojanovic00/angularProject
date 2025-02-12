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

export const loadOneAd = createAction(
  'loadSingleAd',
  props<{ adId: number }>()
);
export const loadOneAdSuccess = createAction(
  'loadSingleAdSuccess',
  props<{ ad: lightingAd }>()
);

export const loadSavedAds = createAction('loadSavedAds');
export const loadSavedAdsSuccess = createAction(
  'loadSavedAdsSuccess',
  props<{ ads: lightingAd[] }>()
);


export const searchedAds= createAction(
  'searchedAds',
  props<{input:string, categoryId:string}>()
);
export const searchAdsSuccess=createAction(
  'searchAdsSuccess',
  props<{ads:lightingAd[]}>()
);

export const updateAd=createAction(
  'updateAction',
  props<{formData:FormData}>()    
);
export const updateAdSeccess=createAction(
  'updateAdSeccess',
  props<{ad:lightingAd}>()
)

export const adminDeleteAd=createAction(
  'adminDeleteAd',
  props<{adId:number}>()
);
export const adminDeleteAdSuccess=createAction(
  'adminDeleteAdSuccess',
  props<{adId:number}>()
);