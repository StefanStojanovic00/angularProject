import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { loginUser } from '../../store/user/user.actions';
import { AppState } from '../../app.state';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [MatCardModule,MatFormFieldModule,MatProgressBarModule, MatInputModule, MatIconModule, MatButtonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string ="mail@mail.com";
  password: string = "123";
  loading: boolean =false;
  
 constructor(private store: Store<AppState>)
  {}

  ngOnInit(): void {
    
  }

  handleSubmit()
  {
    if(!this.email || !this.password) return;

    this.store.dispatch(
      loginUser({
        email:this.email,
        password:this.password,
      })
    );
    this.resetInputFields();
  };
  resetInputFields() {
    this.email = '';
    this.password = '';
  }
  
}
