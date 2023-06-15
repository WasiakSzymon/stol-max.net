import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StolmaxAppState } from './reducers';
import { Observable, map, skip } from 'rxjs';
import { setScrollPosition } from './actions';
import { selectScrollPosition } from './selectors';
import { selectMoreInfoBtnClick } from './selectors';

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


  constructor(private store: Store<{ appState: StolmaxAppState }>) {
    this.scrollPosition$ = store.select(selectScrollPosition).pipe(map(scrollPosition => scrollPosition > 0));
    this.moreInfo$ = store.select(selectMoreInfoBtnClick);

  }
  ngOnInit(): void {
    this.moreInfo$.pipe(skip(1)).subscribe(x => {
      console.log(x);
      this.routerContent.nativeElement.scrollBy({ behavior: 'smooth', 'top': (document.getElementById('content-begin')?.offsetTop as any - 150) })
    })
  }

  ngAfterViewInit(): void {
    this.routerContent.nativeElement.addEventListener('scroll', (e) => {
      this.store.dispatch(setScrollPosition({ payload: (e.target as HTMLDivElement).scrollTop }));
    })
  }



}
