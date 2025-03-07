import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {CdkDragDrop, DragDropModule,moveItemInArray  } from '@angular/cdk/drag-drop';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { User } from '../../models/user';
import { createAd } from '../../store/lighting-ad/lighting-ad.actions';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { selectCategoryList  } from '../../store/category/category.selector';
import { loadCategories } from '../../store/category/category.action';
import { AppState } from '../../app.state';
import { getUser } from '../../auth/user-context';
import { environment } from '../../../enviroments/enviroment';
import { selectUser } from '../../store/user/user.selector';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-create-ad',
  imports: [MatTooltipModule,MatError,MatButtonModule,CommonModule,ReactiveFormsModule,SlickCarouselModule,MatStepperModule, MatSelectModule, DragDropModule,MatCardModule,MatFormFieldModule,NgFor,NgIf,MatInputModule,MatIconModule,MatDividerModule ],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
  
})
export class CreateAdComponent implements OnInit{


  user:  User | null= null;


   _formBuilder= inject(FormBuilder);
   baseUrl: string = environment.api + '/';

 
  categoryControl = new FormControl<String | null>(null, Validators.required);
 

  categories: Category[] = [];

  dataFormGroup = this._formBuilder.group({
    titleControl: ['', Validators.required],
    priceControl: [0, Validators.max(100000)],
    brandControl: ['', Validators.required],
    descControl: ['', Validators.required],
  });

  previews: string[] = [];
  sliderPrev: string[] = [];

  selectedFiles: File[] = [];
  selectedFileNames: string[] = [];


  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };

  

  

  constructor(private store: Store<AppState>){}

 
  ngOnInit():void{
    
     this.store.select(selectUser).subscribe((user) => {
          this.user = user.user; 
          
        });

    this.store.select(selectCategoryList).subscribe((categories)=>
      (this.categories=categories));
    
   
    

    if (this.categoryControl.value === null && this.categories.length > 0) {
      
      this.categoryControl.setValue(this.categories[0].id);
    };

    this.categoryControl.valueChanges.subscribe((value) => {
    
      });

      
  }
  


    handleSelectedFiles(event: any) {
      this.selectedFiles = event.target.files;
  

     

      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
  
          reader.onload = (e: any) => {
            
            this.previews.push(e.target.result);
            
          };
  
          reader.readAsDataURL(this.selectedFiles[i]);
  
          this.selectedFileNames.push(this.selectedFiles[i].name);
        }
      }
      
    }

  drop(event: CdkDragDrop<any,any,any>) {
    moveItemInArray(this.previews, event.previousIndex, event.currentIndex);
    moveItemInArray( this.selectedFileNames,event.previousIndex, event.currentIndex);
    this.sliderPrev = [];
  }


    refresh() {
      if (this.previews.length > 0) {
        this.sliderPrev = this.previews;
        
      } else {
        this.sliderPrev[0] = '../../../assets/noImage.png';
       
      }
      }
      

      handleCreate()
      {
       
        const formData= new FormData();

        this.selectedFileNames.forEach((img) => {
          for (let i = 0; i < this.selectedFiles.length; i++) {
            if (img == this.selectedFiles[i].name)
              formData.append('images', this.selectedFiles[i]);
          
          }
        });

          formData.append(
            'title',
            this.dataFormGroup.controls['titleControl'].value!
          );
          formData.append(
            'price',
            String(this.dataFormGroup.controls['priceControl'].value)
          );
          formData.append(
            'brand',
            this.dataFormGroup.controls['brandControl'].value!
          );
          formData.append('categoryId', <string>this.categoryControl.value);
          formData.append('description', this.dataFormGroup.controls['descControl'].value!);
      
  
          this.store.dispatch(createAd({ formData }));
          
      }
      
      removeImg(value: string) {
        const index: number = Number(value);
        
      this.previews.splice(index, 1);
      this.selectedFileNames.splice(index, 1);

  
        }
}
