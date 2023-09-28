import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StolmaxAppState } from './reducers';
import { BehaviorSubject, Observable, map, skip, take } from 'rxjs';
import { setScrollPosition } from './actions';
import { selectScrollPosition } from './selectors';
import { selectMoreInfoBtnClick } from './selectors';
import { EventType, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import SampleJson from '../assets/test.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Stol-Max Patrycjusz Wybraniec Tychy, Meble kuchenne, Meble na wymiar';

  @ViewChild('routerContent')
  routerContent!: ElementRef<HTMLDivElement>;

  public scrollPosition$: Observable<boolean>;
  public moreInfo$: Observable<number>;
  public isHome$: BehaviorSubject<boolean> | undefined;


  constructor(private store: Store<{ appState: StolmaxAppState }>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta) {
    this.meta.addTags([
      { name: 'description', content: 'STOL-MAX Tychy, Patrycjusz Wybraniec - Zajmujemy się produkcją mebli na wymiar. Meble kuchenne, meble do biura, szafy, garderoby, meble na zamówienie.' },
      { name: 'author', content: 'STOL-MAX Patrycjusz Wybraniec' },
      { name: 'keywords', content: 'stolmax tychy, szafy tychy, stolmax, tychy meble, śląsk, kuchnie na wymiar śląsk, meble na wymiar śląsk kuchnie na wymiar tychy, Meble, Meble na wymiar, Kuchnia, Szafa, Garderoba, Biuro, Salon, Śląsk, Meble na zamówienie, Łazienka, Meble na zamówienie w Tychach, Meble Tychy, Meble na wymiar Tychy, Meble do łazienki tychy, meble do biura, meble kuchenne tychy, firma meble tychy, firma od mebli w tychach, firma z meblami tychy, na wymiar meble tychy, tychy meble, tychy meble na wymiar, meble katowice, katowice meble na wymiar, katowice meble, meble na wymiar kuchnia, meble kuchnenne ' }
    ]);
    this.scrollPosition$ = store.select(selectScrollPosition).pipe(map(scrollPosition => scrollPosition > 0));
    this.moreInfo$ = store.select(selectMoreInfoBtnClick);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isHome$ = new BehaviorSubject(document?.location?.pathname === '/');
      this.moreInfo$?.pipe(skip(1)).subscribe(() => {
        const offsetTop = document.getElementById('content-begin')?.offsetTop;
        this.routerContent?.nativeElement?.scrollTo({ behavior: 'smooth', 'top': (offsetTop - 150) })
      })

      this.router?.events.pipe(skip(1)).subscribe(event => {
        if (event.type === EventType.NavigationEnd) {
          this.isHome$?.next(event.url === '/');
          this.routerContent?.nativeElement?.scrollTo({ behavior: 'smooth', 'top': 0 })
        }
      })
    }    
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.routerContent?.nativeElement.addEventListener('scroll', (e) => {
          this.store.dispatch(setScrollPosition({ payload: (e.target as HTMLDivElement)?.scrollTop }));
        })
        this.store.select(selectScrollPosition).pipe(take(1)).subscribe(x => {
          this.routerContent?.nativeElement.scrollTo({ behavior: 'auto', 'top': x })
        })
      }, 0)
    }
  }



}
