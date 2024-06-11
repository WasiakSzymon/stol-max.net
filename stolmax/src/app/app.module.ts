import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, DevToolsFeatureOptions } from '@ngrx/store-devtools';
import { appReducer } from './reducers';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';

const metaReducers: Array<MetaReducer<any, any>> = [];
const localStorageSyncReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return localStorageSync({ keys: ['appState'], rehydrate: true })(reducer);
};
if (typeof window !== "undefined") {
  metaReducers.push(localStorageSyncReducer);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimations()
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HeaderComponent,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ appState: appReducer, router: routerReducer }, { metaReducers: metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: !isDevMode(), serialize: true, trace: true,
      features: <DevToolsFeatureOptions>{ persist: true }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    })
  ]
})
export class AppModule { }
