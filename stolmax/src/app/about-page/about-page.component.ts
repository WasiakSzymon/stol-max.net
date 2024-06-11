import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NgxSplideModule } from 'ngx-splide';
import { FooterComponent } from '../footer/footer.component';
import { CannonicalUrlService } from '../services/cannonical-url.service';

@Component({
  selector: 'stolmax-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxSplideModule, FooterComponent],
  providers: [CannonicalUrlService]
})
export class AboutPageComponent implements OnInit {
  private cannonicalUrlService = inject(CannonicalUrlService);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cannonicalUrlService.UpdateCannonicalUrl('https://stol-max.net/o-nas')
      const title = 'O NAS - Stol-Max Patrycjusz Wybraniec - Meble na Wymiar | Tychy';
      const desc = 'Stol-Max w Tychach oferuje meble na wymiar z 25-letnim doświadczeniem. Produkujemy meble do kuchni, łazienek i pokoi, dostosowane do indywidualnych potrzeb klienta. Nasze produkty łączą nowoczesne trendy z funkcjonalnością i ergonomią. Zaufaj profesjonalistom!';
      this.cannonicalUrlService.UpdateTitleAndDesc(title, desc);
    }
  }
}
