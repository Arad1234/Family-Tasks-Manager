import { Server, Socket } from "socket.io";
import { deleteMember } from "../services/member.service";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const memberHandler = (io: Server, socket: Socket) => {
  const deleteMemberHandler = catchAsyncSocket(async function (
    payload: DeleteMemberSchemaType
  ) {
    const { memberId, roomId } = payload;

    await deleteMember(payload);
    io.emit("memberDeleted", { memberId, roomId });
  },
  socket);

  socket.on("members:delete", deleteMemberHandler);
};
