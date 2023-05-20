import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    provideImageKitLoader('https://ik.imagekit.io/b9nsvmmlt/')
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgOptimizedImage
  ]
})
export class AppModule { }
