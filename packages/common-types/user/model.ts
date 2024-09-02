export interface User {
  user_id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
  oauth_provider: string;
  oauth_id: number;
  profile_image: string;
}
