import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StolmaxAppState } from './reducers';
import { BehaviorSubject, Observable, map, skip, take } from 'rxjs';
import { setScrollPosition } from './actions';
import { selectScrollPosition } from './selectors';
import { selectMoreInfoBtnClick } from './selectors';
import { EventType, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'stolmax';

  @ViewChild('routerContent')
  routerContent!: ElementRef<HTMLDivElement>;

  public scrollPosition$: Observable<boolean>;
  public moreInfo$: Observable<number>;
  public isHome$: BehaviorSubject<boolean> | undefined;


  constructor(private store: Store<{ appState: StolmaxAppState }>, private router: Router) {
    this.scrollPosition$ = store.select(selectScrollPosition).pipe(map(scrollPosition => scrollPosition > 0));
    this.moreInfo$ = store.select(selectMoreInfoBtnClick);

  }
  ngOnInit(): void {
    this.isHome$ = new BehaviorSubject(document.location.pathname === '/');
    this.moreInfo$.pipe(skip(1)).subscribe(x => {
      this.routerContent.nativeElement.scrollBy({ behavior: 'smooth', 'top': (document.getElementById('content-begin')?.offsetTop as any - 150) })
    })

    this.router.events.pipe(skip(1)).subscribe(event => {
      if (event.type === EventType.NavigationEnd) {
        this.isHome$?.next(event.url === '/');
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.routerContent.nativeElement.addEventListener('scroll', (e) => {
        this.store.dispatch(setScrollPosition({ payload: (e.target as HTMLDivElement)?.scrollTop }));
      })
      this.store.select(selectScrollPosition).pipe(take(1)).subscribe(x => {
        this.routerContent.nativeElement.scrollBy({ behavior: 'auto', 'top': x })
      })
    }, 0)
  }



}
