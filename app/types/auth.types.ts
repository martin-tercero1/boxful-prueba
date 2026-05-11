export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}