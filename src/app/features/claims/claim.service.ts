import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/user.model';
import {
  EquipmentClaim,
  IncomeClaim,
  ReviewClaimRequest,
  SubmitEquipmentClaimRequest,
  SubmitIncomeClaimRequest
} from './models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/claims`;

  // ── Equipment Claims ───────────────────────────────────────────────

  submitEquipmentClaim(request: SubmitEquipmentClaimRequest): Observable<ApiResponse<EquipmentClaim>> {
    return this.http.post<ApiResponse<EquipmentClaim>>(`${this.baseUrl}/equipment`, request);
  }

  getAllEquipmentClaims(): Observable<ApiResponse<EquipmentClaim[]>> {
    return this.http.get<ApiResponse<EquipmentClaim[]>>(`${this.baseUrl}/equipment`);
  }

  getEquipmentClaimsForUser(userId: number): Observable<ApiResponse<EquipmentClaim[]>> {
    return this.http.get<ApiResponse<EquipmentClaim[]>>(`${this.baseUrl}/equipment/user/${userId}`);
  }

  getEquipmentClaimById(id: number | string): Observable<ApiResponse<EquipmentClaim>> {
    return this.http.get<ApiResponse<EquipmentClaim>>(`${this.baseUrl}/equipment/${id}`);
  }

  reviewEquipmentClaim(id: number | string, request: ReviewClaimRequest): Observable<ApiResponse<EquipmentClaim>> {
    return this.http.patch<ApiResponse<EquipmentClaim>>(`${this.baseUrl}/equipment/${id}/review`, request);
  }

  // ── Income Claims ──────────────────────────────────────────────────

  submitIncomeClaim(request: SubmitIncomeClaimRequest): Observable<ApiResponse<IncomeClaim>> {
    return this.http.post<ApiResponse<IncomeClaim>>(`${this.baseUrl}/income`, request);
  }

  getAllIncomeClaims(): Observable<ApiResponse<IncomeClaim[]>> {
    return this.http.get<ApiResponse<IncomeClaim[]>>(`${this.baseUrl}/income`);
  }

  getIncomeClaimsForUser(userId: number): Observable<ApiResponse<IncomeClaim[]>> {
    return this.http.get<ApiResponse<IncomeClaim[]>>(`${this.baseUrl}/income/user/${userId}`);
  }

  getIncomeClaimById(id: number | string): Observable<ApiResponse<IncomeClaim>> {
    return this.http.get<ApiResponse<IncomeClaim>>(`${this.baseUrl}/income/${id}`);
  }

  reviewIncomeClaim(id: number | string, request: ReviewClaimRequest): Observable<ApiResponse<IncomeClaim>> {
    return this.http.patch<ApiResponse<IncomeClaim>>(`${this.baseUrl}/income/${id}/review`, request);
  }
}
