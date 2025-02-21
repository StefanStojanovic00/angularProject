import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { userReducer } from './store/user/user.reducer';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { LightingAdDetailsComponent } from './components/lighting-ad-details/lighting-ad-details.component';
import { Role } from './enum/role';
import { AuthGuard } from './auth/auth.guard';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { SavedAdsComponent } from './components/saved-ads/saved-ads.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
    
  
  { path: 'login', component: LoginComponent}, 
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent }, 
  { path: 'lighting-ad-details/:id',
    component: LightingAdDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User },
  },
  {
    path: 'myAds',
    component: MyAdsComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User },
  },
  {
    path: 'create-ad',
    component: CreateAdComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User },
  },
  {
    path: 'saved-ads',
    component: SavedAdsComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User },
  },
  {
    path: 'edit-ad/:id',
    component: EditAdComponent,
    canActivate: [AuthGuard],
    data: { role: Role.User },
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { role: Role.Admin },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },   
  { path: '**', component: HomeComponent },
  
];
