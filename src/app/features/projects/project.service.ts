import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/models/user.model';
import {
  AddEquipmentRequest,
  AgreementUploadRequest,
  CreateProjectRequest,
  HandoverRequest,
  ProjectDetailsDTO,
  ReturnEquipmentRequest
} from './models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/projects`;

  /**
   * Create a new project (ROLE_FREELANCER)
   */
  createProject(request: CreateProjectRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.post<ApiResponse<ProjectDetailsDTO>>(this.baseUrl, request);
  }

  /**
   * Get projects for logged-in freelancer
   */
  getMyProjects(): Observable<ApiResponse<ProjectDetailsDTO[]>> {
    return this.http.get<ApiResponse<ProjectDetailsDTO[]>>(this.baseUrl);
  }

  /**
   * Get all projects across platform (Admin / Underwriter / Assessor)
   */
  getAllProjects(): Observable<ApiResponse<ProjectDetailsDTO[]>> {
    return this.http.get<ApiResponse<ProjectDetailsDTO[]>>(`${this.baseUrl}/all`);
  }

  /**
   * Get project details by ID
   */
  getProjectById(id: number | string): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.get<ApiResponse<ProjectDetailsDTO>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Upload and analyze agreement document text for liability clauses
   */
  uploadAgreement(id: number | string, request: AgreementUploadRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.post<ApiResponse<ProjectDetailsDTO>>(`${this.baseUrl}/${id}/agreement`, request);
  }

  /**
   * Register equipment under a project
   */
  addEquipment(id: number | string, request: AddEquipmentRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.post<ApiResponse<ProjectDetailsDTO>>(`${this.baseUrl}/${id}/equipment`, request);
  }

  /**
   * Record equipment handover & custody confirmation
   */
  recordHandover(id: number | string, request: HandoverRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.post<ApiResponse<ProjectDetailsDTO>>(`${this.baseUrl}/${id}/handover`, request);
  }

  /**
   * Record equipment return and project completion
   */
  recordReturn(id: number | string, request: ReturnEquipmentRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.http.post<ApiResponse<ProjectDetailsDTO>>(`${this.baseUrl}/${id}/return`, request);
  }

  returnEquipment(id: number | string, request: ReturnEquipmentRequest): Observable<ApiResponse<ProjectDetailsDTO>> {
    return this.recordReturn(id, request);
  }
}
