import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly isLoadingBS = new BehaviorSubject(false);

  public get isLoading(): Observable<boolean> {
    return this.isLoadingBS.asObservable();
  }

  public setIsLoading(loading: boolean): void {
    this.isLoadingBS.next(loading)
  }
}
