import { Component, OnInit } from '@angular/core';
import { lightingAd } from '../../models/lighting-ad';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectAdById } from '../../store/lighting-ad/lighting-ad.selector';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { User } from '../../models/user';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { deleteAd } from '../../store/lighting-ad/lighting-ad.actions';


@Component({
  selector: 'app-lighting-ad-details',
  imports: [MatMenuModule,MatIconModule,SlickCarouselModule,MatCardModule,MatDividerModule],
  templateUrl: './lighting-ad-details.component.html',
  styleUrl: './lighting-ad-details.component.css'
})
export class LightingAdDetailsComponent implements OnInit {


  adId!:number;
  ad?:lightingAd;
  user: User | null =null;

  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };



  constructor(private router:ActivatedRoute,private store: Store<AppState>){
    
  }
  ngOnInit(): void {
    this.router.params.subscribe((params)=>(this.adId=params['adId']));

    this.store.select(selectAdById(this.adId)).subscribe((item)=>{
      this.ad=item;
    });
    this.store.subscribe(state => {
      this.user = state.user.user;
    })
  }
  handleDelete() {
      if(this.ad!==undefined && this.ad !== null)
        this.store.dispatch(deleteAd({adId:Number(this.ad.id)}));
    }
  
}
