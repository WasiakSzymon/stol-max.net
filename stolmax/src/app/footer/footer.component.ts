import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatButtonModule, RouterModule, NgOptimizedImage]
})
export class FooterComponent {
  @Input() active: boolean | null = false;
}
