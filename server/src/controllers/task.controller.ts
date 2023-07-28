import { Server, Socket } from "socket.io";
import { createTaskSchemaType } from "../schema/task/createTaskSchema";
import { createTask } from "../services/task.service";
import { socketErrorHandler } from "../middlewares/socket/errorHandler";

export const taskHandler = (io: Server, socket: Socket) => {
  const createTaskHandler = async (payload: createTaskSchemaType) => {
    try {
      const { newTask, roomId } = await createTask(payload);
      io.emit("taskCreated", { newTask, memberId: payload.memberId, roomId });
    } catch (error: any) {
      console.log(error);
      socket.emit("error", error.message);
    }
  };

  socket.on("tasks:create", createTaskHandler);

  socketErrorHandler(socket);
};
