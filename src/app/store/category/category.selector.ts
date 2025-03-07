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
