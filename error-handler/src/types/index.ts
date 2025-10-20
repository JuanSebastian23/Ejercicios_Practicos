export interface ApiError {
  error: string;
  message: string;
  code: string;
  timestamp: string;
  status?: number;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}
