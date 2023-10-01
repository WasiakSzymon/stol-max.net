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
  GalleryRef,
  GalleryComponent
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import biuroImg from '../../assets/gallery/Biuro.json';
import kuchniaImg from '../../assets/gallery/Kuchnia.json';
import salonImg from '../../assets/gallery/Salon.json';
import sypialniaImg from '../../assets/gallery/Sypialnia.json';
import lazienkaImg from '../../assets/gallery/Łazienka.json'
import szafyImg from '../../assets/gallery/Szafy.json';

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


  categories: catType[] = ['Biuro', 'Salon', 'Kuchnia', 'Łazienka', 'Szafy', 'Sypialania'];
  selectedCategory: catType = 'Biuro';

  constructor(public gallery: Gallery, public lightbox: Lightbox, public httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCategory(this.selectedCategory);
    }
  }

  setCategory(cat: catType) {
    this.selectedCategory = cat;
    this.getCategory(cat);
    this.galleryEl.galleryRef.set(0);
  }

  getCategory(cat: catType) {

    switch (cat) {
      case 'Biuro':
        this.items = biuroImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      case 'Kuchnia':
        this.items = kuchniaImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      case 'Salon':
        this.items = salonImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      case 'Sypialania':
        this.items = sypialniaImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      case 'Szafy':
        this.items = szafyImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      case 'Łazienka':
        this.items = lazienkaImg.map(
          (item) => new ImageItem({ src: this.baseCdnUrl + item.url, thumb: this.baseCdnUrl + item.url, alt: item.alt })
        );
        break;
      default:
        break;
    }



    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top
    });

    lightboxRef.load(this.items);

  }
}

