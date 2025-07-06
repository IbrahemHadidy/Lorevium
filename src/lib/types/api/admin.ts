import type { User } from '../models/user';
//------------------------ REQUESTS -------------------------//

export interface CreateAdminRequest {
  data: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
}

//------------------------ RESPONSES -------------------------//
export interface CreateAdminResponse {
  message: string;
  success: boolean;
  data: User;
}

export interface GetAllAdminsResponse {
  message: string;
  success: boolean;
  data: User[];
}

export interface GetAllUsersResponse {
  message: string;
  success: boolean;
  data: User[];
}
