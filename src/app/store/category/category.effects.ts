import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../services/category/category.service";
import * as categoryAction from "./category.action"
import { Category } from "../../models/category";
import { catchError, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class CategoryEffects {
   actions$=inject(Actions);
    categoryService=inject(CategoryService);

    loadCategories$ = createEffect(()=>
    this.actions$.pipe(
        ofType(categoryAction.loadCategories),
        mergeMap(()=>
        this.categoryService.getAll().pipe(
            map((categories:Category[])=>{
                return categoryAction.loadCategoriesSuccess({categories});
                
            }),
            catchError(({error})=>{
                return of({type:error.message});
            })
        ))
    ))
 
}