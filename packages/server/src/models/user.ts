import { User } from 'common-types';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Connection } from '@/config';

const getUserByKakaoId = async ({ kakaoId }: { kakaoId: string }) => {
  const query = 'SELECT * FROM users WHERE oauth_id = ?';

  try {
    const connection = await Connection();
    const [rows] = await connection.query<RowDataPacket[]>(query, [kakaoId]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

const createUser = async ({
  user,
}: {
  user: Omit<User, 'user_id' | 'created_at' | 'updated_at'>;
}) => {
  const { username, oauth_id, oauth_provider, profile_image } = user;
  const query =
    'INSERT INTO users (username, oauth_provider, oauth_id, profile_image) VALUES (?, ?, ?, ?)';

  try {
    const connection = await Connection();
    const [result] = await connection.execute(query, [
      username,
      oauth_provider,
      oauth_id,
      profile_image,
    ]);

    return (result as ResultSetHeader).insertId;
  } catch (error) {
    throw new Error(`DB Insert Error: ${error}`);
  }
};

export default {
  getUserByKakaoId,
  createUser,
};
