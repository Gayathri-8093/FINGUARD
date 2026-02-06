import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// go up two levels then into "app" dir
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Sidebar } from '../../shared/sidebar/sidebar'; // ✅ this path if you have src/app/app/sidebar

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './customer-layout.html',
  styleUrls: ['./customer-layout.css'],
})
export class CustomerLayout {}