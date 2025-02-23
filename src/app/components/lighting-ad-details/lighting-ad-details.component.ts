import { Component, inject, OnInit } from '@angular/core';
import { lightingAd } from '../../models/lighting-ad';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectAdById } from '../../store/lighting-ad/lighting-ad.selector';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { User } from '../../models/user';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { adminDeleteAd, deleteAd, loadOneAd } from '../../store/lighting-ad/lighting-ad.actions';
import { toggleSaveAd } from '../../store/user/user.actions';
import { environment } from '../../../enviroments/enviroment';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { selectUser } from '../../store/user/user.selector';

@Component({
  selector: 'app-lighting-ad-details',
  imports: [MatButtonModule,CommonModule,MatMenuModule,MatIconModule,SlickCarouselModule,MatCardModule,MatDividerModule],
  templateUrl: './lighting-ad-details.component.html',
  styleUrl: './lighting-ad-details.component.css',
})
export class LightingAdDetailsComponent implements OnInit {



  adId!:number;
  ad?:lightingAd;
  user: User | null =null;

  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };

  
  baseUrl: string = environment.api + '/';

  constructor(private route:ActivatedRoute, private router: Router,private store: Store<AppState>){
    
  }
   dialog= inject(Dialog);
    confDialog= inject(MatDialog);
  ngOnInit(): void {

    
    this.route.params.subscribe((params)=>(this.adId=params['id']));

    console.log('cascw',this.adId);
    this.store.dispatch(loadOneAd({ adId: this.adId }))
    this.store.select(selectAdById(this.adId)).subscribe((item)=>{
      console.log('item',item);
      this.ad=item;
    });
    this.store.select(selectUser).subscribe((user) => {
         this.user = user.user;  
       });

    console.log('user Brajko',this.user);
    console.log('ad',this.ad);
  }
  handleDelete() {
      if(this.ad!==undefined && this.ad !== null)
        if (this.user?.id === this.ad?.createdBy?.id)
        this.store.dispatch(deleteAd({adId:Number(this.ad.id)}));
  
        else if (this.user?.type === 'admin') {
          this.store.dispatch(adminDeleteAd({ adId: Number(this.ad.id) }));
        }
    }

      handleEdit() {
        this.router.navigate(['edit-ad/'+this.ad?.id]);
      }
      handleSave() {
          if(!this.ad) return;

         const confDialogRef= this.confDialog.open(Component,{
          height:'auto',
          width:'auto',
          data:{
            message:'Da li ste sigurni da zelite da obriste oglas?'
          },
         });

         confDialogRef.afterClosed().subscribe((res)=>{
          if (!res || !res.result || !this.ad) return;

          if(this.user?.id === this.ad.createdBy?.id)
            this.store.dispatch(deleteAd({adId:Number(this.ad.id)}));
         })
      }
  
}
