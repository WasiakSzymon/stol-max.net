import { Component } from '@angular/core';
import { AppStateService } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stolmax';

  constructor(public appStateService: AppStateService) {

  }

}
