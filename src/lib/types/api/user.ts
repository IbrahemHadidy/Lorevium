import type { HighSchool } from '@/lib/enums/high-school';
import type { User } from '../models/user';

//------------------------ REQUESTS -------------------------//

export interface UpdateUserRequest {
  _id: string;
  data: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    classLevel?: HighSchool;
  };
}

export interface ForgotPasswordRequest {
  data: {
    email: string;
  };
}

export interface ResetPasswordRequest {
  data: {
    email: string;
    otp: string;
    password: string;
  };
}

//------------------------ RESPONSES -------------------------//

export interface GetProfileResponse {
  message: string;
  success: boolean;
  data: User;
}

export interface UpdateUserResponse {
  message: string;
  success: boolean;
  data: User;
}

export interface DeleteUserResponse {
  message: string;
  success: boolean;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}
