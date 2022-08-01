import { IGenericResponse } from '@/store/api/types';
import { IPet } from './pet';

export interface IUser {
  userId: number | null;
  name: string | null;
  email: string | null;
  representativePet: IPet | null;
}
export interface IAuthenticatedUser {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | undefined | null;
  email: string;
  role: 'USER' | 'ADMIN' | 'NONE';
  userId: number | null;
  username: string;
}
export interface IUserLoginResponse extends IGenericResponse, IAuthenticatedUser {}
