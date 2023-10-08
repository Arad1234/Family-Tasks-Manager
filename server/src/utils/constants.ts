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
  user: "aradgoller072@gmail.com",
  clientId: config.email.clientId,
  clientSecret: config.email.clientSecret,
  refreshToken: config.email.refreshToken,
};

export const isProduction = config.environment.nodeEnv === "production";

export const userToSocketMap = new Map();
