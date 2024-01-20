import { getModelForClass } from '@typegoose/typegoose';
import { RoomClass } from './room.model';
import { TaskClass } from './task.model';

export const Room = getModelForClass(RoomClass, { options: { customName: 'Rooms' } });

export const Task = getModelForClass(TaskClass, {
	schemaOptions: { timestamps: true },
	options: { customName: 'Tasks' },
});
