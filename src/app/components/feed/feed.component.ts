import { Component, OnInit } from '@angular/core';
import { LightingAdComponent } from "../lighting-ad/lighting-ad.component";
import { Observable, of } from 'rxjs';
import { lightingAd } from '../../models/lighting-ad';

import { Store } from '@ngrx/store';
import { selectAdsList } from '../../store/lighting-ad/lighting-ad.selector';
import { CommonModule } from '@angular/common';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-feed',
  imports: [LightingAdComponent,CommonModule ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
    ads:lightingAd[] | null =[];

    constructor(private store: Store<AppState>){}

    ngOnInit(): void{
     this.store.select(selectAdsList).subscribe((ads)=>{
      this.ads=ads;
     });
    }
}
