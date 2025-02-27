import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { lightingAd } from '../../models/lighting-ad';
import { MatCardContent, MatCardFooter, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroment';
import {MatRippleModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lighting-ad',
  imports: [MatRippleModule,MatCardModule,MatDividerModule,MatButtonModule,MatCardTitle, MatCardSubtitle, MatCardContent,MatCardFooter],
  templateUrl: './lighting-ad.component.html',
  styleUrl: './lighting-ad.component.css'
})
export class LightingAdComponent implements OnInit {



   @Input() ad: lightingAd | null =null;

    //imgPath:string ='src\assets';
    
    imgPath: string = environment.api;

    
   constructor(private router:Router)
   {}

   ngOnInit() : void{
  /*  this.imgPath+=this.ad?.gallery[0];
    console.log(this.imgPath);*/
   }


   Details() {
    this.router.navigate(['lighting-ad-details/'+this.ad?.id]);
    }

  
}
