export interface User {
  id: number;
  username: string;
  email: string;
  nombre: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  nombre: string;
}

export interface ProtectedData {
  message: string;
  userId: number;
  timestamp: string;
}
