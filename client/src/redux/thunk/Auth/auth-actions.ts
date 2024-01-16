import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../../utils/axiosClient';

export interface LoginPayload {
	email: string;
	password: string;
}

interface RegisterPayload {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface ResetPasswordPayload {
	newPassword: string;
	confirmPassword: string;
	resetToken: string;
}

interface ForgotPasswordPayload {
	email: string;
}

export const loginThunk = createAsyncThunk<
	{ userId: string; username: string }, // The type the function returns
	LoginPayload // the arguments the function get.
>('/auth/login', async ({ email, password }, { rejectWithValue }: { rejectWithValue: any }) => {
	try {
		const response = await axiosClient.post('/user/login', {
			email,
			password,
		});
		const { data } = response;
		const { userId, username } = data;
		return { userId, username };
	} catch (error: any) {
		const { data } = error.response;
		return rejectWithValue(data.message);
	}
});

export const registerThunk = createAsyncThunk<
	string, // The type the function returns
	RegisterPayload // the arguments the function get.
>('/auth/register', async ({ username, email, password, confirmPassword }, thunkAPI) => {
	try {
		const response = await axiosClient.post('/user/register', {
			username,
			email,
			password,
			confirmPassword,
		});
		const { data } = response;
		return data;
	} catch (error: any) {
		const { data } = error.response;
		return thunkAPI.rejectWithValue(data.message);
	}
});

export const forgotPasswordThunk = createAsyncThunk<string, ForgotPasswordPayload>(
	'/auth/forgotPassword',
	async ({ email }, thunkAPI) => {
		try {
			const response = await axiosClient.post('/user/forgotPassword', {
				email,
			});

			return response.data;
		} catch (error: any) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(data.message);
		}
	}
);

export const resetPasswordThunk = createAsyncThunk<string, ResetPasswordPayload>(
	'/auth/resetPassword',
	async ({ newPassword, confirmPassword, resetToken }, thunkAPI) => {
		try {
			const response = await axiosClient.patch(`/user/resetPassword/${resetToken}`, {
				newPassword,
				confirmPassword,
			});

			return response.data;
		} catch (error: any) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(data.message);
		}
	}
);
