import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banker-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './banker-dashboard.html',
  styleUrl: './banker-dashboard.css',
})
export class BankerDashboard {
    constructor(private router: Router) {}
 
  goTo(path: string) {
    this.router.navigate(['/banker', path]);
  }
}
