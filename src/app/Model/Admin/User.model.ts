export interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;          // hashed password
  remember_token?: string;   // optional, for "remember me"
  created_at?: Date;
  updated_at?: Date;
}
