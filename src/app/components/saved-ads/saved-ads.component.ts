import { Component, OnInit } from '@angular/core';
import { FeedComponent } from "../feed/feed.component";
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { loadSavedAds } from '../../store/lighting-ad/lighting-ad.actions';

@Component({
  selector: 'app-saved-ads',
  imports: [FeedComponent],
  templateUrl: './saved-ads.component.html',
  styleUrl: './saved-ads.component.css',
})
export class SavedAdsComponent  implements OnInit{
  
  constructor(private store:Store<AppState>){}
  
  ngOnInit(): void {
   this.store.dispatch(loadSavedAds());
  }

}
