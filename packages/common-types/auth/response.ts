import { User } from '../user/model';

export interface CheckAuthResponse {
  data: User;
  message: string;
}
