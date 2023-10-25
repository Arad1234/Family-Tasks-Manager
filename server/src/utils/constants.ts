import { StatusCodes } from "http-status-codes";
import { config } from "../config/config";

export const {
  INTERNAL_SERVER_ERROR,
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  CREATED,
  NOT_FOUND,
} = StatusCodes;

export const mailAuthConfig = {
  type: "OAuth2",
  user: config.email.adminEmail,
  clientId: config.email.clientId,
  clientSecret: config.email.clientSecret,
  refreshToken: config.email.refreshToken,
};

export const PAGE_LIMIT = 5;

export const isProduction = config.environment.nodeEnv === "production";

export const userToSocketMap = new Map();
