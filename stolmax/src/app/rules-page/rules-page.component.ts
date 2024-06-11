import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CannonicalUrlService } from '../services/cannonical-url.service';

@Component({
  selector: 'stolmax-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [CannonicalUrlService]
})
export class RulesPageComponent implements OnInit {
  private cannonicalUrlService = inject(CannonicalUrlService);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cannonicalUrlService.UpdateCannonicalUrl('https://stol-max.net/regulamin')
    }
  }
}
