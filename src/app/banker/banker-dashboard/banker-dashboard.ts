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

    });
  }

  goTo(path: string):void{
    this.router.navigate(['/banker', path]);
  }
  
}


