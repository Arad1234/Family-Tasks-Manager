import { createRoomSchema } from "../../schema/room.schema";
import validateSchema from "../../utils/validateSchema";

type Event = string;
type Args = any[];

export const validateMiddleware = (
  packet: [Event, ...Args],
  next: Function
) => {
  const [event, ...args] = packet;
  const [data] = args;
  switch (event) {
    case "rooms:create":
      validateSchema(createRoomSchema, data, next);
      break;
    default:
      next();
  }
};
