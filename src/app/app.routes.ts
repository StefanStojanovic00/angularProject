import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { userReducer } from './store/user/user.reducer';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Preusmerava na "home"
  //{ path: 'home', component: HomeComponent }, // Ruta za home komponentu
  { path: 'login', component: LoginComponent }, // Ruta za login komponentu
  //ovo trebam napraviti :D
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent }

];
