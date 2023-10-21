import { Server, Socket } from "socket.io";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";
import { createTask } from "../services/task.service";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const taskHandler = (io: Server, socket: Socket) => {
  const createTaskHandler = catchAsyncSocket(async function (
    payload: createTaskSchemaType
  ) {
    const { roomId, userId } = payload;

    const newTask = await createTask(payload);

    io.to(String(roomId)).emit("taskCreated", {
      newTask,
      userId,
    });
  },
  socket);

  socket.on("tasks:create", createTaskHandler);
};
