import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
  GalleryComponent,
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { MatButtonModule } from '@angular/material/button';
import 'hammerjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'stolmax-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
  standalone: true,
  imports: [CommonModule, GalleryModule, FooterComponent, MatButtonModule, LightboxModule, HttpClientModule]
})
export class GalleryPageComponent implements OnInit {
  items: GalleryItem[] = [];


  categories = ['Biuro', 'Salon', 'Kuchnia', 'Łazienka', 'Szafy', 'Sypialania'];
  selectedCategory = 'Biuro';

  constructor(public gallery: Gallery, public lightbox: Lightbox, public httpClient: HttpClient) { }


  ngOnInit() {
    this.getCategory(this.selectedCategory);
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.getCategory(cat);
  }

  getCategory(cat: string) {
    this.httpClient.get<any[]>(`/assets/gallery/${cat}.json`).subscribe(imgConfig => {

      this.items = imgConfig.map(
        (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
      );
      // Get a lightbox gallery ref
      const lightboxRef = this.gallery.ref('lightbox');

      // Add custom gallery config to the lightbox (optional)
      lightboxRef.setConfig({
        imageSize: ImageSize.Contain,
        thumbPosition: ThumbnailsPosition.Top,
      });

      // Load items into the lightbox gallery ref
      lightboxRef.load(this.items);

      this.gallery.resetAll();
    })
  }
}

