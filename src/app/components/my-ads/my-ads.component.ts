import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../models/user';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectAdsList } from '../../store/lighting-ad/lighting-ad.selector';
import { lightingAd } from '../../models/lighting-ad';
import { loadAds, loadMyAds } from '../../store/lighting-ad/lighting-ad.actions';
import { FeedComponent } from '../feed/feed.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditProfilComponent } from '../edit-profil/edit-profil.component';
import { environment } from '../../../enviroments/enviroment';
import { userEdit } from '../../store/user/user.actions';
import { selectUser } from '../../store/user/user.selector';

@Component({
  selector: 'app-my-ads',
  imports: [MatIconModule,MatCardModule,FeedComponent],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css',

})
export class MyAdsComponent implements OnInit {

  user: User | null= null;
  baseUrl: string = environment.api + '/';

  constructor(private store: Store<AppState>, private dialog: MatDialog){}

  ads: lightingAd[] = [];
  
  
  ngOnInit(): void {
  /*  this.store.select(selectAdsList ).subscribe((ads)=>
     
          (this.ads=ads));*/
    this.store.dispatch(loadMyAds());
    this.store.select(selectUser).subscribe((user) => {
            this.user = user.user;  
          });
  }

  handleEdit() {
    const dialogRef=this.dialog.open(EditProfilComponent,
      {
        width:'auto', 
        height:'auto',
      }
    );

    dialogRef.afterClosed().subscribe(dig=>{
      if(!dig) return;

      const formData: FormData =new FormData();

      formData.append('firstName', dig.firstName);
      formData.append('lastName', dig.lastName);
      formData.append('phone', dig.phone);
      formData.append('image',dig.image);
      
      
      

      this.store.dispatch(userEdit({ user: formData }));
        
    })
    }

  
  
  
}
