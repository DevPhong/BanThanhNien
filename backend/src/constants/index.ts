import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  sessionTokenExpiresIn: 3600 * 24 * 7, // 7 days in seconds
};
