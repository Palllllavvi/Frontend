export enum Role {
  ROLE_FREELANCER = 'ROLE_FREELANCER',
  ROLE_UNDERWRITER = 'ROLE_UNDERWRITER',
  ROLE_ASSESSOR = 'ROLE_ASSESSOR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export type UserRole = 'ROLE_FREELANCER' | 'ROLE_UNDERWRITER' | 'ROLE_ASSESSOR' | 'ROLE_ADMIN';

export interface User {
  id?: number;
  userId?: number;
  name: string;
  email: string;
  role: Role | UserRole | string;
  phone?: string;
  profession?: string;
  experienceYears?: number;
  city?: string;
  averageMonthlyIncome?: number;
  active?: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
  experienceYears?: number;
  city?: string;
  averageMonthlyIncome?: number;
  role?: Role | UserRole | string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  name: string;
  role: Role | UserRole | string;
  profession?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}
