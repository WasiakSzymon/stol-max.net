import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStateService {
    headerActive$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor() {
    }

    setHeaderActive(value: boolean) {
        this.headerActive$.next(value);
    }
}