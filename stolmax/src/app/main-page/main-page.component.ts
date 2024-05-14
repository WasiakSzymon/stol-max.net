import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from "../footer/footer.component";
import { Store } from '@ngrx/store';
import { StolmaxAppState } from '../reducers';
import { clickMoreInfoBtn } from '../actions';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectScrollPosition } from '../selectors';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, FooterComponent, RouterModule]
})
export class MainPageComponent implements AfterViewInit {
  // scrollPosition$: Observable<number>;
  // scrollGear: number;
  // scrollDesk: number;
  constructor(private store: Store<{ appState: StolmaxAppState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // this.scrollPosition$ = store.select(selectScrollPosition);

    // this.scrollPosition$.subscribe(e => {
    //   // @ts-ignore
    //   this.scrollGear = e/1000;
    //   this.scrollDesk = e/50;
    // })
  }
  init = signal(false);
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
