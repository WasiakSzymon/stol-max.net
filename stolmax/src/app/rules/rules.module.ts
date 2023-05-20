import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';

@NgModule({
    imports: [
        CommonModule,
        RulesRoutingModule,
        NgOptimizedImage
    ],

    declarations: [
        RulesComponent
    ]
})
export class RulesModule { }
