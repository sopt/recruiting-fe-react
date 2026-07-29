import { z } from 'zod';
import { EMAIL_ERROR, PASSWORD_ERROR } from '@/pages/Login/constants';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    role: string;
  };
}

export interface GoogleLoginRequest {
  idToken: string;
}

export type LoginForm = {
  email: string;
  password: string;
};

export const loginSchema = z.object({
  email: z.string().email(EMAIL_ERROR),
  password: z.string().min(1, PASSWORD_ERROR),
});
