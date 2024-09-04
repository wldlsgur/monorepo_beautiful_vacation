import { User } from './model';

export interface UserResponse {
  data: User;
  message: string;
}
