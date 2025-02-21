import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { AppState } from '../../app.state';
import { selectCategoryList } from '../../store/category/category.selector';
import { loadCategories } from '../../store/category/category.action';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { searchedAds } from '../../store/lighting-ad/lighting-ad.actions';
import {MatChipsModule} from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule,ReactiveFormsModule,MatChipsModule,MatIconModule,MatInputModule,MatOptionModule, MatCardModule,MatFormFieldModule,MatSelectModule,FontAwesomeModule,NgFor],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;

  user: User | null = null;
  categories: Category[] | null = null;

  //input:string='';
    input = new FormControl(''); 
  
  category=new FormControl();
  queries:string[]=[];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {


    this.store.subscribe((state) => {
      this.user = state.user.user;
    
    });
    this.store.select(selectCategoryList ).subscribe((categories)=>
     
          (this.categories=categories));
          //this.store.dispatch(loadCategories());
  }

  
    handleSearch() {
      this.store.dispatch(
        searchedAds({ input: this.input.value ? this.input.value : '' , categoryId: this.category.value ? this.category.value : '',})
      );     

      if(this.input.value && this.input.value.length > 0)
      {
        this.queries=[];
        this.queries.push(this.input.value);
        this.input.setValue('');
      }
    }

   
      removeQuery(value:string):void
      {
          const index =this.queries.indexOf(value);

          if(index >=0)
          {
            this.queries.splice(index,1);
          }
          this.store.dispatch(
            searchedAds({
              input: this.input.value ? this.input.value : '', categoryId: this.category.value ? this.category.value : ''
            })
          );
      }
}
