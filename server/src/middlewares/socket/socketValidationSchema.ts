import { deleteMemberSchema } from '../../schema/member/deleteMember.schema';
import { createRoomSchema } from '../../schema/room/createRoom.schema';
import { deleteRoomSchema } from '../../schema/room/deleteRoom.schema';
import { joinRoomSchema } from '../../schema/room/joinRoom.schema';
import { createTaskSchema } from '../../schema/task/createTaskSchema';
import validateSchema from '../../utils/validateSchema';

type Event = string;
type Args = any[];

export const socketValidationSchema = (packet: [Event, ...Args], next: Function) => {
	const [event, ...args] = packet;
	const [data] = args;

	switch (event) {
		case 'rooms:create':
			validateSchema(createRoomSchema, data, next);
			break;
		case 'rooms:delete':
			validateSchema(deleteRoomSchema, data, next);
			break;
		case 'rooms:join':
			validateSchema(joinRoomSchema, data, next);
			break;
		case 'tasks:create':
			validateSchema(createTaskSchema, data, next);
			break;
		case 'members:delete':
			validateSchema(deleteMemberSchema, data, next);
			break;
		default:
			next();
	}
};
