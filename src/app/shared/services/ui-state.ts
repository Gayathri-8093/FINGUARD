import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiState {
  // Sidebar State
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  // --- NEW: Data Refresh State ---
  // This allows components to signal to each other to reload data
  private dataRefreshSubject = new BehaviorSubject<void>(undefined);
  refreshRequested$ = this.dataRefreshSubject.asObservable();

  // Call this method to force all listening components to reload
  triggerRefresh() {
    this.dataRefreshSubject.next();
  }
  // -------------------------------

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

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UiState {
//   private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
//   sidebarOpen$ = this.sidebarOpenSubject.asObservable();
 
//   openSidebar() {
//     this.sidebarOpenSubject.next(true);
//   }
 
//   closeSidebar() {
//     this.sidebarOpenSubject.next(false);
//   }
 
//   toggleSidebar() {
//     this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
//   }
 
//   get isOpen(): boolean {
//     return this.sidebarOpenSubject.value;
//   }
// }
