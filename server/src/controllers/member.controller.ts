import { Server, Socket } from "socket.io";
import { deleteMember } from "../services/member.service";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";
import { catchAsyncSocket } from "../utils/socket/catchAsyncSocket";
import Room from "../models/room.model";
import AppError from "../utils/appErrorClass";
import { NOT_FOUND } from "../utils/constants";

export const memberHandler = (io: Server, socket: Socket) => {
  const deleteMemberHandler = catchAsyncSocket(async function (
    payload: DeleteMemberSchemaType
  ) {
    const { memberId, roomId } = payload;

    await deleteMember(payload);

    socket.leave(roomId);

    io.emit("memberDeleted", { memberId, roomId });
  },
  socket);

  const getMemberRooms = catchAsyncSocket(async function (payload: {
    userId: string;
    roomId: string;
  }) {
    const memberRooms = await Room.find({
      familyMembers: payload.userId,
    }).select("roomName");

    socket.emit("recievedMemberRooms", memberRooms);
  },
  socket);

  const getCurrentRoom = catchAsyncSocket(
    async (payload: { roomId: string }) => {
      const { roomId } = payload;

      const currentRoom = await Room.findOne({ _id: roomId }).populate(
        "familyMembers"
      );

      if (!currentRoom) {
        throw new AppError(`Room with id ${roomId} not found`, NOT_FOUND);
      }

      socket.emit("recievedFamilyRoom", currentRoom);
    },
    socket
  );

  socket.on("members:getRooms", getMemberRooms);
  socket.on("members:delete", deleteMemberHandler);
  socket.on("members:getCurrentRoom", getCurrentRoom);
};
