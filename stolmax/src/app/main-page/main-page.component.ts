import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from "../footer/footer.component";
import { Store, select } from '@ngrx/store';
import { StolmaxAppState } from '../reducers';
import { clickMoreInfoBtn } from '../actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, FooterComponent, RouterModule]
})
export class MainPageComponent {
  constructor(private store: Store<{ appState: StolmaxAppState }>) {
  }


  public moveToMoreInfo() {
    this.store.dispatch(clickMoreInfoBtn());
  }


}
