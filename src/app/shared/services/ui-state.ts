import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiState {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();
 
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
