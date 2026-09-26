import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ClaimService } from '../claim.service';
import { AuthService } from '../../auth/auth.service';
import { ClaimStatus, EquipmentClaim, IncomeClaim } from '../models/claim.model';

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly claimService = inject(ClaimService);
  private readonly authService = inject(AuthService);

  claimType: 'equipment' | 'income' = 'equipment';
  claimId!: number;

  equipmentClaim: EquipmentClaim | null = null;
  incomeClaim: IncomeClaim | null = null;

  isLoading = true;
  errorMessage: string | null = null;

  get canReview(): boolean {
    const role = this.authService.getUserRole();
    return role === 'ROLE_ASSESSOR' || role === 'ROLE_ADMIN';
  }

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('/income/')) {
      this.claimType = 'income';
    } else {
      this.claimType = 'equipment';
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(Number(idParam))) {
      this.errorMessage = 'Invalid Claim ID.';
      this.isLoading = false;
      return;
    }

    this.claimId = Number(idParam);
    this.loadClaim();
  }

  loadClaim(): void {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.claimType === 'equipment') {
      this.claimService.getEquipmentClaimById(this.claimId).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.equipmentClaim = res.data;
          } else {
            this.errorMessage = res.message || 'Equipment claim not found.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Error fetching equipment claim details.';
        }
      });
    } else {
      this.claimService.getIncomeClaimById(this.claimId).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.incomeClaim = res.data;
          } else {
            this.errorMessage = res.message || 'Income claim not found.';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Error fetching income claim details.';
        }
      });
    }
  }

  getStatusClass(status: ClaimStatus | undefined): string {
    switch (status) {
      case ClaimStatus.SUBMITTED:
        return 'badge-submitted';
      case ClaimStatus.UNDER_REVIEW:
        return 'badge-review';
      case ClaimStatus.APPROVED:
        return 'badge-approved';
      case ClaimStatus.SETTLED:
        return 'badge-settled';
      case ClaimStatus.REJECTED:
        return 'badge-rejected';
      default:
        return 'badge-muted';
    }
  }
}
