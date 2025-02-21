import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../store/category/category.action';
import { logoutUser } from '../../store/user/user.actions';
import { Category } from '../../models/category';
import { FeedComponent } from "../feed/feed.component";
import { loadAds } from '../../store/lighting-ad/lighting-ad.actions';
import { NavbarComponent } from "../navbar/navbar.component";
import { AppState } from '../../app.state';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";
import { selectUser } from '../../store/user/user.selector';
@Component({
  selector: 'app-home',
  imports: [MatIconModule, ToolbarComponent, MatToolbarModule, MatMenuModule,  FeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit {

  user:User | null=null;

  constructor(private store:Store<AppState>,private router:Router){}

  ngOnInit():void{
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadAds());
 

    this.store.select(selectUser).subscribe((user) => {
      this.user = user.user;  
    });

  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  
}
