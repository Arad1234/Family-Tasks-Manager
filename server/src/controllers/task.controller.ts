import { Server, Socket } from "socket.io";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";
import { createTask } from "../services/task.service";
import { socketErrorHandler } from "../middlewares/socket/socketErrorHandler";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const taskHandler = (io: Server, socket: Socket) => {
  const createTaskHandler = catchAsyncSocket(async function (
    payload: createTaskSchemaType
  ) {
    const { newTask, roomId } = await createTask(payload);
    io.emit("taskCreated", { newTask, memberId: payload.memberId, roomId });
  },
  socket);

  socket.on("tasks:create", createTaskHandler);
};
