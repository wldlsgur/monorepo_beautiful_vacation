export interface Room {
  room_id: number;
  room_name: string;
  password: string;
  owner_id: number;
  created_at: Date;
  updated_at: Date;
  max_participants: number;
  current_participants: number;
}
