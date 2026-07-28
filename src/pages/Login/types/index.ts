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
