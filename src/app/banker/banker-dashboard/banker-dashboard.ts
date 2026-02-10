import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankerService } from '../../core/services/banker-service';

@Component({
  selector: 'app-banker-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './banker-dashboard.html',
  styleUrl: './banker-dashboard.css',
})
export class BankerDashboard implements OnInit {
    dashboardData: any;
 
  constructor(private bankerService: BankerService, private router: Router) {}
 
  ngOnInit(): void {
    this.bankerService.getDashboard().subscribe({
      next: (res) => {
        this.dashboardData = res;
      },
      error: (err) => {
  console.error('Full Error Object:', err); // Check this in the console!
  if (err.status === 403) {
    alert('403: You do not have the Banker role or CORS is blocked.');
  } else if (err.status === 401) {
    alert('401: Token is missing or expired.');
  } else {
    alert('An unexpected error occurred.');
  }
}
    });
  }

  goTo(path: string):void{
    this.router.navigate(['/banker', path]);
  }
}
