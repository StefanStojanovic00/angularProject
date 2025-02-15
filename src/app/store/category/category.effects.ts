import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../services/category/category.service";
import * as categoryAction from "./category.action"
import { Category } from "../../models/category";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    ));

    snackBar=inject( MatSnackBar);

    createCategories$ = createEffect(() =>
        this.actions$.pipe(
          ofType(categoryAction.createCategory),
          mergeMap(({ name }) =>
            this.categoryService.create(name).pipe(
              map((category: Category) => {
                this.snackBar.open('Kategorija je usprešno kreirana', 'Zatvori', {
                  duration: 5000,
                });
                return categoryAction.createCategorySuccess({ category });
              }),
              catchError(({ error }) => {
                this.snackBar.open('Greška na strani servera', 'Zatvori', {
                  duration: 5000,
                });
                return of({ type: error });
              })
            )
          )
        )
      );
    
      deleteCategories$ = createEffect(() =>
        this.actions$.pipe(
          ofType(categoryAction.deleteCategory),
          mergeMap(({ id }) => {
            const categoryId: string = id;
            return this.categoryService.delete(id).pipe(
              map(() => {
                this.snackBar.open('Kategorija je usprešno obrisana', 'Zatvori', {
                  duration: 5000,
                });
                return categoryAction.deleteCategorySuccess({ id: categoryId });
              }),
              catchError(({ error }) => {
                this.snackBar.open('Greška na strani servera', 'Zatvori', {
                  duration: 5000,
                });
                return of({ type: error });
              })
            );
          })
        )
      );
    
      updateCategories$ = createEffect(() =>
        this.actions$.pipe(
          ofType(categoryAction.updateCategory),
          mergeMap(({ id, name }) => {
            const categoryId: string = id;
            const categoryName: string = name;
            return this.categoryService.update(id, name).pipe(
              map(() => {
                this.snackBar.open('Kategorija je usprešno izmenjena', 'Zatvori', {
                  duration: 5000,
                });
                return categoryAction.updateCategorySuccess({
                  id: categoryId,
                  name: categoryName,
                });
              }),
              catchError(({ error }) => {
                this.snackBar.open('Greška na strani servera', 'Zatvori', {
                  duration: 5000,
                });
                return of({ type: error });
              })
            );
          })
        )
      );
 
}