import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatButtonModule, RouterModule, NgOptimizedImage, MatIconModule]
})
export class FooterComponent {
  @Input() active: boolean | null = false;
}
