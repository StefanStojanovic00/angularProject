import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { selectUser } from './store/user/user.selector';
import { userReducer } from './store/user/user.reducer';
import { loginUser } from './store/user/user.actions';
import { UserEffects } from './store/user/user.effects';
import { provideEffects } from '@ngrx/effects'; 
import {  HttpFeatureKind, provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimationsAsync(),
      //provideState({name:FeatureKey,reducer:userReducer}),
      provideEffects(UserEffects),
      provideStore(userReducer),
      provideHttpClient()
    ]
};
