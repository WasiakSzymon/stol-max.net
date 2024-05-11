import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
  GalleryComponent
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';

export type catType = 'Biuro' | 'Salon' | 'Kuchnia' | 'Łazienka' | 'Szafy' | 'Sypialania'
@Component({
  selector: 'stolmax-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
  standalone: true,
  imports: [CommonModule, GalleryModule, FooterComponent, MatButtonModule, LightboxModule, HttpClientModule]
})
export class GalleryPageComponent implements OnInit {

  items: GalleryItem[] = [];
  baseCdnUrl = 'https://aniancep.sirv.com/';

  @ViewChild(GalleryComponent)
  galleryEl: GalleryComponent;


  categories: { code: string, label: catType }[] = [
    { code: 'biuro', label: 'Biuro' },
    { code: 'salon', label: 'Salon' },
    { code: 'kuchnia', label: 'Kuchnia' },
    { code: 'lazienka', label: 'Łazienka' },
    { code: 'szafy', label: 'Szafy' },
    { code: 'sypialnia', label: 'Sypialania' },];
  selectedCategory: { code: string, label: catType } = { code: 'biuro', label: 'Biuro' };

  constructor(public gallery: Gallery, public lightbox: Lightbox, public httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCategory(this.selectedCategory);
    }
  }

  setCategory(cat: { code: string, label: catType }) {
    this.selectedCategory = cat;
    this.getCategory(cat);
  }

  getCategory(cat: { code: string, label: catType }) {
    this.httpClient.get<any[]>(`/assets/gallery/${cat.code}.json`).pipe(take(1)).subscribe({
      next: (elements) => {
        this.items = elements.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        const lightboxRef = this.gallery.ref('lightbox');

        lightboxRef.setConfig({
          imageSize: ImageSize.Contain,
          thumbPosition: ThumbnailsPosition.Top,
          autoPlay: false,
          playerInterval: 0,

        });
        lightboxRef.load(this.items);
        setTimeout(() => {
          this.galleryEl.galleryRef.set(0);
        }, 100)

      }
    })
  }
}

