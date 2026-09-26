import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/user.model';
import {
  EquipmentQuoteRequest,
  EquipmentQuoteResponse,
  IncomeQuoteRequest,
  IncomeQuoteResponse
} from './models/risk.model';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/risk`;

  getEquipmentQuote(request: EquipmentQuoteRequest): Observable<ApiResponse<EquipmentQuoteResponse>> {
    return this.http.post<ApiResponse<EquipmentQuoteResponse>>(`${this.baseUrl}/equipment-quote`, request);
  }

  getIncomeQuote(request: IncomeQuoteRequest): Observable<ApiResponse<IncomeQuoteResponse>> {
    return this.http.post<ApiResponse<IncomeQuoteResponse>>(`${this.baseUrl}/income-quote`, request);
  }
}
