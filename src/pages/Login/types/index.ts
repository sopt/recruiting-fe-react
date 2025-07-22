import { PASSWORD_ERROR } from '@/pages/Login/constants';
import { EMAIL_ERROR } from '@/pages/Login/constants';
import { z } from 'zod';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    email: string;
    role: string;
  };
}

export type LoginForm = {
  email: string;
  password: string;
};

export const loginSchema = z.object({
  email: z.string().email(EMAIL_ERROR),
  password: z.string().min(1, PASSWORD_ERROR),
});
