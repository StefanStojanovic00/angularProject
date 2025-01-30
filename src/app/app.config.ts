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
import { lightingAdReducer } from './store/lighting-ad/lighting-ad.reducer';
import { categoryReducer } from './store/category/category.reducer';
import { lightingAdEffects } from './store/lighting-ad/lighting-ad.effects';
import { CategoryEffects } from './store/category/category.effects';
import {reducers} from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimationsAsync(),
      //provideState({name:FeatureKey,reducer:userReducer}),
      provideEffects([UserEffects,lightingAdEffects,CategoryEffects]),
      provideStore(reducers),
      provideHttpClient()
    ]
};
