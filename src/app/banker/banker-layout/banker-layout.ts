import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UiState } from '../../shared/services/ui-state';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-banker-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './banker-layout.html',
  styleUrl: './banker-layout.css',
})
export class BankerLayout implements OnInit, OnDestroy{
  isSidebarOpen = false;
  private routerSub!: Subscription;
 
  constructor(
    private router: Router,
    private uiStateService: UiState
  ) {}
 
  ngOnInit() {
    // Sync sidebar open state
    this.uiStateService.sidebarOpen$
      .subscribe(open => this.isSidebarOpen = open);
 
    // Handle route-based sidebar behavior
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/banker/dashboard') {
          // ✅ Auto-open sidebar ONLY on dashboard
          this.uiStateService.openSidebar();
        } else {
          // ❌ Close sidebar on all other pages
          this.uiStateService.closeSidebar();
        }
      });
  }
 
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
