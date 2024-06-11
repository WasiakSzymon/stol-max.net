import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CannonicalUrlService } from '../services/cannonical-url.service';

@Component({
  selector: 'stolmax-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  providers: [CannonicalUrlService]
})
export class OfferPageComponent implements OnInit {
  private cannonicalUrlService = inject(CannonicalUrlService);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cannonicalUrlService.UpdateCannonicalUrl('https://stol-max.net/oferta')
      const title = 'Oferta Mebli na Wymiar - Stol-Max Patrycjusz Wybraniec - Meble na Wymiar | Tychy';
      const desc = 'Poznaj naszą ofertę! Stol-Max w Tychach oferuje meble kuchenne, łazienkowe i do pokoi na wymiar. Sprawdź naszą szeroką gamę produktów dostosowanych do indywidualnych potrzeb klienta.';
      this.cannonicalUrlService.UpdateTitleAndDesc(title, desc);
    }
  }
}
