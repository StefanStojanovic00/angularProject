import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../models/user';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectAdsList } from '../../store/lighting-ad/lighting-ad.selector';
import { lightingAd } from '../../models/lighting-ad';
import { loadAds } from '../../store/lighting-ad/lighting-ad.actions';
import { FeedComponent } from '../feed/feed.component';
@Component({
  selector: 'app-my-ads',
  imports: [MatCardModule,FeedComponent],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css'
})
export class MyAdsComponent implements OnInit {
  user: User | null= null;

  constructor(private store: Store<AppState>){}
  
  ads: lightingAd[] = [];
  
  
  ngOnInit(): void {
    this.store.select(selectAdsList ).subscribe((ads)=>
     
          (this.ads=ads));
    this.store.dispatch(loadAds());
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }

  
  
  
}
