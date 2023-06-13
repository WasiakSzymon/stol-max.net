import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatButtonModule, RouterModule, NgOptimizedImage]
})
export class HeaderComponent {
  @Input() active: boolean | null = false;
}
