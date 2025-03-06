import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  private _isLoading = signal(false);

  constructor() { }

  setIsLoading(isLoading: boolean) {
    this._isLoading.set(isLoading);
  }

  getIsLoading(){
    return this._isLoading();
  }

}
