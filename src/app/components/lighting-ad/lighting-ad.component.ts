import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { lightingAd } from '../../models/lighting-ad';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-lighting-ad',
  imports: [MatCardModule,MatDividerModule],
  templateUrl: './lighting-ad.component.html',
  styleUrl: './lighting-ad.component.css'
})
export class LightingAdComponent {

   @Input() ad: lightingAd | null =null;

   imgPath:string ='src\assets';

   constructor()
   {}

   ngOnInit() : void{
    this.imgPath+=this.ad?.gallery[0];
   }
}
