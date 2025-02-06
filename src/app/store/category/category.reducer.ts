import { createReducer, on } from "@ngrx/store";
import * as categoryAction from "./category.action"
import { Category } from "../../models/category";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export interface CategoryState  extends EntityState<Category>{}

const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

  
export const initialState: CategoryState = adapter.getInitialState({});


  
  export const categoryReducer = createReducer(
    initialState,
    on(categoryAction.loadCategoriesSuccess, (state, { categories }) => {

      return adapter.setAll(categories, state);
        
    }),
  );