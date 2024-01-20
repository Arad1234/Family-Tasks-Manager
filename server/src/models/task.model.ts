import { Ref, prop } from '@typegoose/typegoose';
import { RoomClass } from './room.model';

export class TaskClass {
	@prop()
	name: string;
	@prop()
	description: string;
	@prop()
	startTime: Date;
	@prop()
	endTime: Date;
	@prop({ ref: () => RoomClass })
	roomId: Ref<RoomClass>;
}
