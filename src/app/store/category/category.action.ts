import { createAction, props } from "@ngrx/store";
import { Category } from "../../models/category";

export const loadCategories=createAction('loadCategories');

export const loadCategoriesSuccess=createAction(
    'loadCategoriesSuccess',
    props<{categories:Category[]}>()
);

export const createCategory = createAction(
    'createCategory',
    props<{ name: string }>()
  );
  export const createCategorySuccess = createAction(
    'createCategorySuccess',
    props<{ category: Category }>()
  );
  


  export const deleteCategory = createAction(
    'deleteCategory',
    props<{ id: string }>()
  );
  export const deleteCategorySuccess = createAction(
    'deleteCategorySuccess',
    props<{ id: string }>()
  );

  
  
  export const updateCategory = createAction(
    'updateCategory',
    props<{ id: string; name: string }>()
  );
  export const updateCategorySuccess = createAction(
    'updateCategorySuccess',
    props<{ id: string; name: string }>()
  );