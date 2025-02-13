import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { Route, Router } from '@angular/router';
import { loadCategories } from '../../store/category/category.action';
import { logoutUser } from '../../store/user/user.actions';

import { NgFor, NgIf } from '@angular/common';
import { selectCategoryList } from '../../store/category/category.selector';
import { AppState } from '../../app.state';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-navbar',
  imports: [MatCardModule,MatMenuModule,MatToolbarModule,NgFor,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    user: User | null=null;
    categories: Category[]=[];

    constructor(private store:Store<AppState>, public router:Router)
    {

    }
    baseUrl: string = environment.api + '/';

    ngOnInit():void
    {
      

       this.store.select(selectCategoryList).subscribe((categories)=>
        (this.categories=categories));
       
       this.store.subscribe((state)=>{
        if(this.user)
        this.user=state.user.user;});

    
      
    }

    handleLog()
    {
      if(this.user)
      {
        this.store.dispatch(logoutUser());
      }else
      {
        this.router.navigate(['login']);
      }
    }
    navigate(path: string) {
      this.router.navigate([path]);
    }
    
}
