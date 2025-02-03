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
import { AppState } from '../../app.state';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-create-ad',
  imports: [MatStepperModule, MatSelectModule, DragDropModule, NavbarComponent,MatCardModule,MatFormFieldModule,NgFor,NgIf,MatInputModule ],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css'
})
export class CreateAdComponent{


  constructor(private _formBuilder: FormBuilder,
    private store: Store<AppState>){}

    dataFormGroup!: FormGroup;
  

  imagesFormContorl = new FormControl<String | null> (null,Validators.required);
  categoryControl = new FormControl<String | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  categories: Category[] = [];

  previews: string[] = [];
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  imageInfos?: Observable<any>;

 // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit():void{
    this.store.subscribe((state)=>{
      
      console.log('state.category:', state?.category);
    console.log('state.category.categories:', state?.category?.categories);
      this.categories = state.category?.categories;
      this.dataFormGroup= this._formBuilder.group({
        titleControl:['',Validators.required]
      });
    });
  }




 /* openFilePicker() {
    this.fileInput.nativeElement.click();
    }

  handleSelectedFiles() {
    const input= this.fileInput.nativeElement;
    if (!input.files?.length) return;

    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = input.files;
    this.previews = [];
    
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
    }*/

    handleSelectedFiles(event: any) {
      this.message = [];
      this.progressInfos = [];
      this.selectedFileNames = [];
      this.selectedFiles = event.target.files;
  
      this.previews = [];
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
  
          reader.onload = (e: any) => {
            console.log(e.target.result);
            this.previews.push(e.target.result);
          };
  
          reader.readAsDataURL(this.selectedFiles[i]);
  
          this.selectedFileNames.push(this.selectedFiles[i].name);
        }
      }
    }

  drop(event: CdkDragDrop<any,any,any>) {
    moveItemInArray(this.previews, event.previousIndex, event.currentIndex);
    }
}
