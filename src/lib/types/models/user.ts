import type { HighSchool } from '@/lib/enums/high-school';
import type { Role } from '@/lib/enums/role';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  classLevel: HighSchool;
  role: Role;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
