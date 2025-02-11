import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { Category } from '../../models/category';
import { environment } from '../../../enviroments/enviroment';
import { AppState } from '../../app.state';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { lightingAd } from '../../models/lighting-ad';
import { loadOneAd, updateAd } from '../../store/lighting-ad/lighting-ad.actions';
import { selectCategoryList } from '../../store/category/category.selector';
import { loadCategories } from '../../store/category/category.action';
import { selectAdById } from '../../store/lighting-ad/lighting-ad.selector';
import { CdkDragDrop, moveItemInArray,DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-edit-ad',
  imports: [DragDropModule,MatCardModule,MatFormFieldModule,MatSelectModule,MatIconModule],
  templateUrl: './edit-ad.component.html',
  styleUrl: './edit-ad.component.css'
})
export class EditAdComponent implements OnInit {
  adId: number = 0;
  ad?: lightingAd;
  selectedCategory: string | null =null;
  title:string='';
  price:number=0;
  description:string='';
  brand:string='';

  categories:Category[]=[];
  previews:string[]= [];
  imgPath:string =environment.api+'/';
  selectedFiles?:FileList;

  constructor(private store:Store<AppState>, private route:ActivatedRoute)
  {}


  ngOnInit(): void {
    this.route.params.subscribe((params)=>
      (this.adId=params['id']));


    this.store.dispatch(loadOneAd({adId:this.adId}));
    this.store.dispatch(loadCategories());
    this.store.select(selectCategoryList ).subscribe((categories)=>
     (this.categories=categories));

    this.store.select(selectAdById(this.adId)).subscribe((item)=>
    {
      this.ad=item;

      if(this.ad)
      {
        this.title = this.ad.title;
        this.price = this.ad.price;
        this.brand = this.ad.brand;
        this.description = this.ad.description;
        this.selectedCategory = this.ad.category.id;
        this.previews = this.ad.gallery;
      }
    })
     
  }

  handleSaveChanges() {
    const formData= new FormData();
    let gallery: string[]=[];

    if(!this.selectedFiles)
    {
      this.previews.forEach((el)=>
      {
        formData.append('gallery',el);
      });
    }

    if(this.selectedFiles)
    {
      for(let i=0;i<this.selectedFiles.length;i++)
      {
        formData.append('images',this.selectedFiles[i]);
      }
    }

    formData.append('id', String(this.ad?.id));
    formData.append('title', this.title);
    formData.append('price', String(this.price));    
    formData.append('brand', this.brand);
    formData.append('description', this.description);
    formData.append('categoryId', String(this.selectedCategory));

    this.store.dispatch(updateAd({ formData }));

    }

    handleSelectedFiles(event: any) {
      
      this.selectedFiles=event.target.files;
      this.previews=[];

      if(this.selectedFiles && this.selectedFiles[0])
        {

          for(let i=0;i<this.selectedFiles.length;i++)

            {
              const reader= new FileReader();

              reader.onload=(ev:any)=>
              {
                this.previews.push(ev.target.result);
              };
              reader.readAsDataURL(this.selectedFiles[i]);
            }
        }

     }

     drop(event:  CdkDragDrop<string[]>) {
      moveItemInArray(this.previews,event.previousIndex,event.currentIndex);
      }

  setTitle(value: string) {
    if(value === '' || !value) return;

    this.title=value;

    }


  setPrice(value: string) {
    if(value === '' || !value) return;

    const val:number=Number(value);
    if(val<0)return ;
    this.price=val;

    }

  setBrand(value: string) {
    if(value === '' || !value) return;

    this.brand=value;
    }

  
 
setDesc(value: string) {
  if(value === '' || !value) return;

    this.description=value;
  }
removeImg(value: string) {
  if(value === '' || !value) return;
  const index:number =Number(value);

  if(index!==-1)
  {
    this.previews.splice(index,1);
  }
  }

            
setCategory(value: any) {
  if(value === '' || !value) return;

  this.selectedCategory=value;
}  









 
}
