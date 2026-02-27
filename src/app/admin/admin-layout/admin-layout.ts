import { Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Footer } from '../../shared/footer/footer';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UiState } from '../../shared/services/ui-state';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit, OnDestroy {
  isSidebarOpen = true;
 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

   private routerSub!: Subscription;

    constructor(
      private router: Router,
      private uiStateService: UiState
    ) {}
 
  ngOnInit() {
    this.uiStateService.sidebarOpen$
      .subscribe(open => this.isSidebarOpen = open);
 
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.uiStateService.closeSidebar();
      });
  }
  
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
