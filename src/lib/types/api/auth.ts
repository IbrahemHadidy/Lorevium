import type { HighSchool } from '@/lib/enums/high-school';
import type { User } from '../models/user';

//------------------------ REQUESTS -------------------------//

export interface SignUpRequest {
  data: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    classLevel: HighSchool;
  };
}

export interface LoginRequest {
  data: {
    email?: string;
    phoneNumber?: string;
    password: string;
  };
}

//------------------------ RESPONSES -------------------------//

export interface SignUpResponse {
  message: string;
  success: boolean;
  data: User;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  token: string;
}
