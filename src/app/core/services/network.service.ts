import { Injectable } from '@angular/core';
import { fromEvent, map, merge, of, Observable } from 'rxjs';

@Injectable()
export class NetworkService {

  networkStatus!: Observable<boolean>;

  constructor() { }

  checkNetworkStatus(): Observable<boolean> {
    return this.networkStatus = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine));

  }
}

