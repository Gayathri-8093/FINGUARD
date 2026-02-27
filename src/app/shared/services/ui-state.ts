import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiState {
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  private dataRefreshSubject = new BehaviorSubject<void>(undefined);
  refreshRequested$ = this.dataRefreshSubject.asObservable();

  triggerRefresh() {
    this.dataRefreshSubject.next();
  }

  openSidebar() {
    this.sidebarOpenSubject.next(true);
  }

  closeSidebar() {
    this.sidebarOpenSubject.next(false);
  }

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  get isOpen(): boolean {
    return this.sidebarOpenSubject.value;
  }
}

