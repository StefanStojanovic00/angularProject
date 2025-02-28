import { Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../../models/user';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { environment } from '../../../enviroments/enviroment';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { selectUser } from '../../store/user/user.selector';


@Component({
  selector: 'app-edit-profil',
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatCardModule,MatChipsModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule ],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css',
  
})
export class EditProfilComponent implements OnInit {

    user: User | null = null;

    firstName= new FormControl('',[Validators.required]);
    lastName= new FormControl('', [Validators.required]);
    phone=new FormControl('',[Validators.required]);

    imagePreview: string | null= null;
    selectedImage: File | null=null;

    dialogRef= inject(MatDialogRef<EditProfilComponent>);

    constructor( private store: Store<AppState>){}

    baseUrl: string = environment.api + '/';
    


  ngOnInit(): void {

      this.store.select(selectUser).subscribe((user) => {
            this.user = user.user;  
          });
      
      if(this.user)
      {
        this.firstName.setValue(this.user.firstName);
        this.lastName.setValue(this.user.lastName);
        this.phone.setValue(this.user.phone);
      }
  
  }



  handleEdit() {
    const editUser={
      firstName:this.firstName.value,
      lastName:this.lastName.value,
      phone:this.phone.value,
      image: this.selectedImage
    };

    this.dialogRef.close(editUser);
  }


  
  handleSelectedImage(event: any) {
 this.selectedImage=event.target.files[0];
 this.imagePreview=null;

 if(this.selectedImage)
 {
  const reader =new FileReader();
  reader.onload=(e:any)=>{
    this.imagePreview=e.target.result;
  };

  reader.readAsDataURL(this.selectedImage);
 }
  }


  removeImage() {
  this.selectedImage=null;
  this.imagePreview=null;
  }

  handleClose() {
   this.dialogRef.close();
    }
}
