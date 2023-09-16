import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY, MONGODB_URI, JWT_EXPIRES_IN, PORT } = process.env;

export const config = {
  mongo: {
    url: MONGODB_URI,
  },
  server: {
    port: PORT,
  },
  auth: {
    jwtSecret: SECRET_KEY,
    jwtExpiresIn: JWT_EXPIRES_IN,
  },
};
