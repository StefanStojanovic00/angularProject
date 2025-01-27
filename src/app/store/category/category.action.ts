import { createAction, props } from "@ngrx/store";
import { Category } from "../../models/category";

export const loadCategories=createAction('loadCategories');

export const loadCategoriesSuccess=createAction(
    'loadCategoriesSuccess',
    props<{categories:Category[]}>()
);