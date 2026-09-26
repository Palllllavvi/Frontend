import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/user.model';
import {
  EquipmentPolicy,
  IncomeAssurancePolicy,
  IssueEquipmentPolicyRequest,
  IssueIncomeAssurancePolicyRequest
} from './models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/policies`;

  // ── Equipment Policies ───────────────────────────────────────────────

  issueEquipmentPolicy(request: IssueEquipmentPolicyRequest): Observable<ApiResponse<EquipmentPolicy>> {
    return this.http.post<ApiResponse<EquipmentPolicy>>(`${this.baseUrl}/equipment`, request);
  }

  getAllEquipmentPolicies(): Observable<ApiResponse<EquipmentPolicy[]>> {
    return this.http.get<ApiResponse<EquipmentPolicy[]>>(`${this.baseUrl}/equipment`);
  }

  getEquipmentPoliciesForUser(userId: number): Observable<ApiResponse<EquipmentPolicy[]>> {
    return this.http.get<ApiResponse<EquipmentPolicy[]>>(`${this.baseUrl}/equipment/user/${userId}`);
  }

  getEquipmentPolicyById(id: number | string): Observable<ApiResponse<EquipmentPolicy>> {
    return this.http.get<ApiResponse<EquipmentPolicy>>(`${this.baseUrl}/equipment/${id}`);
  }

  getEquipmentPolicyByNumber(policyNumber: string): Observable<ApiResponse<EquipmentPolicy>> {
    return this.http.get<ApiResponse<EquipmentPolicy>>(`${this.baseUrl}/equipment/number/${policyNumber}`);
  }

  cancelEquipmentPolicy(id: number | string): Observable<ApiResponse<EquipmentPolicy>> {
    return this.http.patch<ApiResponse<EquipmentPolicy>>(`${this.baseUrl}/equipment/${id}/cancel`, {});
  }

  // ── Income Policies ──────────────────────────────────────────────────

  issueIncomePolicy(request: IssueIncomeAssurancePolicyRequest): Observable<ApiResponse<IncomeAssurancePolicy>> {
    return this.http.post<ApiResponse<IncomeAssurancePolicy>>(`${this.baseUrl}/income`, request);
  }

  getAllIncomePolicies(): Observable<ApiResponse<IncomeAssurancePolicy[]>> {
    return this.http.get<ApiResponse<IncomeAssurancePolicy[]>>(`${this.baseUrl}/income`);
  }

  getIncomePoliciesForUser(userId: number): Observable<ApiResponse<IncomeAssurancePolicy[]>> {
    return this.http.get<ApiResponse<IncomeAssurancePolicy[]>>(`${this.baseUrl}/income/user/${userId}`);
  }

  getIncomePolicyById(id: number | string): Observable<ApiResponse<IncomeAssurancePolicy>> {
    return this.http.get<ApiResponse<IncomeAssurancePolicy>>(`${this.baseUrl}/income/${id}`);
  }
}
