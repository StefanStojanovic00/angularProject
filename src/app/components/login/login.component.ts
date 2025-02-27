import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { loginUser } from '../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AppState } from '../../app.state';
import { selectUser } from '../../store/user/user.selector';
import Swal from 'sweetalert2';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-login',
  imports: [MatListModule,MatProgressBarModule ,CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatProgressBarModule, MatInputModule, MatIconModule, MatButtonModule,NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit{

  email = new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.email]});
  password = new FormControl('',  { nonNullable: true, validators: [Validators.required] });
  loading: boolean =false;
  
 constructor(private store: Store<AppState>, private router:Router)
  {}

  ngOnInit(): void {
     this.store.select(selectUser).subscribe((user) => {
          this.loading = user.loading; 
       
        });
    
  }

  handleSubmit()
  {
    if(!this.email.value || !this.password.value) return;
    
    
    this.store.dispatch(      
      loginUser({       
        email:this.email.value,
        password:this.password.value,
        
      })
    );
   
  };

  navigate(path:string) {
    this.router.navigate([path]);
    }
   
}

