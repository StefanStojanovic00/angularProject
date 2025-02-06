import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {CdkDragDrop, DragDropModule,moveItemInArray  } from '@angular/cdk/drag-drop';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { User } from '../../models/user';
import { createAd } from '../../store/lighting-ad/lighting-ad.actions';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { selectCategoryList  } from '../../store/category/category.selector';
import { loadCategories } from '../../store/category/category.action';
import { AppState } from '../../app.state';


@Component({
  selector: 'app-create-ad',
  imports: [SlickCarouselModule,MatStepperModule, MatSelectModule, DragDropModule, NavbarComponent,MatCardModule,MatFormFieldModule,NgFor,NgIf,MatInputModule,MatIconModule,MatDividerModule ],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css'
})
export class CreateAdComponent{

  user:  User | null= null;

  constructor(private _formBuilder: FormBuilder,
    private store: Store<AppState>){}

    dataFormGroup!: FormGroup;
  

  imagesFormContorl = new FormControl<String | null> (null,Validators.required);
  categoryControl = new FormControl<String | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  categories: Category[] = [];

  previews: string[] = [];
  sliderPrev: string[] = [];

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];


  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  slideConfigSmall = { slidesToShow: 5, slidesToScroll: 5 };

  imagesSelected: boolean = false;
  file: File | null = null;
 


 
  ngOnInit():void{
    this.store.select(selectCategoryList ).subscribe((categories)=>
 
      (this.categories=categories));
      this.store.dispatch(loadCategories());
    this.store.subscribe((state)=>{

      


      this.dataFormGroup = this._formBuilder.group({
        titleControl: ['', Validators.required],
        priceControl: [0, Validators.max(10000)],
        brandControl: ['', Validators.required],
        caliberControl: ['', Validators.required],
        descControl: ['', Validators.required],
      });

      
      
    });

  }


    handleSelectedFiles(event: any) {
      this.file = event.target.files[0];
      this.selectedFileNames = [];
      this.selectedFiles = event.target.files;
  
      this.previews = [];
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
    this.sliderPrev = [];
  }


    refresh() {
      if (this.previews.length > 0) {
        this.sliderPrev = this.previews;
      } else {
        this.sliderPrev[0] = '../../../assets/common/noImage.png';
      }
      }
      

      handleCreate()
      {
       
        const formData= new FormData();

        if(this.selectedFiles)
          for(let i=0;i<this.selectedFiles.length;i++)
          {
            formData.append('images',this.selectedFiles[i]);
          }

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
}
