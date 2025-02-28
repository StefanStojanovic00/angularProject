import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { selectUser } from './store/user/user.selector';
import { userReducer } from './store/user/user.reducer';
import { loginUser } from './store/user/user.actions';
import { UserEffects } from './store/user/user.effects';
import { provideEffects } from '@ngrx/effects'; 
import {  HTTP_INTERCEPTORS, HttpFeatureKind, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { lightingAdReducer } from './store/lighting-ad/lighting-ad.reducer';
import { categoryReducer } from './store/category/category.reducer';
import { lightingAdEffects } from './store/lighting-ad/lighting-ad.effects';
import { CategoryEffects } from './store/category/category.effects';
import {reducers} from './reducers';
import { InterceptorService } from './auth/interceptors';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appStateProviders } from './state';
import { AuthGuard } from './auth/auth.guard';
import {  provideAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true,
    },
    provideAnimations(),
    provideEffects([UserEffects, lightingAdEffects, CategoryEffects]),
    provideStore(reducers),
    ...appStateProviders,
    provideHttpClient(withInterceptorsFromDi()),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
