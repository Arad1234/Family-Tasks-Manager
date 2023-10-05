import { Server, Socket } from "socket.io";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";
import { createTask } from "../services/task.service";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const taskHandler = (io: Server, socket: Socket) => {
  const createTaskHandler = catchAsyncSocket(async function (
    payload: createTaskSchemaType
  ) {
    const newTask = await createTask(payload);
    io.emit("taskCreated", {
      newTask,
      userId: payload.userId,
    });
  },
  socket);

  socket.on("tasks:create", createTaskHandler);
};
