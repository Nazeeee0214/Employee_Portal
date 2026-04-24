export interface UserSession {
  userId: number;
  email: string;
  name: string;
  role: string | null;
  image: string | null;
  isAdmin: boolean;
}
