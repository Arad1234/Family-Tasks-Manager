import { Server, Socket } from "socket.io";
import { deleteMember } from "../services/member.service";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import { socketErrorHandler } from "../middlewares/socket/errorHandler";

export const memberHandler = (io: Server, socket: Socket) => {
  const deleteMemberHandler = async (payload: DeleteMemberSchemaType) => {
    const { memberId, roomId } = payload;
    try {
      await deleteMember(payload);
      io.emit("memberDeleted", { memberId, roomId });
    } catch (error: any) {
      console.log(error);
      socket.emit("error", error.message);
    }
  };

  socket.on("members:delete", deleteMemberHandler);

  socketErrorHandler(socket);
};
