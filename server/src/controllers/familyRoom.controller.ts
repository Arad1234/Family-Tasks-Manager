import { Server, Socket } from "socket.io";
import {
  deleteMember,
  getCurrentRoom,
  getMemberRooms,
} from "../services/familyRoom.service";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";

export const familyRoomHandler = (io: Server, socket: Socket) => {
  const deleteMemberHandler = catchAsyncSocket(async function (
    payload: DeleteMemberSchemaType
  ) {
    const { memberId, roomId } = payload;

    await deleteMember(payload);

    socket.leave(roomId);

    io.emit("memberDeleted", memberId);
  },
  socket);

  const getMemberRoomsHandler = catchAsyncSocket(async function (payload: {
    userId: string;
    roomId: string;
  }) {
    const { roomId, userId } = payload;

    const memberRooms = await getMemberRooms({ roomId, userId });

    socket.emit("recievedMemberRooms", memberRooms);
  },
  socket);

  const getCurrentRoomHandler = catchAsyncSocket(
    async (payload: { roomId: string }) => {
      const { roomId } = payload;

      const currentRoom = await getCurrentRoom(roomId);

      socket.emit("recievedFamilyRoom", currentRoom);
    },
    socket
  );

  socket.on("members:delete", deleteMemberHandler);
  socket.on("members:getRooms", getMemberRoomsHandler);
  socket.on("members:getCurrentRoom", getCurrentRoomHandler);
};
