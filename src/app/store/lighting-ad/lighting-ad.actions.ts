import { createAction, props } from "@ngrx/store";
import { lightingAd } from "../../models/lighting-ad";


export const loadAds=createAction('loadAds');

export const loadAdsSuccess=createAction(
    'loadAdsSuccess',
    props<{ads:lightingAd[]}>()
);

export const createAd=createAction('createAd', props<{formData:FormData}>());

export const createAdSuccess=createAction('createAdSuccess');