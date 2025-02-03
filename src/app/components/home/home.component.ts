import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../store/category/category.action';
import { logoutUser } from '../../store/user/user.actions';
import { Category } from '../../models/category';
import { FeedComponent } from "../feed/feed.component";
import { loadAds } from '../../store/lighting-ad/lighting-ad.actions';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatMenuModule, NgIf, NgFor, FeedComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  user:User | null=null;





  constructor(private store:Store<AppState>,private router:Router){}

  ngOnInit():void{
    this.store.dispatch(loadCategories())
    this.store.dispatch(loadAds());
    this.store.subscribe((state)=>
    {
      if(this.user)
      this.user=state.user.user;
    });
    
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  
}
