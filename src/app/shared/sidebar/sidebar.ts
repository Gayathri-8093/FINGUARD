import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiState } from '../services/ui-state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{
  @Input() isOpen = false;
 
  constructor(private uiStateService: UiState) {}
 
  ngOnInit() {
    this.uiStateService.sidebarOpen$
      .subscribe(open => this.isOpen = open);
  }

  onMenuClick(){
    this.uiStateService.closeSidebar();
  }
}
