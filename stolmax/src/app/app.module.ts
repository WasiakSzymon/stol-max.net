import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, DevToolsFeatureOptions } from '@ngrx/store-devtools';
import { appReducer } from './reducers';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    provideClientHydration(),
    
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HeaderComponent,
    BrowserAnimationsModule,
    StoreModule.forRoot({ appState: appReducer, router: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: !isDevMode(), serialize: true, trace: true,
      features: <DevToolsFeatureOptions>{ persist: true }
    }),

  ]
})
export class AppModule { }
