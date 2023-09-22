import dotenv from "dotenv";
dotenv.config();

const {
  SECRET_KEY,
  MONGODB_URI,
  JWT_EXPIRES_IN,
  PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  REDIRECT_URI,
  FROM_EMAIL,
} = process.env;

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
  email: {
    fromEmail: FROM_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    redirectURI: REDIRECT_URI,
  },
};
