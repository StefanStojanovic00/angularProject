import { Component } from '@angular/core';
import { LightingAdComponent } from "../lighting-ad/lighting-ad.component";
import { Observable, of } from 'rxjs';
import { lightingAd } from '../../models/lighting-ad';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectAdsList } from '../../store/lighting-ad/lighting-ad.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [LightingAdComponent,CommonModule ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
    ads:Observable<lightingAd[]> | null =of([]);

    constructor(private store: Store<AppState>){}

    ngOnInit(): void{
      this.ads=this.store.select(selectAdsList);
    }
}
