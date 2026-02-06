import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

// go up two levels then into "app" dir
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Sidebar } from '../../shared/sidebar/sidebar'; // ✅ this path if you have src/app/app/sidebar
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