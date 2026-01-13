
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiState } from '../services/ui-state';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{
  @Input() isOpen = false;

  isAdmin=false;
  isBanker=false;
 
  constructor(private uiStateService: UiState,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void{
    this.uiStateService.sidebarOpen$
      .subscribe(open => this.isOpen = open);

    this.isAdmin=this.authService.isAdmin();
    this.isBanker=this.authService.isBanker();
  }

  onMenuClick(){
    this.uiStateService.closeSidebar();
  }
}
