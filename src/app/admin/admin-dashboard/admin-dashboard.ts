import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface DashboardModule {
 title: string;
 description: string;
 isActive: boolean;
 status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone:true, 
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
 constructor(private router: Router) {}
 
  goTo(path: string) {
    this.router.navigate(['/admin-dashboard', path]);
  }

  chalChal(daari: string){
    this.router.navigate([`/${daari}`]);
  }
}