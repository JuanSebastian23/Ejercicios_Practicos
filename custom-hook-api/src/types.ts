export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
