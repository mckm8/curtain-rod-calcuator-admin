import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private statusRequestInFlight$: BehaviorSubject<boolean>;
  private messageRequestInFlight$: BehaviorSubject<string>;

  constructor() {
    this.statusRequestInFlight$ = new BehaviorSubject(false);
    this.messageRequestInFlight$ = new BehaviorSubject('');
  }

  /**
   * Disables application by showing a loading indicator.
   * {string} message - optional parameter for displaying a message under the loading indicator
   */
  startLoader(message?: string) {
    this.statusRequestInFlight$.next(true);
    this.message(message)
  }

  /**
   * Removes the loader enabling further application use...
   */
  stopLoader() {
    this.statusRequestInFlight$.next(false);
  }

  /**
   * Allows to add or change a message under the loading indicator
   * {string} message - message displayed under the loading indicator
   */
  message(message: string) {
    this.messageRequestInFlight$.next(message);
  }

  getLoaderStatus(): Observable<boolean> {
    return this.statusRequestInFlight$.asObservable();
  }

  getLoaderMessage(): Observable<string> {
    return this.messageRequestInFlight$.asObservable();
  }
}
