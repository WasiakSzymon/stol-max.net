import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSplideModule } from 'ngx-splide';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'stolmax-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxSplideModule, FooterComponent]
})
export class AboutPageComponent {

}
