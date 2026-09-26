import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../auth/auth.service';
import { DashboardService, UnderwriterStats } from '../dashboard.service';

@Component({
  selector: 'app-underwriter-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './underwriter-dashboard.component.html',
  styleUrls: ['./underwriter-dashboard.component.css']
})
export class UnderwriterDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly dashboardService = inject(DashboardService);

  user = this.authService.currentUser();
  loading = true;
  stats: UnderwriterStats = {
    policiesIssued: 0,
    equipmentPolicies: 0,
    incomePolicies: 0
  };

  ngOnInit(): void {
    this.dashboardService.getUnderwriterStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
