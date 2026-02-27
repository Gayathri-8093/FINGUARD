import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Sidebar } from '../../shared/sidebar/sidebar'; 
import { filter, Subscription } from 'rxjs';
import { UiState } from '../../shared/services/ui-state';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './customer-layout.html',
  styleUrls: ['./customer-layout.css'],
})
export class CustomerLayout {
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