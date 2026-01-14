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
    // used to sidebar open/close
    this.uiStateService.sidebarOpen$
      .subscribe(open => this.isSidebarOpen = open);
 
    //used to close the sidebar when route changes
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
