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
    const { memberId, roomId, source } = payload;

    const { username, roomName } = await deleteMember(payload);

    if (source === "admin") {
      // To all room members
      io.to(String(roomId)).emit("memberDeletedByAdmin", {
        memberId,
        username,
        roomName,
        toRoomMembers: true,
      });
    } else if (source === "self") {
      // To current user
      socket.emit("userLeftRoom", { memberId, username, toCurrentUser: true });

      // To all room members except current user
      socket.broadcast.to(String(roomId)).emit("userLeftRoom", {
        memberId,
        username,
        roomName,
        toRoomMembers: true,
      });

      socket.leave(String(roomId));
    }

    socket.broadcast.emit("memberDeletedByAdmin", {
      memberId,
      roomId,
      toAllUsers: true,
    });

    socket.broadcast.emit("userLeftRoom", {
      memberId,
      roomId,
      toAllUsers: true,
    });
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

      socket.join(String(roomId));

      socket.emit("recievedFamilyRoom", currentRoom);
    },
    socket
  );

  socket.on("members:delete", deleteMemberHandler);
  socket.on("members:getRooms", getMemberRoomsHandler);
  socket.on("members:getCurrentRoom", getCurrentRoomHandler);
};
