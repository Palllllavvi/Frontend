import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectService } from '../project.service';
import { ProjectDetailsDTO, ProjectStatus } from '../models/project.model';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../../core/models/user.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  displayedColumns: string[] = [
    'projectName',
    'client',
    'location',
    'duration',
    'status',
    'equipmentCount',
    'actions'
  ];

  dataSource = new MatTableDataSource<ProjectDetailsDTO>([]);
  isLoading = true;
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get isFreelancer(): boolean {
    return this.authService.getUserRole() === Role.ROLE_FREELANCER;
  }

  get userRole(): string {
    return this.authService.getUserRole() || '';
  }

  // Summary counts
  totalCount = 0;
  insuredCount = 0;
  draftCount = 0;
  completedCount = 0;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Admin/Underwriter/Assessor can see all projects; Freelancers see their own
    const fetch$ = (this.userRole === Role.ROLE_ADMIN || this.userRole === Role.ROLE_UNDERWRITER || this.userRole === Role.ROLE_ASSESSOR)
      ? this.projectService.getAllProjects()
      : this.projectService.getMyProjects();

    fetch$.subscribe({
      next: (response) => {
        this.isLoading = false;
        const data = response.data || [];
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.updateStats(data);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Unable to load projects. Please try again.';
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusClass(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.INSURED:
        return 'status-insured';
      case ProjectStatus.QUOTE:
        return 'status-quote';
      case ProjectStatus.COMPLETED:
        return 'status-completed';
      case ProjectStatus.CLOSED:
        return 'status-closed';
      default:
        return 'status-draft';
    }
  }

  viewProject(id: number): void {
    this.router.navigate(['/projects', id]);
  }

  private updateStats(projects: ProjectDetailsDTO[]): void {
    this.totalCount = projects.length;
    this.insuredCount = projects.filter((p) => p.status === ProjectStatus.INSURED).length;
    this.draftCount = projects.filter((p) => p.status === ProjectStatus.DRAFT).length;
    this.completedCount = projects.filter((p) => p.status === ProjectStatus.COMPLETED).length;
  }
}
