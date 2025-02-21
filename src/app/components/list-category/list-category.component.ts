import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { Category } from '../../models/category';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../../app.state';
import { selectCategoryList } from '../../store/category/category.selector';
import { createCategory, deleteCategory, updateCategory } from '../../store/category/category.action';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-list-category',
  imports: [CommonModule,MatIconModule,MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatDialogModule,MatButtonModule,MatInputModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css',
  
})
export class ListCategoryComponent implements OnInit {  
  categories: Category[]=[];

  name = new FormControl('',[Validators.required]);
  id?:string;
  edit:boolean =false;
  
  store = inject(Store<AppState>);  
 dialogRef=inject(MatDialogRef<ListCategoryComponent>); 
  

  ngOnInit(): void {
    this.store.select(selectCategoryList ).subscribe((categories)=>
        
             (this.categories=categories));

  }

  handleSubmit() {
    if (this.edit && this.id) {
      if (this.name.value && this.name.value.length > 0)
        this.store.dispatch(
          updateCategory({ id: this.id, name: this.name.value })
        );
        
      this.name.reset();
      this.edit = false;
    } else if (this.name && this.name.value?.length) {
      this.store.dispatch(createCategory({ name: this.name.value }));
      this.name.reset();
    }
    }

    handleEdit(id: string) {
      this.id=id;

      const category=this.categories.find((cat)=> cat.id==id);
      if(category)
      {
        this.name.setValue(category.name);
        this.edit=true;
      }
      }

      handleDelete(id: string) {
        if (id && id.length) {
          this.store.dispatch(deleteCategory({ id: id }));
        }
       }

       handleCancel() {
        this.edit = false;
        this.name.reset();
        }
        
       handleClose() {
        this.dialogRef.close();

      }


}
