import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser, } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from "../footer/footer.component";
import { Store } from '@ngrx/store';
import { StolmaxAppState } from '../reducers';
import { clickMoreInfoBtn } from '../actions';
import { RouterModule } from '@angular/router';
import { CannonicalUrlService } from '../services/cannonical-url.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, FooterComponent, RouterModule],
  providers: [CannonicalUrlService]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  init = signal(false);
  private cannonicalUrlService = inject(CannonicalUrlService);
  constructor(
    private store: Store<{ appState: StolmaxAppState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cannonicalUrlService.UpdateCannonicalUrl('https://stol-max.net');
      const title = 'Stol-Max Patrycjusz Wybraniec Tychy, Meble kuchenne, Meble na wymiar';
      const desc = 'STOL-MAX Tychy, Patrycjusz Wybraniec - Zajmujemy się produkcją mebli na wymiar. Meble kuchenne, meble do biura, szafy, garderoby, meble na zamówienie.';
      this.cannonicalUrlService.UpdateTitleAndDesc(title,desc);
    }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.init.set(true);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100)
    }
  }

  public moveToMoreInfo() {
    this.store.dispatch(clickMoreInfoBtn());
  }

}
