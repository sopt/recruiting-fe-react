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
