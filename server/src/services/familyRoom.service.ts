import { Room, Task } from '../models/models';
import User from '../models/user.model';
import { DeleteMemberSchemaType } from '../schema/member/deleteMember.schema';
import { getOne } from './factory.service';

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
	const { memberId, roomId } = payload;

	const userToDelete = await getOne({ Model: User, id: memberId });

	const room = await getOne({ Model: Room, id: roomId });

	await Task.deleteMany({ userId: memberId });

	// Delete the member from the room's family members.
	room.familyMembers = room.familyMembers.filter((member) => {
		return member.userId.toString() !== memberId;
	});

	await room.save();

	return { username: userToDelete.username, roomName: room.roomName };
};

export const getMemberRooms = async (userId: string) => {
	const memberRooms = await Room.find({
		familyMembers: { $elemMatch: { userId } },
	}).select('roomName');

	return memberRooms;
};

export const getCurrentRoom = async (roomId: string) => {
	// Populate the user tasks that match the current roomId.
	const currentRoom = await getOne({ Model: Room, id: roomId, populate: 'familyMembers.tasks' });

	return currentRoom;
};
