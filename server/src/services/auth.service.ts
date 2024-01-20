import User from '../models/user.model';
import { UserLoginDetails, UserRegisterDetails } from '../types/common';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken';
import AppError from '../utils/appErrorClass';
import { BAD_REQUEST, UNAUTHORIZED } from '../utils/constants';
import { config } from '../config/config';
import { createNewPasswordSchemaType } from '../schema/user/newPassword.schema';
import crypto from 'crypto';
import { getOne } from './factory.service';

export const createUser = async (userData: UserRegisterDetails) => {
	const { username, email, password } = userData;

	await User.create({
		username,
		email,
		password,
	});
};

export const loginUser = async (userInfo: UserLoginDetails) => {
	const { email, password } = userInfo;

	const user = await getOne({ Model: User, id: email, select: '+password' });

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new AppError('Wrong email or password', UNAUTHORIZED);
	}

	const token = generateToken(user._id.toString(), user.username);

	return { user, token };
};

export const forgotPassword = async (email: string) => {
	// 1) Get user based posted email
	const user = await getOne({ Model: User, id: email });

	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();

	await user.save();

	const link = `${config.client.clientHost}/resetPassword?token=${resetToken}`;

	return { user, link };
};

export const resetPassword = async (newPasswordInfo: createNewPasswordSchemaType & { resetToken: string }) => {
	const { newPassword, resetToken } = newPasswordInfo;

	// 1) Get user based on the token
	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// 2) If token has not expired, and there is user, set the new password
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	}).select('+password');

	if (!user) {
		throw new AppError('Token is invalid or has expired!', BAD_REQUEST);
	}

	const isEqualToOldPassword = await bcrypt.compare(newPassword, user.password);

	if (isEqualToOldPassword) {
		throw new AppError('Cannot use the old password', BAD_REQUEST);
	}

	user.password = newPassword;

	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save();
};
