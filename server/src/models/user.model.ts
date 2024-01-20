import bcrypt from 'bcrypt';
import crypto from 'crypto';
import AppError from '../utils/appErrorClass';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';
import { DocumentType, getModelForClass, pre, prop } from '@typegoose/typegoose';

@pre<UserClass>('save', async function (next) {
	if (!this.isModified('password') || !this.password) {
		return;
	}

	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error: any) {
		next(new AppError(error.message, INTERNAL_SERVER_ERROR));
	}
})
export class UserClass {
	@prop()
	username: string;
	@prop({ unique: true, lowercase: true })
	email: string;
	@prop({ select: false })
	password: string;
	@prop()
	passwordResetToken?: string;
	@prop()
	passwordResetExpires?: Date;

	public createPasswordResetToken(this: DocumentType<UserClass>) {
		const resetToken = crypto.randomBytes(32).toString('hex');
		this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
		this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
		return resetToken;
	}
}

const User = getModelForClass(UserClass, { options: { customName: 'Users' } });

export default User;
