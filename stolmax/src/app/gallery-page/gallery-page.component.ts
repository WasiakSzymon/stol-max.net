import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

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

  constructor(public gallery: Gallery, public lightbox: Lightbox, public httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCategory(this.selectedCategory);
    }
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.getCategory(cat);
  }

  getCategory(cat: string) {
    this.httpClient.get<any[]>(`/assets/gallery/${cat}.json`).pipe(take(1)).subscribe(imgConfig => {

      this.items = imgConfig.map(
        (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
      );

      const lightboxRef = this.gallery.ref('lightbox');

      lightboxRef.setConfig({
        imageSize: ImageSize.Contain,
        thumbPosition: ThumbnailsPosition.Top
      });

      lightboxRef.load(this.items);
    })
  }
}

