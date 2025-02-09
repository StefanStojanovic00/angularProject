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

export const routes: Routes = [
    
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Preusmerava na "home"
  //{ path: 'home', component: HomeComponent }, // Ruta za home komponentu
  { path: 'login', component: LoginComponent }, // Ruta za login komponentu
  //ovo trebam napraviti :D
  { path: 'home', component: HomeComponent},
  { path: 'create-ad', component: CreateAdComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent },
  { path: 'lighting-ad-details/:adId', component: LightingAdDetailsComponent},
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

];
