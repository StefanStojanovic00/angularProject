import { createReducer, on } from "@ngrx/store";
import * as categoryAction from "./category.action"
import { Category } from "../../models/category";


export interface CategoryState {
    categories: Category[];
  }
  
  export const initialState: CategoryState = {
    categories: [],
  };
  
  export const categoryReducer = createReducer(
    initialState,
    on(categoryAction.loadCategoriesSuccess, (state, action) => ({
      categories: action.categories,
    }))
  );