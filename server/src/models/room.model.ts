import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { Ref, modelOptions, pre, prop } from '@typegoose/typegoose';
import { TaskClass } from './task.model';

class FamilyMember {
	@prop()
	username: string;
	@prop()
	userId: string;
	@prop({ ref: () => TaskClass, default: [] })
	tasks?: Ref<TaskClass>[];
}

@modelOptions({
	schemaOptions: {
		toJSON: {
			transform: function (doc, ret) {
				delete ret.roomPassword;
				return ret;
			},
		},
	},
})
@pre<RoomClass>('save', async function (next) {
	const room = this;

	if (room.isModified('roomPassword')) {
		try {
			const hashedPassword = await bcrypt.hash(room.roomPassword, 10);
			this.roomPassword = hashedPassword;
			next();
		} catch (error: any) {
			next(error);
		}
	} else {
		next();
	}
})
export class RoomClass {
	@prop()
	roomName: string;
	@prop()
	creator: { userId: Schema.Types.ObjectId; username: string };
	@prop({ type: () => [FamilyMember], default: [], _id: false })
	familyMembers: FamilyMember[];
	@prop()
	maxMembers: number;
	@prop({ select: false })
	roomPassword: string;

	public async validatePassword(roomPasword: string) {
		const isPasswordValid = await bcrypt.compare(roomPasword, this.roomPassword);
		return isPasswordValid;
	}
}
