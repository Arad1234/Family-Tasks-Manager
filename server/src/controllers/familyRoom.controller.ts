import { Server, Socket } from 'socket.io';
import { deleteMember, getCurrentRoom, getMemberRooms } from '../services/familyRoom.service';
import { DeleteMemberSchemaType } from '../schema/member/deleteMember.schema';
import { catchAsyncSocket } from '../utils/socket/catchAsyncSocket';
import { userToSocketMap } from '../utils/constants';

export const familyRoomHandler = (io: Server, socket: Socket) => {
	const deleteMemberHandler = catchAsyncSocket(async function (payload: DeleteMemberSchemaType) {
		const { memberId, roomId, source } = payload;

		const { username, roomName } = await deleteMember(payload);

		const socketId = userToSocketMap.get(memberId);

		if (source === 'admin') {
			const userDeletedSocket = io.sockets.sockets.get(socketId) as Socket;
			// Emit only to the removed member
			io.to(socketId).emit('memberDeletedByAdmin', {
				roomId,
				memberId,
				toRemovedMember: true,
			});

			// Emit to all room memebers except the removed member
			io.to(String(roomId)).except(socketId).emit('memberDeletedByAdmin', {
				memberId,
				username,
				roomName,
				roomId,
				toRoomMembers: true,
			});

			// Emit to all users except room members
			io.except(String(roomId)).emit('memberDeletedByAdmin', {
				memberId,
				roomId,
			});

			userDeletedSocket.leave(roomId);
		} else if (source === 'self') {
			// To current user
			socket.emit('userLeftRoom', {
				memberId,
				username,
				roomId,
				toCurrentUser: true,
			});

			// Emit to all room members except current user
			io.to(String(roomId)).except(socketId).emit('userLeftRoom', {
				memberId,
				roomId,
				username,
				roomName,
				toRoomMembers: true,
			});

			io.except(String(roomId)).emit('userLeftRoom', {
				memberId,
				roomId,
			});

			socket.leave(String(roomId));
		}
	}, socket);

	const getMemberRoomsHandler = catchAsyncSocket(async function (payload: { userId: string }) {
		const { userId } = payload;

		const memberRooms = await getMemberRooms(userId);

		socket.emit('recievedMemberRooms', memberRooms);
	}, socket);

	const getCurrentRoomHandler = catchAsyncSocket(async (payload: { roomId: string }) => {
		const { roomId } = payload;

		const currentRoom = await getCurrentRoom(roomId);

		socket.join(String(roomId));

		socket.emit('recievedFamilyRoom', currentRoom);
	}, socket);

	socket.on('members:delete', deleteMemberHandler);
	socket.on('members:getRooms', getMemberRoomsHandler);
	socket.on('members:getCurrentRoom', getCurrentRoomHandler);
};
