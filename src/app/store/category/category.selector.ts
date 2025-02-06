/*import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Category } from "../../models/category";





export const selectCategoryFeature  = createSelector(
  
    (state: AppState) => {console.log('stejt',state.category.ids);return state.category;},
    (category) => {console.log('ca',category);return category;}
    
);
export const selectCategoryIds = createSelector(
    selectCategoryFeature,
    (category) => category.ids
  );
  
export const selectCategoryList = createSelector(
    selectCategoryFeature,
    (category) =>
      category.ids
        .map((id) => category.entities[id])
        .filter((category) => category != null)
        .map((category) => <Category>category)
  );*/

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';


export const selectCategoryFeature = createFeatureSelector<CategoryState>('category');

export const selectCategoryIds = createSelector(
  selectCategoryFeature,
  (category) => category.ids
);

export const selectCategoryList = createSelector(
  selectCategoryFeature,
  (category) =>
    category.ids
      .map((id) => category.entities[id])
      .filter((category) => category != null)
);
