import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { Route, Router } from '@angular/router';
import { loadCategories } from '../../store/category/category.action';
import { logoutUser } from '../../store/user/user.actions';
import { AppState } from '../../app.state';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MatCardModule,MatMenuModule,MatToolbarModule,NgFor,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    user: User | null=null;
    categories: Category[]=[];

    constructor(private store:Store<AppState>, private router:Router)
    {

    }

    ngOnInit():void
    {
      this.store.dispatch(loadCategories());
      this.store.subscribe((state)=>{
        if(this.user)
        this.user=state.user.user;
        if(state.category)
        this.categories=state.category.categories;
      });
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
