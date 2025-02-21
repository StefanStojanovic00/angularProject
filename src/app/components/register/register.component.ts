import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RegisterUser } from '../../models/user';
import { registerUser } from '../../store/user/user.actions';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatProgressBarModule, MatInputModule, MatIconModule, MatButtonModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {


  email=new FormControl('',[Validators.required,Validators.email]);
  password=new FormControl('',[Validators.required,Validators.minLength(6)]);

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  loading:boolean=false;

  constructor(private store:Store<AppState>,private router:Router){}
  ngOnInit(): void {
    this.store.subscribe((state)=>
      {
        this.loading=state.user.loading;
      });
  }

  navigate() {
    this.router.navigate(['login']);
  }

  handleSubmit() {
    if (
      !this.email.value ||
      !this.password.value ||
      !this.firstName.value ||
      !this.lastName.value ||
      !this.phone.value
     
    )
      return;

    const registerData: RegisterUser = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phone.value,
    };

    this.store.dispatch(registerUser({ registerData }));
}
}

