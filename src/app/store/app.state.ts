// ─────────────────────────────────────────────────────────────────────────────
// src/app/store/app.state.ts
// ─────────────────────────────────────────────────────────────────────────────
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { ProjectsState } from './projects/projects.state';
import { projectsReducer } from './projects/projects.reducer';
import { ProjectsEffects } from './projects/projects.effects';
import { PoliciesState } from './policies/policies.state';
import { policiesReducer } from './policies/policies.reducer';
import { PoliciesEffects } from './policies/policies.effects';
import { ClaimsState } from './claims/claims.state';
import { claimsReducer } from './claims/claims.reducer';
import { ClaimsEffects } from './claims/claims.effects';

export interface AppState {
  auth: AuthState;
  projects: ProjectsState;
  policies: PoliciesState;
  claims: ClaimsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  projects: projectsReducer,
  policies: policiesReducer,
  claims: claimsReducer
};

export const appEffects = [
  AuthEffects,
  ProjectsEffects,
  PoliciesEffects,
  ClaimsEffects
];
