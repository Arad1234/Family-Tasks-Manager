import Room from '../models/room.model';
import Task from '../models/task.model';
import { RoomData } from '../types/common';
import { JoinRoomPayload } from '../types/socket';
import { NOT_FOUND, PAGE_LIMIT, UNAUTHORIZED } from '../utils/constants';
import AppError from '../utils/appErrorClass';
import User from '../models/user.model';

export const getFamilyRooms = async (page: number) => {
	// Paginate the rooms after intersecting the front with the last element.
	const rooms = await Room.find()
		.skip(page * PAGE_LIMIT)
		.limit(PAGE_LIMIT);

	return rooms;
};

export const getRoomsByName = async (roomName: string) => {
	let rooms;
	if (roomName.trim().length) {
		rooms = await Room.find({
			roomName: { $regex: roomName, $options: 'i' },
		});
	} else {
		rooms = getFamilyRooms(0);
	}

	return rooms;
};

export const createFamilyRoom = async (roomData: RoomData) => {
	const { username, maxMembers, roomName, roomPassword, userId } = roomData;

	const newRoom = await Room.create({
		roomName,
		maxMembers,
		familyMembers: [{ userId, username }],
		creator: { userId, username },
		roomPassword,
	});

	const roomWithoutRoomPassword = newRoom.toJSON();

	return roomWithoutRoomPassword;
};

export const deleteFamilyRoom = async (roomId: string) => {
	const room = await Room.findById({ _id: roomId });

	if (!room) {
		throw new AppError('Room not found', NOT_FOUND);
	}
	// Delete all the tasks of the members in this room.
	room.familyMembers.map(async (member) => {
		const userTasks = await Task.find({ userId: member.userId });

		const allTasksPromises = userTasks.map((task) => {
			return Task.findByIdAndDelete(task._id);
		});

		await Promise.all(allTasksPromises);
	});

	await room.deleteOne();
	return room._id;
};

export const joinFamilyRoom = async (joinRoomData: JoinRoomPayload) => {
	const { roomId, userId, roomPassword } = joinRoomData;

	const room = await Room.findOne({ _id: roomId }).select('+roomPassword');

	if (!room) {
		throw new AppError('Room not found', NOT_FOUND);
	}

	const isPasswordValid = await room.validatePassword(roomPassword);

	if (!isPasswordValid) {
		throw new AppError('Room password is not correct!', UNAUTHORIZED);
	}

	const user = await User.findOne({ _id: userId });

	if (!user) {
		throw new AppError('User not found', UNAUTHORIZED);
	}

	const newMember = {
		userId: user._id,
		username: user.username,
	};

	room.familyMembers.push(newMember);

	await room.save();

	return newMember;
};
