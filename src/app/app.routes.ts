import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { userReducer } from './store/user/user.reducer';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    
 { path: '', redirectTo: '', pathMatch: 'full' }, // Preusmerava na "home"
  //{ path: 'home', component: HomeComponent }, // Ruta za home komponentu
  { path: 'login', component: LoginComponent }, // Ruta za login komponentu
    
];
