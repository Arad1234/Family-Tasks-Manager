import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

// Extending the "Request" type with "user" property.
export interface userInfoRequest extends Request {
  user: string | JwtPayload;
}
