import { Room, Task } from '../models/models';
import { createTaskSchemaType } from '../schema/task/createTaskSchema';
import { getOne } from './factory.service';

export const createTask = async (taskData: createTaskSchemaType) => {
	const { name, description, startTime, endTime, userId, roomId } = taskData;

	const newTask = await Task.create({
		name,
		description,
		startTime,
		endTime,
		roomId,
	});

	const room = await getOne({ Model: Room, id: roomId });

	room.familyMembers = room.familyMembers.map((member) => {
		if (member.userId.toString() === userId && member.tasks) {
			member.tasks.push(newTask._id);
		}
		return member;
	});

	await room.save();

	return newTask;
};
