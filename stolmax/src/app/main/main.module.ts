import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { StartSectionComponent } from './start-section/start-section.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule
    ],

    declarations: [
        MainComponent,
        HeaderComponent,
        StartSectionComponent,
    ],

})
export class MainModule { }
