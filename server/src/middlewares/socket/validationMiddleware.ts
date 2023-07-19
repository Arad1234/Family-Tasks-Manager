import { createRoomSchema } from "../../schema/room/createRoom.schema";
import { joinRoomSchema } from "../../schema/room/joinRoom.schema";
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
    case "rooms:join":
      validateSchema(joinRoomSchema, data, next);
    default:
      next();
  }
};
