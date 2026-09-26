import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/user.model';

import { FreelancerDashboardComponent } from './features/dashboard/freelancer-dashboard/freelancer-dashboard.component';
import { UnderwriterDashboardComponent } from './features/dashboard/underwriter-dashboard/underwriter-dashboard.component';
import { AssessorDashboardComponent } from './features/dashboard/assessor-dashboard/assessor-dashboard.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Sign In | FreelanceShield'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Create Account | FreelanceShield'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard | FreelanceShield'
      },
      {
        path: 'freelancer',
        component: FreelancerDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_FREELANCER, Role.ROLE_ADMIN] },
        title: 'Freelancer Dashboard | FreelanceShield'
      },
      {
        path: 'underwriter',
        component: UnderwriterDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_UNDERWRITER, Role.ROLE_ADMIN] },
        title: 'Underwriter Dashboard | FreelanceShield'
      },
      {
        path: 'assessor',
        component: AssessorDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_ASSESSOR, Role.ROLE_ADMIN] },
        title: 'Assessor Dashboard | FreelanceShield'
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_ADMIN] },
        title: 'Admin Dashboard | FreelanceShield'
      }
    ]
  },

  // Project Module routes
  {
    path: 'projects',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/projects/project-list/project-list.component').then(
            (m) => m.ProjectListComponent
          ),
        title: 'Projects | FreelanceShield'
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/projects/create-project/create-project.component').then(
            (m) => m.CreateProjectComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_FREELANCER] },
        title: 'Create Project | FreelanceShield'
      },
      {
        path: 'new',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/projects/project-details/project-details.component').then(
            (m) => m.ProjectDetailsComponent
          ),
        title: 'Project Details | FreelanceShield'
      }
    ]
  },
  // Policy Module routes
  {
    path: 'policies',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'equipment',
        pathMatch: 'full'
      },
      {
        path: 'equipment',
        loadComponent: () =>
          import('./features/policies/equipment-policy-list/equipment-policy-list.component').then(
            (m) => m.EquipmentPolicyListComponent
          ),
        title: 'Equipment Policies | FreelanceShield'
      },
      {
        path: 'income',
        loadComponent: () =>
          import('./features/policies/income-policy-list/income-policy-list.component').then(
            (m) => m.IncomePolicyListComponent
          ),
        title: 'Income Policies | FreelanceShield'
      },
      {
        path: 'equipment/issue',
        loadComponent: () =>
          import('./features/policies/issue-equipment-policy/issue-equipment-policy.component').then(
            (m) => m.IssueEquipmentPolicyComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_UNDERWRITER, Role.ROLE_ADMIN] },
        title: 'Issue Equipment Policy | FreelanceShield'
      },
      {
        path: 'income/issue',
        loadComponent: () =>
          import('./features/policies/issue-income-policy/issue-income-policy.component').then(
            (m) => m.IssueIncomePolicyComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_UNDERWRITER, Role.ROLE_ADMIN] },
        title: 'Issue Income Policy | FreelanceShield'
      }
    ]
  },

  // Claims Module routes
  {
    path: 'claims',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/claims/claims-list/claims-list.component').then(
            (m) => m.ClaimsListComponent
          ),
        title: 'Claims | FreelanceShield'
      },
      {
        path: 'equipment/submit',
        loadComponent: () =>
          import('./features/claims/equipment-claim-form/equipment-claim-form.component').then(
            (m) => m.EquipmentClaimFormComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_FREELANCER] },
        title: 'Submit Equipment Claim | FreelanceShield'
      },
      {
        path: 'income/submit',
        loadComponent: () =>
          import('./features/claims/income-claim-form/income-claim-form.component').then(
            (m) => m.IncomeClaimFormComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_FREELANCER] },
        title: 'Submit Income Claim | FreelanceShield'
      },
      {
        path: ':type/:id',
        loadComponent: () =>
          import('./features/claims/claim-details/claim-details.component').then(
            (m) => m.ClaimDetailsComponent
          ),
        title: 'Claim Details | FreelanceShield'
      },
      {
        path: ':type/:id/review',
        loadComponent: () =>
          import('./features/claims/review-claim/review-claim.component').then(
            (m) => m.ReviewClaimComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [Role.ROLE_ASSESSOR, Role.ROLE_ADMIN] },
        title: 'Review Claim | FreelanceShield'
      }
    ]
  },
  {
    path: 'risk',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Wildcard fallback
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];